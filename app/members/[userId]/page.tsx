import { getMemberById } from '@/app/actions/memberActions'
import React from 'react'

const MemberDetailedPage =async ({params}:{params:{userId:string}}) => {
    const member=await getMemberById(params.userId);

    if(!member) return null;

  return (
    <div>{member.name}</div>
  )
}

export default MemberDetailedPage