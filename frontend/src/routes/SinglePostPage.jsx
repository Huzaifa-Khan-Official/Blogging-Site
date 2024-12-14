import React from 'react'
import Image from '../components/Image'
import { Link } from 'react-router-dom'
import PostMenuActions from '../components/PostMenuActions'
import Search from '../components/Search'
import Comments from '../components/Comments'

const SinglePostPage = () => {
  return (
    <div className='my-8 flex flex-col gap-8'>
      {/* details */}
      <div className='flex gap-8'>
        {/* details & title */}
        <div className='md:w-3/5 flex flex-col gap-8'>
          {/* title */}
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, est.</h1>

          {/* details */}
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written by</span>
            <Link className='text-blue-800'>John Doe</Link>
            <span>on</span>
            <Link className='text-blue-800'>Web Design</Link>
            <span>2 days ago</span>
          </div>

          {/* description */}
          <p className='text-gray-500 font-medium'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quisquam maxime ratione animi, voluptatem officia eligendi ipsa! In excepturi nisi nesciunt qui. Voluptatibus obcaecati velit unde, quos earum eveniet ad?
          </p>

        </div>

        {/* Image */}
        <div className='hidden md:flex w-2/5 items-center xl:items-start'>
          <Image
            src="/postImg.jpeg"
            className='rounded-2xl'
            w={600}
          />
        </div>
      </div>

      {/* content */}
      <div className='flex flex-col md:flex-row gap-8'>
        {/* text */}
        <div className='lg:text-lg flex flex-col gap-6 text-justify'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, quod! Corrupti molestiae suscipit esse voluptates quos rem laudantium perspiciatis, accusamus sit dolor officiis commodi consequuntur dolores harum minus architecto numquam?</p>
        </div>

        {/* menu */}
        <div className='px-4 h-max sticky top-4'>
          <h1 className='mt-2 mb-2 text-sm'>Author</h1>

          {/* author details */}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-6'>
              <Image
                src="userImg.jpeg"
                className='w-12 h-12 rounded-full object-cover'
                w="48"
                h="48"
              />

              <Link className='text-blue-800'>John Doe</Link>
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

          <PostMenuActions />

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

      <Comments />
    </div>
  )
}

export default SinglePostPage