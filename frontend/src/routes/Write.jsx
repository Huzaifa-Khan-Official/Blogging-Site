import { useAuth, useUser } from '@clerk/clerk-react'
import "react-quill-new/dist/quill.snow.css";
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import configuration from '../configuration/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Upload from '../components/Upload';

const Write = () => {

  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [cover, setCover] = useState('');
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    img && setValue(prev => prev + `<p><img src=${img.url} /></p>`)
  }, [img])

  useEffect(() => {
    video && setValue(prev => prev + `<p><iframe class="ql-video" src=${video.url} /></p>`)
  }, [video])

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      try {
        const response = await axios.post(`${configuration.apiUrl}/posts`, newPost, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (res) => {
      toast.success('Post created successfully!', {
        autoClose: 1000,
        onClose: () => navigate(`/${res.slug}`),
      });
    }
  });


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
      img: cover.filePath || "",
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value
    };

    mutation.mutate(data);
  };


  return (
    <div className='mt-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-xl font-light'>Create a New Post</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-20'>
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white '>Add a cover image</button>
        </Upload>
        {
          cover && (
            <img src={cover.url} alt="" className='w-80 aspect-cover' />
          )
        }

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

        {(progress > 0 && progress < 100) && ("Upload Progress: " + progress)}
        {/* Text Editor */}
        <div className='flex'>
          <div className='flex flex-col gap-2 mr-2'>
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>

          <ReactQuill
            theme='snow'
            className='flex-1 rounded-xl bg-white shadow-md min-h-60 '
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
          />
        </div>

        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {/* {mutation.isError && <span className='text-red-500'>{mutation.error.message}</span>} */}
      </form>
    </div>
  )
}

export default Write