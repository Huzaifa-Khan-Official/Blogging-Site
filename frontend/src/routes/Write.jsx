import { useAuth, useUser } from '@clerk/clerk-react'
import "react-quill-new/dist/quill.snow.css";
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import configuration from '../configuration/config';

const Write = () => {

  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [value, setValue] = useState('');

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${configuration.apiUrl}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    }
  })

  if (!isLoaded) {
    return <div className=''>
      Loading...
    </div>
  }

  if (isLoaded && !isSignedIn) {
    return <div className=''>
      Please login first!
    </div>
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value
    }

    mutation.mutate(data);
  }

  return (
    <div className='mt-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-xl font-light'>Create a New Post</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-20'>
        <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white '>Add a cover image</button>

        <input type="text" placeholder='My Awesome Story' className='text-4xl font-semibold bg-transparent outline-none' name='title' />

        <div className='flex items-center gap-4'>
          <label htmlFor="" className='text-sm'>Choose a category:</label>
          <select name="category" id="" className='p-2 rounded-xl bg-white shadow-md'>
            <option value="general">General</option>
            <option value="web-design">Web Desgin</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <textarea name="desc" placeholder='A short Description' className='p-4 rounded-xl bg-white shadow-md' />

        {/* Text Editor */}
        <ReactQuill theme='snow' className='flex-1 rounded-xl bg-white shadow-md min-h-60 '
          value={value}
          onChange={setValue}
        />

        <button className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'>Send</button>
      </form>
    </div>
  )
}

export default Write