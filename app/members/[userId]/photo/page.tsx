import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react'
import React from 'react'

const PhotoPage =async ({params}:{params:{userId:string}}) => {
  const {userId}=await params;
  const photos=await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary'>
        Photos
      </CardHeader>
      <Divider/>
      <CardBody>
      {photos && photos.map(photo=>(
          <div key={photo.id}>
            <Image
              width={300}
              height={300}
              alt="Image of member"
              src={photo.url}
              className='object-cover aspect-square'
            />
          </div>  
        ))}
      </CardBody>
    </>
    )
}

export default PhotoPage