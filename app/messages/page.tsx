import React from 'react'
import MessageSidebar from './MessageSidebar'
import { getMessageByContainer } from '../actions/messageActions'
import MessageTable from './MessageTable';

type SearchPageProps= {
    searchParams: Promise<{container:string}>; // ✅ searchParams as a Promise
}

const MessagesPage =async ({searchParams}:SearchPageProps) => {
    const {container}=await searchParams;
    const {messages,nextCursor}=await getMessageByContainer(container);

    return (
        <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
            <div className='col-span-2'>
                <MessageSidebar/>
            </div>
            <div className='col-span-10'>
                <MessageTable initialMessages={messages} nextCursor={nextCursor}/>
            </div>
        </div>
    )
}

export default MessagesPage