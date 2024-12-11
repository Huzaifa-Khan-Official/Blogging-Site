import React from 'react'
import Image from './Image';
import { Link } from 'react-router-dom';

const FeaturedPosts = () => {
  return (
    <div className='mt-8 flex flex-col md:flex-row gap-8 py-10'>
      {/* First */}
      <div className='w-full flex md:w-1/2 flex-col gap-3'>
        {/* image */}
        <Image
          src="/featured1.jpeg"
          className='rounded-3xl object-cover'
        />

        {/* details */}
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link to="/test" className='text-blue-800 lg:text-lg'>Web Design</Link>
          <span className='text-gray-500'>2 days ago</span>
        </div>

        {/* title */}
        <Link className='text-lg lg:text-3xl font-semibold lg:font-bold'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, doloremque.
        </Link>

      </div>

      {/* Others */}
      <div className='w-full md:w-1/2 flex flex-col gap-4'>
        {/* second */}
        <div className='xs:h-1/3 flex flex-col xs:flex-row justify-between gap-4'>
          {/* Image */}
          <Image
            src="featured2.jpeg"
            className='rounded-3xl object-cover w-full xs:w-1/3 aspect-video'
          />

          {/* details and titles */}
          <div className='w-full sm:w-2/3'>
            {/* details */}
            <div className=''>
              <div className='flex items-center gap-2 text-sm lg:text-base mb-4'>
                <h1 className="font-semibold">
                  02.
                </h1>
                <Link className='text-blue-800'>
                  Web Design
                </Link>
                <span className='text-gray-500'>2 days ago</span>
              </div>
            </div>

            {/* title */}
            <Link to="/test" className='text-base lg:text-lg xl:text-2xl font-medium'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, natus!
            </Link>
          </div>
        </div>

        {/* third */}
        <div className='xs:h-1/3 flex flex-col xs:flex-row justify-between gap-4'>
          {/* Image */}
          <Image
            src="featured2.jpeg"
            className='rounded-3xl object-cover w-full xs:w-1/3 aspect-video'
          />

          {/* details and titles */}
          <div className='w-full sm:w-2/3'>
            {/* details */}
            <div className=''>
              <div className='flex items-center gap-2 text-sm lg:text-base mb-4'>
                <h1 className="font-semibold">
                  02.
                </h1>
                <Link className='text-blue-800'>
                  Web Design
                </Link>
                <span className='text-gray-500'>2 days ago</span>
              </div>
            </div>

            {/* title */}
            <Link to="/test" className='text-base lg:text-lg xl:text-2xl font-medium'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, natus!
            </Link>
          </div>
        </div>

        {/* fourth */}
        <div className='xs:h-1/3 flex flex-col xs:flex-row justify-between gap-4'>
          {/* Image */}
          <Image
            src="featured2.jpeg"
            className='rounded-3xl object-cover w-full xs:w-1/3 aspect-video'
          />

          {/* details and titles */}
          <div className='w-full sm:w-2/3'>
            {/* details */}
            <div className=''>
              <div className='flex items-center gap-2 text-sm lg:text-base mb-4'>
                <h1 className="font-semibold">
                  02.
                </h1>
                <Link className='text-blue-800'>
                  Web Design
                </Link>
                <span className='text-gray-500'>2 days ago</span>
              </div>
            </div>

            {/* title */}
            <Link to="/test" className='text-base lg:text-lg xl:text-2xl font-medium'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, natus!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPosts;