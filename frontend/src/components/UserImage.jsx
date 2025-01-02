import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Image from './Image';

const UserImage = () => {
    const { authUser } = useAuthStore();
    const [userImage, setUserImage] = useState(authUser?.img || "user.png");

    useEffect(() => {
        setUserImage(authUser?.img);
    }, [authUser])

    return (
        <Image src={userImage} alt="profile" w={36} h={36} className=' rounded-full' />
    )
}

export default UserImage