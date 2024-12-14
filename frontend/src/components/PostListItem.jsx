import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'

const PostListItem = () => {
    return (
        <div className='flex flex-col sm:flex-row gap-3'>
            {/* image */}
            <div className='sm:w-1/2 xl:w-1/3'>
                <Image
                    src="postImg.jpeg"
                    className='rounded-2xl object-cover'
                    w={540}
                />
            </div>

            {/* details & title*/}
            <div className='flex flex-col gap-1 sm:w-1/2 xl:w-2/3'>
                {/* title */}
                <Link to="/test" className='text-xl font-semibold'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, quia.</Link>

                {/* details */}
                <div className='flex items-center gap-2 text-gray-400 text-sm flex-wrap'>
                    <span>Written by</span>
                    <Link className='text-blue-800'>John Doe</Link>
                    <span>on</span>
                    <Link className='text-blue-800'>Web Design</Link>
                    <span>2 days ago</span>
                </div>

                {/* description */}
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod natus earum delectus, doloremque animi sunt ullam impedit quos dignissimos. Facere in perferendis excepturi expedita! Nam, commodi deserunt! Repudiandae, itaque mollitia.
                </p>
                <Link to="/test" className='underline text-sm text-blue-800'>Read More</Link>

            </div>

        </div>
    )
}

export default PostListItem