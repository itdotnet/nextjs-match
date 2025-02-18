import React from 'react'
import { getMembers } from '../actions/memberActions'
import MemberCard from './MemberCard';
import { fetchCurrentUserLikeIds } from '../actions/like.actions';
import PaginationComponent from '@/components/PaginationComponent';
import { UserFilters } from '@/types';
import EmptyState from '@/components/EmptyState';

const MembersPage = async ({ searchParams }: { searchParams: UserFilters }) => {
    const { ageRange, gender, orderBy } = await searchParams;
    const members = await getMembers({ ageRange, gender, orderBy });
    const likeIds = await fetchCurrentUserLikeIds();

    return (
        <>
            {!members || members.length === 0 ? (
                <EmptyState />
            ) :
                <>
                    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
                        {members && members.map(member => (
                            <MemberCard key={member.id} member={member} likeIds={likeIds} />
                        ))}
                    </div>
                    <PaginationComponent />
                </>
            }
        </>
    )
}

export default MembersPage