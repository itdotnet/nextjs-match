import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";

const ChatPage =async ({params}:{params:{userId:string}}) => {
  const userId=await getAuthUserId();
  const messages=await getMessageThread(params.userId);

  const body=(
    <div>
      {messages.length===0?'No messages to display':(
        <div>
          {messages.map(message=>(
            <MessageBox key={message.id} currentUserId={userId} message={message}/>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <CardInnerWrapper
      header="Profile"
      body={body}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
