import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import { CardHeader, Divider, CardBody } from '@nextui-org/react';
import React from 'react'
import EditForm from '../EditForm';
import Image from 'next/image';

const PhotoPage =async () => {
    const userId=await getAuthUserId();

    const photos=await getMemberPhotosByUserId(userId);

  return (
    <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Edit Profile
            </CardHeader>
            <Divider />
            <CardBody>
                <div className='grid grid-cols-5 gap-3 p-5'>
                    {photos && photos.map(photo=>(
                        <div key={photo.id} className='relative'>
                            <Image
                                src={photo.url}
                                width={220}
                                height={220}
                                alt="Image of user"
                            />
                        </div>
                    ))}
                </div>
            </CardBody>
        </>
  )
}

export default PhotoPage