import "react-quill-new/dist/quill.snow.css";
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Upload from '../components/Upload';
import Image from "../components/Image";
import { usePostStore } from "../store/usePostStore";
import { useAuthStore } from "../store/useAuthStore";

const Update = () => {
    const { slug } = useParams();
    const [value, setValue] = useState('');
    const [cover, setCover] = useState(null);
    const [img, setImg] = useState('');
    const [video, setVideo] = useState('');
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { authUser } = useAuthStore();
    const { fetchPost, post, updatePost, isUpdating } = usePostStore();

    useEffect(() => {
        if (!post || post.slug !== slug) {
            fetchPost(slug);
        }
    }, [fetchPost, slug, post]);

    useEffect(() => {
        if (post) {
            setValue(post.content || '');
            setCover(post.img ? { url: post.img, filePath: post.img } : null);
        }
    }, [post]);

    useEffect(() => {
        if (img) {
            setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
        }
    }, [img]);

    useEffect(() => {
        if (video) {
            setValue((prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`);
        }
    }, [video]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cover) {
            return;
        }

        const formData = new FormData(e.target);

        const data = {
            img: cover.filePath,
            title: formData.get('title'),
            category: formData.get('category'),
            desc: formData.get('desc'),
            content: value,
        };

        updatePost(post._id, data, queryClient, (slug) => navigate(`/${slug}`));
    };

    const updateCover = (uploadRes) => {
        setCover({ url: uploadRes.url, filePath: uploadRes.filePath });
    };

    // if (post?.user?._id !== authUser._id) {
    //     navigate('/');
    //     return null;
    // }

    return (
        <div className='mt-6 min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col gap-6'>
            <h1 className='text-xl font-light'>Update Post</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6 flex-1 mb-20'>
                <Upload type="image" setProgress={setProgress} setData={updateCover}>
                    <button className='w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white'>
                        Add a cover image
                    </button>
                </Upload>
                {cover && <Image src={cover.url} alt="Cover" className='w-80 aspect-cover' />}

                <input
                    type="text"
                    placeholder='My Awesome Story'
                    className='text-4xl font-semibold bg-transparent outline-none'
                    name='title'
                    defaultValue={post?.title || ''}
                />

                <div className='flex items-center gap-4'>
                    <label htmlFor="category" className='text-sm'>Choose a category:</label>
                    <select
                        name="category"
                        id="category"
                        className='p-2 rounded-xl bg-white shadow-md'
                        defaultValue={post?.category || 'general'}
                    >
                        <option value="general">General</option>
                        <option value="web-design">Web Design</option>
                        <option value="development">Development</option>
                        <option value="databases">Databases</option>
                        <option value="seo">Search Engines</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>

                <textarea
                    name="desc"
                    placeholder='A short Description'
                    className='p-4 rounded-xl bg-white shadow-md'
                    defaultValue={post?.desc || ''}
                />

                {progress > 0 && progress < 100 && `Upload Progress: ${progress}%`}

                <div className='flex'>
                    <div className='flex flex-col gap-2 mr-2'>
                        <Upload type="image" setProgress={setProgress} setData={setImg}>🌆</Upload>
                        <Upload type="video" setProgress={setProgress} setData={setVideo}>▶️</Upload>
                    </div>

                    <ReactQuill
                        theme='snow'
                        className='flex-1 rounded-xl bg-white shadow-md min-h-60'
                        value={value}
                        onChange={setValue}
                        readOnly={progress > 0 && progress < 100}
                    />
                </div>

                <button
                    disabled={isUpdating || (progress > 0 && progress < 100)}
                    className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed'
                >
                    {isUpdating ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
};

export default Update;