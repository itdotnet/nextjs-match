import CardInnerWrapper from "@/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";

const ChatPage = () => {
  return (
    <CardInnerWrapper
      header="Profile"
      body={<div>Chat goes here</div>}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
