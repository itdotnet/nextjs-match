import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";

const ChatPage =async ({params}:{params:{userId:string}}) => {
  const {userId}=await params;
  const currentUserId=await getAuthUserId();
  const messages=await getMessageThread(userId);
  const chatId=createChatId(currentUserId,userId);

  return (
    <CardInnerWrapper
      header="Profile"
      body={<MessageList initialMessages={messages} currentUserId={currentUserId} chatId={chatId}/>}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
