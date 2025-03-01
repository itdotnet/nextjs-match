import PresenceAvatar from '@/components/PresenceAvatar';
import { truncateString } from '@/lib/util';
import { MessageDto } from '@/types';
import { Button } from '@nextui-org/react';
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';

type Props={
    item:MessageDto;
    columnKey:string;
    isOutbox:boolean;
    deleteMessage:(message:MessageDto)=>void;
    isDeleting:boolean;
}

const MessageTableCell = ({item,columnKey,isOutbox,deleteMessage,isDeleting}:Props) => {
    const cellValue=item[columnKey as keyof MessageDto];
    switch (columnKey){
        case 'senderName':
        case 'recipientName':
            return (
                <div className='flex items-center gap-2 cursor-pointer'>
                                        <PresenceAvatar 
                                            userId={isOutbox?item.recipientId:item.senderId}
                                            src={isOutbox?item.recipientImage:item.senderImage}
                                        />
                                        <span>{cellValue}</span>
                </div>
            )
        case 'text':
            return (
                <div>
                    {truncateString(cellValue,80)}
                </div>
            )
        case 'created':
            return cellValue
        default:
            return(
                <Button isIconOnly variant='light' onClick={()=>deleteMessage(item)} isLoading={isDeleting}>
                    <AiFillDelete size={24} className='text-danger'/>
                </Button>
            )
    }
}

export default MessageTableCell