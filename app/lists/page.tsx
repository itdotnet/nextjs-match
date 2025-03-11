import React from 'react'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/like.actions'
import ListsTab from './ListsTab';

type SearchPageProps= {
    searchParams: Promise<{ type: string }>; // ✅ searchParams as a Promise
}

const ListsPage =async ({searchParams}:SearchPageProps) => {
    const {type}=await searchParams;
    const likeIds=await fetchCurrentUserLikeIds();
    const members=await fetchLikedMembers(type);

    return (
        <div>
            <ListsTab members={members!} likeIds={likeIds}/>
        </div>
    )
}

export default ListsPage