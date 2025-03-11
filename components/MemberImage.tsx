'use client';

import { Photo } from '@prisma/client'
import React from 'react'
import { Button, Image, useDisclosure } from '@nextui-org/react';
import clsx from 'clsx';
import { useRole } from '@/hooks/useRole';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { approvePhoto, rejectPhoto } from '@/app/actions/adminActions';
import AppModal from './AppModal';

type Props = {
    photo: Photo | null;
}

export default function MemberImage({ photo }: Props) {
    const role = useRole();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!photo) return null;

    const approve = async (photoId: string) => {
        try {
            await approvePhoto(photoId);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const reject = async (photo: Photo) => {
        try {
            await rejectPhoto(photo);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className='cursor-pointer' onClick={onOpen}>
            <Image
                src={photo?.url || '/images/user.png'}
                width={300}
                height={300}
                alt="Image of user"
                className={clsx('rounded-2xl', {
                    '!opacity-40': !photo.isApproved && role !== 'ADMIN'
                })}
            />

            {!photo?.isApproved && role !== 'ADMIN' && (
                <div className='absolute bottom-2 w-full bg-slate-200 p-1'>
                    <div className='flex justify-center text-danger font-semibold'>
                        Awaiting approval
                    </div>
                </div>
            )}
            {role === 'ADMIN' && (
                <div className='flex flex-row gap-2 mt-2'>
                    <Button onClick={() => approve(photo.id)} color='success' variant='bordered' fullWidth>
                        <ImCheckmark size={20} />
                    </Button>
                    <Button onClick={() => reject(photo)} color='danger' variant='bordered' fullWidth>
                        <ImCross size={20} />
                    </Button>
                </div>
            )}
            <AppModal
                imageModal={true}
                isOpen={isOpen}
                onClose={onClose}
                body={
                    <>
                        <Image
                            src={photo?.url || '/images/user.png'}
                            width={750}
                            height={750}
                            alt="Image of user"
                            className={clsx('rounded-2xl', {
                                '!opacity-40': !photo.isApproved && role !== 'ADMIN'
                            })}
                        />
                    </>
                }
            />
        </div>
    )
}