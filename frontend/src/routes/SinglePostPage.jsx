import React from 'react'
import Image from '../components/Image'
import { Link, useParams } from 'react-router-dom'
import PostMenuActions from '../components/PostMenuActions'
import Search from '../components/Search'
import Comments from '../components/Comments'
import { useQuery } from '@tanstack/react-query'
import configuration from '../configuration/config'
import axios from 'axios'
import { format } from 'timeago.js'

const fetchPost = async (slug) => {
  const response = await axios.get(`${configuration.apiUrl}/posts/${slug}`)
  return response.data;
}

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  if (!data) return <div>Post not found</div>

  return (
    <div className='my-8 flex flex-col gap-8'>
      {/* details */}
      <div className='flex gap-8'>
        {/* details & title */}
        <div className='md:w-3/5 flex flex-col gap-8'>
          {/* title */}
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
            {data.title}
          </h1>

          {/* details */}
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by</span>
            <Link className='text-blue-800'>
              {data.user.username}
            </Link>
            <span>on</span>
            <Link className='text-blue-800'>
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>

          {/* description */}
          <p className='text-gray-500 font-medium'>
            {data.desc}
          </p>

        </div>

        {/* Image */}
        {data.img && <div className='hidden md:flex w-2/5 items-center xl:items-start'>
          <Image
            src={data.img}
            className='rounded-2xl'
            w={600}
          />
        </div>}
      </div>

      {/* content */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* text */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify' dangerouslySetInnerHTML={{ __html: data.content }}></div>

        {/* menu */}
        <div className='px-4 h-max sticky top-4'>
          <h1 className='mt-2 mb-2 text-sm'>Author</h1>

          {/* author details */}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-6'>
              {data.user.img && <Image
                src={data.user.img}
                className='w-12 h-12 rounded-full object-cover'
                w="48"
                h="48"
              />}

              <Link className='text-blue-800'>
                {data.user.username}
              </Link>
            </div>

            <p className=' text-sm text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

            <div className='flex gap-2'>
              <Link>
                <Image
                  src="facebook.svg"
                />
              </Link>
              <Link>
                <Image
                  src="instagram.svg"
                />
              </Link>
            </div>
          </div>

          <PostMenuActions post={data} />

          <h1 className='mt-4 mb-2 text-sm'>Categories</h1>

          <div className='flex flex-col gap-2 text-sm'>
            <Link className='underline'>All</Link>

            <Link className='underline' to="/">Web Design</Link>
            <Link className='underline' to="/">Development</Link>
            <Link className='underline' to="/">Databases</Link>
            <Link className='underline' to="/">Search Engines</Link>
            <Link className='underline' to="/">Marketing</Link>
          </div>

          <h1 className='mt-4 mb-2 text-sm'>Search</h1>
          <Search />

        </div>
      </div>

      <Comments postId={data._id} />
    </div>
  )
}

export default SinglePostPage