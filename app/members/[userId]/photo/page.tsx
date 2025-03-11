import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import MemberPhotos from '@/components/MemberPhotos';
import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'

type ParamsProps= {
  params: Promise<{userId:string}>;
}

const PhotoPage =async ({params}:ParamsProps) => {
  const {userId}=await params;
  const photos=await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className='text-2xl font-semibold text-secondary'>
        Photos
      </CardHeader>
      <Divider/>
      <CardBody>
        <MemberPhotos photos={photos}/>
      </CardBody>
    </>
    )
}

export default PhotoPage