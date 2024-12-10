import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'

const ChatPage = () => {
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary'>
        Chat
      </CardHeader>
      <Divider/>
      <CardBody>
        Chat go here
      </CardBody>
    </>
  )
}

export default ChatPage