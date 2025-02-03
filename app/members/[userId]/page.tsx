import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";

const MemberDetailedPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const {userId}=await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return <CardInnerWrapper header="Profile" body={member.description} />;
};

export default MemberDetailedPage;
