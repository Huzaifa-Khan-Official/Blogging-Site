import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
    return (
        <div className='flex flex-col mb-8 sm:flex-row gap-3'>
            {/* image */}
            {post.img && <div className='sm:w-1/2 xl:w-1/3'>
                <Image
                    src={post.img}
                    className='rounded-2xl object-cover aspect-video'
                    w={540}
                />
            </div>}

            {/* details & title*/}
            <div className='flex flex-col gap-1 sm:w-1/2 xl:w-2/3'>
                {/* title */}
                <Link to={`/${post.slug}`} className='text-xl font-semibold'>
                    {post.title}
                </Link>

                {/* details */}
                <div className='flex items-center gap-2 text-gray-400 text-sm flex-wrap'>
                    <span>Written by</span>
                    <Link className='text-blue-800'>{post.user.username}</Link>
                    <span>on</span>
                    <Link className='text-blue-800'>{post.category}</Link>
                    <span>{format(post.createdAt)}</span>
                </div>

                {/* description */}
                <p>
                    {post.desc}
                </p>
                <Link to={`/${post.slug}`} className='underline text-sm text-blue-800'>Read More</Link>

            </div>

        </div>
    )
}

export default PostListItem