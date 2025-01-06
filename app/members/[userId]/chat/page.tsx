import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";

const ChatPage =async ({params}:{params:{userId:string}}) => {
  const messages=await getMessageThread(params.userId);

  const body=(
    <div>
      {messages.length===0?'No messages to display':(
        <div>
          {messages.map(message=>(
            <p key={message.id}>{message.text}</p>
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
