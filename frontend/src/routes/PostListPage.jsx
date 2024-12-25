import React, { useState } from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1 className='mt-5 mb-8 text-2xl'>Development Blog</h1>

      <button onClick={() => setOpen(!open)} className='bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden'>{open ? "Close" : "Filter or Search"}</button>

      <div className='flex flex-col-reverse justify-between md:flex-row gap-8'>
        {/* Post Lists */}
        <div className=''>
          <PostList />
        </div>

        {/* Side Menu */}
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu />
        </div>

      </div>
    </div>
  )
}

export default PostListPage