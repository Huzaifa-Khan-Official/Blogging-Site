import { useAuth, useUser } from '@clerk/clerk-react'
import "react-quill-new/dist/quill.snow.css";
import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import configuration from '../configuration/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IKContext, IKUpload } from 'imagekitio-react';

const authenticator = async () => {
  try {
    const response = await fetch(`${configuration.apiUrl}/posts/upload-auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Write = () => {

  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [cover, setCover] = useState('');
  const [progress, setProgress] = useState(0);

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
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value
    };

    mutation.mutate(data);
  };

  const onError = (error) => {
    console.error('Image Upload Error:', error);
    toast.error('Error uploading image!', {
      autoClose: 1000,
    });
  };

  const onSuccess = (res) => {
    console.log('Image Upload Success:', res);
    setCover(res.url);
    toast.success('Image uploaded successfully!', {
      autoClose: 1000,
    });
    setProgress(0);
  };

  const onUploadProgress = (progress) => {
    console.log('Image Upload Progress:', progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  }

  return (
    <div className='mt-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
      <h1 className='text-xl font-light'>Create a New Post</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-20'>
        {/* <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white '>Add a cover image</button> */}
        <IKContext
          publicKey={configuration.imageKitPublicKey}
          urlEndpoint={configuration.imageKitUrlEndPoint}
          authenticator={authenticator}
        >
          <IKUpload
            useUniqueFileName
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
          />
        </IKContext>
        {(progress > 0 && progress < 100) && ("Progress: " + progress)}

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
        <div className='flex'>
          <div className='flex flex-col gap-2 mr-2'>
            <div className='cursor-pointer'>
              🌆
            </div>
            <div className='cursor-pointer'>
              ▶️
            </div>
          </div>
          <ReactQuill theme='snow' className='flex-1 rounded-xl bg-white shadow-md min-h-60 '
            value={value}
            onChange={setValue}
          />
        </div>

        <button
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
          className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {mutation.isError && <span className='text-red-500'>{mutation.error.message}</span>}
      </form>
    </div>
  )
}

export default Write