'use client';

import { MessageDto } from '@/types'
import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react'
import MessageTableCell from './MessageTableCell';
import { useMessages } from '@/hooks/useMessages';

type Props = {
    initialMessages: MessageDto[];
    nextCursor?: string;
}

const MessageTable = ({ initialMessages, nextCursor }: Props) => {
    const { isOutbox, columns, deleteMessage, isDeleting, selectRow, messages, loadMore, loadingMore, hasMore } = useMessages(initialMessages, nextCursor);

    return (
        <div className='flex flex-col h-[80vh]'>
            <Card>
                <Table
                    aria-label='Table with messages'
                    selectionMode='single'
                    onRowAction={(key) => selectRow(key)}
                    shadow='none'
                    className='flex flex-col gap-3 h-[80vh] overflow-auto'
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key} width={column.key === 'text' ? '50%' : undefined}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={messages} emptyContent='No messages for this container'>
                        {(item) => (
                            <TableRow key={item.id} className='cursor-pointer'>
                                {(columnKey) => (
                                    <TableCell className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                        <MessageTableCell
                                            item={item}
                                            columnKey={columnKey as string}
                                            isOutbox={isOutbox}
                                            deleteMessage={deleteMessage}
                                            isDeleting={isDeleting.isLoading && isDeleting.id === item.id}
                                        />
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Button
                    color='secondary'
                    isLoading={loadingMore}
                    disabled={!hasMore}
                    onClick={loadMore}
                >
                    {hasMore?'Load more':'No more messages'}
                </Button>
            </Card>
        </div>
    )
}

export default MessageTable