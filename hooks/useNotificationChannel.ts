import { pusherClient } from "@/lib/pusher";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react"
import useMessageStore from "./useMessageStore";
import { MessageDto } from "@/types";
import { newLikeToast, newMessageToast } from "@/components/NotificationToast";

export const useNotificationChannel=(userId:string | null,profileComplete:boolean)=>{
    const channelRef=useRef<Channel | null>(null);
    const searchParams=useSearchParams();
    const pathName=usePathname();
    const {add,updateUnreadCount}=useMessageStore(state=>({
      add:state.add,
      updateUnreadCount:state.updateUnreadCount
    }));

    const handleNewMessage=useCallback((message:MessageDto)=>{
      if(pathName==='/messages' && searchParams.get('container')!=='outbox'){
        add(message);
        updateUnreadCount(1);
      }else if(pathName!==`/members/${message.senderId}/chat`){
        newMessageToast(message);
        updateUnreadCount(1);
      }
    },[add,pathName,searchParams,updateUnreadCount]);

    const handleNewLike=useCallback((data: {name:string, image: string | null, userId: string}) => {
        newLikeToast(data.name, data.image, data.userId);
    },[]);

    useEffect(() => {
      if(!userId || !profileComplete) return;
      if(!channelRef.current){
          channelRef.current=pusherClient.subscribe(`private-${userId}`);

          channelRef.current.bind('message:new',handleNewMessage);
          channelRef.current.bind('like:new',handleNewLike);
      }

      return () => {
        if(channelRef.current && channelRef.current.subscribed){
            channelRef.current.unsubscribe();
            channelRef.current.unbind('message:new',handleNewMessage);
            channelRef.current.unbind('like:new',handleNewLike);
            channelRef.current=null;
        }
      }
    }, [userId,handleNewMessage,handleNewLike,profileComplete])
    
}