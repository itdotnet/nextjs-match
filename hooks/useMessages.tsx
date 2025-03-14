import { deleteMessage, getMessageByContainer } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback,Key, useEffect, useRef } from "react";
import useMessageStore from "./useMessageStore";

export const useMessages=(initialMessages:MessageDto[],nextCursor?:string)=>{
    const cursorRef=useRef(nextCursor);
    const {set,remove,messages,updateUnreadCount,resetMessages}=useMessageStore(state=>({
        set:state.set,
        remove:state.remove,
        messages:state.messages,
        updateUnreadCount:state.updateUnreadCount,
        resetMessages:state.resetMessages
    }));

    const searchParams=useSearchParams();
    const router=useRouter();
    const isOutbox=searchParams.get('container')==='outbox';
    const container=searchParams.get('container');
    const [isDeleting,setDeleting]=useState({id:'',isLoading:false});
    const [loadingMore,setLoadingMore]=useState(false);

    useEffect(() => {
      set(initialMessages);

      cursorRef.current=nextCursor;
    
      return () => {
        resetMessages();
      }
    }, [initialMessages,resetMessages,set])
    
    const loadMore=useCallback(async()=>{
        if(cursorRef.current){
            setLoadingMore(true);
            const {messages,nextCursor}=await getMessageByContainer(container,cursorRef.current);
            set(messages);
            cursorRef.current=nextCursor;
            setLoadingMore(false);
        }
    },[])

    const columns=[
        {key:isOutbox?'recipientName':'senderName',label:isOutbox?'Recipient':'Sender'},
        {key:'text',label:'Message'},
        {key:'created',label:isOutbox?'Date Sent':'Date Received'},
        {key:'actions',label:'Actions'}
    ];

    const handleDeleteMessage=useCallback(async(message:MessageDto)=>{
        setDeleting({id:message.id,isLoading:true});
        await deleteMessage(message.id,isOutbox);
        remove(message.id);
        if(!message.dateRead) updateUnreadCount(-1);
        setDeleting({id:'',isLoading:false});
    },[isOutbox,remove,updateUnreadCount])

    const handleRowSelect=(key:Key)=>{
        const message=messages.find(m=>m.id===key);
        const url=isOutbox?`/members/${message?.recipientId}`:`/members/${message?.senderId}`;
        router.push(url + '/chat');
    }

    return {
        isOutbox,
        columns,
        deleteMessage:handleDeleteMessage,
        selectRow:handleRowSelect,
        isDeleting,
        messages,
        loadingMore,
        loadMore,
        hasMore:!!cursorRef.current
    }
}