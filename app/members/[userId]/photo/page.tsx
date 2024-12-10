import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'

const PhotoPage = () => {
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary'>
        Photos
      </CardHeader>
      <Divider/>
      <CardBody>
        Photos go here
      </CardBody>
    </>
    )
}

export default PhotoPage