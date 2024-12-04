import { signOut } from '@/auth'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { Session } from 'inspector'
import Link from 'next/link'
import React from 'react'

type Props{
    user:Session('user')
}

const UserMenu = ({user}:Props) => {
  return (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
            <Avatar
                isBordered
                as="button"
                className='transition-transform'
                color='secondary'
                name={user?.name || 'user avatar'}
                size='sm'
                image={user?.image || '/images/user.png'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' aria-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
                    Signed in as {user?.name}
                </DropdownItem>
                <DropdownItem as={Link} href="/members/edit">
                    Edit Profile
                </DropdownItem>
                <DropdownItem color="danger" onClick={async()=>signOut()}>
                    Log out
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu