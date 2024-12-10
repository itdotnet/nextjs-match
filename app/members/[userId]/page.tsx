import { getMemberById } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation';
import React from 'react'

const MemberDetailedPage =async ({params}:{params:{userId:string}}) => {
    const member=await getMemberById(params.userId);

    if(!member) return notFound();

  return (
    <div>{member.name}</div>
  )
}

export default MemberDetailedPage