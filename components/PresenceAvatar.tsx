import usePresenceStore from '@/hooks/usePresenceStore';
import { transformImageUrl } from '@/lib/util';
import { Avatar, Badge } from '@nextui-org/react';
import React from 'react'

type Props = {
  userId?: string;
  src?: string | null;
}

const PresenceAvatar = ({ userId, src }: Props) => {
  const { members } = usePresenceStore(state => ({
    members: state.members
  }));

  const isOnline = userId && members.indexOf(userId) !== -1;

  return (
    <Badge content="" color="success" shape="circle" isInvisible={!isOnline}>
      <Avatar src={transformImageUrl(src) || 'images/user.png'} alt="User avatar" />
    </Badge>
  )
}

export default PresenceAvatar