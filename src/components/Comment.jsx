import React from 'react'
import Image from './Image'

const Comment = () => {
    return (
        <div className='p-4 bg-slate-50 rounded-xl mb-2'>
            {/* user info */}
            <div className='flex items-center gap-4'>
                <Image
                    src="userImg.jpeg"
                    className='w-10 h-10 rounded-full object-cover'
                    w="40"
                />

                <span className='font-medium'>John Doe</span>

                <span className='text-sm text-gray-500'>2 days ago</span>
            </div>

            <div className='mt-2'>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum quaerat magni aut quia fugiat, tenetur architecto quod repellat iure quo explicabo odio aliquid recusandae qui a sed veniam error voluptatem.
                </p>
            </div>
        </div>
    )
}

export default Comment