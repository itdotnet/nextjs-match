import React from 'react'
import { fetchCurrentUserLikeIds, fetchLikedMembers } from '../actions/like.actions'
import ListsTab from './ListsTab';

const ListsPage =async ({searchParams}:{searchParams:{type:string}}) => {
    const likeIds=await fetchCurrentUserLikeIds();
    const members=await fetchLikedMembers(searchParams.type);

    return (
        <div>
            <ListsTab members={members!} likeIds={likeIds}/>
        </div>
    )
}

export default ListsPage