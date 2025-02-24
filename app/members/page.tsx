import React from 'react'
import { getMembers } from '../actions/memberActions'
import MemberCard from './MemberCard';
import { fetchCurrentUserLikeIds } from '../actions/like.actions';
import PaginationComponent from '@/components/PaginationComponent';
import { GetMemberParams } from '@/types';
import EmptyState from '@/components/EmptyState';

const MembersPage = async ({ searchParams }: { searchParams: GetMemberParams }) => {
    const { ageRange, gender, orderBy,withPhoto,pageNumber,pageSize } = await searchParams;
    const {items:members,totalCount} = await getMembers({ ageRange, gender, orderBy,withPhoto,pageNumber,pageSize });
    const likeIds = await fetchCurrentUserLikeIds();

    return (
        <>
            {totalCount===0 ? (
                <EmptyState />
            ) :
                <>
                    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
                        {members && members.map(member => (
                            <MemberCard key={member.id} member={member} likeIds={likeIds} />
                        ))}
                    </div>
                    <PaginationComponent totalCount={totalCount}/>
                </>
            }
        </>
    )
}

export default MembersPage