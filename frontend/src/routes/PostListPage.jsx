import React, { useEffect, useState } from 'react'
import PostList from '../components/PostList'
import SideMenu from '../components/SideMenu'
import { useSearchParams } from 'react-router-dom';

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('search')) {
      setTitle(`Search Results for "${searchParams.get('search')}" Blog`);
    } else if (searchParams.get("cat")) {
      setTitle(`"${searchParams.get("cat").replace(/-/g, " ")}" Category Blog's`);
    } else if (searchParams.get("sort")) {
      setTitle(`"${searchParams.get("sort").replace(/-/g, " ")}" Blog's`);
    } else {
      setTitle('All Posts');
    }
  }, [searchParams]);

  return (
    <div>
      <h1 className='mt-5 mb-8 text-2xl capitalize'>{title}</h1>

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