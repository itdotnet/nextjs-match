'use client';

import { MessageDto } from '@/types'
import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Key, useCallback, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { deleteMessage } from '../actions/messageActions';
import { truncateString } from '@/lib/util';
import PresenceAvatar from '@/components/PresenceAvatar';

type Props={
    messages:MessageDto[];
}

const MessageTable = ({messages}:Props) => {
    const searchParams=useSearchParams();
    const router=useRouter();
    const isOutbox=searchParams.get('container')==='outbox';
    const [isDeleting,setDeleting]=useState({id:'',isLoading:false});

    const columns=[
        {key:isOutbox?'recipientName':'senderName',label:isOutbox?'Recipient':'Sender'},
        {key:'text',label:'Message'},
        {key:'created',label:isOutbox?'Date Sent':'Date Received'},
        {key:'actions',label:'Actions'}
    ];

    const handleDeleteMessage=async(message:MessageDto)=>{
        setDeleting({id:message.id,isLoading:true});
        await deleteMessage(message.id,isOutbox);
        router.refresh();
        setDeleting({id:'',isLoading:false});
    }

    const renderCell=useCallback((item:MessageDto,columnKey:keyof MessageDto)=>{
        const cellValue=item[columnKey];
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
                    <Button isIconOnly variant='light' onClick={()=>handleDeleteMessage(item)} isLoading={isDeleting.id===item.id && isDeleting.isLoading}>
                        <AiFillDelete size={24} className='text-danger'/>
                    </Button>
                )
        }
    },[isOutbox]);

    const handleRowSelect=(key:Key)=>{
        const message=messages.find(m=>m.id===key);
        const url=isOutbox?`/members/${message?.recipientId}`:`/members/${message?.senderId}`;
        router.push(url + '/chat');
    }

  return (
    <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
    <Table
        aria-label='Table with messages'
        selectionMode='single'
        onRowAction={(key)=>handleRowSelect(key)}
        shadow='none'
    >
        <TableHeader columns={columns}>
            {(column)=><TableColumn key={column.key} width={column.key==='text'?'50%':undefined}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={messages} emptyContent='No messages for this container'>
            {(item)=>(
                <TableRow key={item.id} className='cursor-pointer'>
                    {(columnKey)=>(
                        <TableCell className={`${!item.dateRead && !isOutbox?'font-semibold':''}`}>
                            {renderCell(item,columnKey as keyof MessageDto)}
                        </TableCell>
                    )}
                </TableRow>
            )}
        </TableBody>
    </Table>
    </Card>
  )
}

export default MessageTable