import React from 'react'
import { getMembers } from '../actions/memberActions'

const MembersPage =async () => {
    const members=await getMembers();

    return (
        <div>
            {members && members.map((member,index)=>(
                <li key={index}>{member.name}</li>
            ))}
        </div>
    )
}

export default MembersPage