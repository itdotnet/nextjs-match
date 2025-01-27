import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";

const ChatPage =async ({params}:{params:{userId:string}}) => {
  const userId=await getAuthUserId();
  const messages=await getMessageThread(params.userId);
  const chatId=createChatId(userId,params.userId);

  return (
    <CardInnerWrapper
      header="Profile"
      body={<MessageList initialMessages={messages} currentUserId={userId} chatId={chatId}/>}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
