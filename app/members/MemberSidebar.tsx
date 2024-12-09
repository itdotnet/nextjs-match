'use client';

import { calculateAge } from '@/lib/util';
import { Button, Card, CardBody, CardFooter, Divider, Image } from '@nextui-org/react';
import { Member } from '@prisma/client/wasm';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props={
    member:Member
}

const MemberSidebar = ({member}:Props) => {
    const pathname=usePathname();
    const basePath=`/members/${member.userId}`;

    const navLinks=[
        {name:'Profile',href:`${basePath}`},
        {name:'Photo',href:`${basePath}/photo`},
        {name:'Chat',href:`${basePath}/chat`}
    ];

  return (
    <Card className='w-full mt-10 items-center h-[80vh]'>
        <Image
            width={200}
            height={200}
            src={member.image || '/images/user.png'}
            alt='user profile main image'
            className='rounded-full mt-6 aspect-square object-cover'
        />
        <CardBody>
            <div className='flex flex-col items-center'>
                <div className='text-2xl'>
                    {member.name}, {calculateAge(member.dateOfBirth)}
                </div>
                <div className='text-sm text-neutral-500'>
                    {member.city}, {member.country}
                </div>
            </div>
            <Divider className='my-3'/>
            <div className='flex flex-col text-2xl p-4 ml-4 gap-4'>
                {navLinks.map(link=>(
                    <Link key={link.name} href={link.href} className={`block rounded ${link.href===pathname?'text-secondary':'hover:text-secondary/50'}`}>{link.name}</Link>
                ))}
            </div>
        </CardBody>
        <CardFooter>
            <Button variant='bordered' color='secondary' as={Link} fullWidth href="/members">
                Go back
            </Button>
        </CardFooter>
    </Card>
  )
}

export default MemberSidebar