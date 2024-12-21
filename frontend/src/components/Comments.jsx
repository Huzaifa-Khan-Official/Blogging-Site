import React, { useRef } from 'react'
import Comment from './Comment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import configuration from '../configuration/config'
import { useAuth, useUser } from "@clerk/clerk-react"
import { toast } from 'react-toastify'

const fetchComments = async (postId) => {
    const res = await axios.get(`${configuration.apiUrl}/comments/${postId}`);
    return res.data;
}

const Comments = ({ postId }) => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const textareaRef = useRef(null);

    const { isPending, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken();
            try {
                const response = await axios.post(`${configuration.apiUrl}/comments/${postId}`, newComment, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['comments', postId],
            });
            if (textareaRef.current) {
                textareaRef.current.value = '';
            }
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        }
    });

    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            desc: formData.get('desc'),
        }

        mutation.mutate(data);
    }
    return (
        <div className='flex flex-col gap-6 lg:w-3/5'>
            <h1 className='text-xl text-gray-500 underline'>Comments</h1>

            {/* input container */}
            <form onSubmit={handleSubmit} className='flex items-center justify-between gap-8 w-full'>
                <textarea ref={textareaRef} placeholder='Write a comment...' className='w-full p-4  rounded-xl' name='desc' />
                <button type='submit' className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl'>Send</button>
            </form>

            {/* single comment */}
            {isPending ? (
                "Loading..."
            ) : error ? (
                "Error Loading comments"
            ) : (
                <>
                    {
                        mutation.isPending && (
                            <Comment
                                comment={{
                                    desc: `${mutation.variables.desc} (Sending...)`,
                                    createdAt: new Date(),
                                    user: {
                                        img: user.imageUrl,
                                        username: user.username
                                    }
                                }}
                            />
                        )
                    }

                    {
                        data.map(comment => (
                            <Comment key={comment._id} comment={comment} />
                        ))
                    }
                </>
            )
            }
        </div>
    )
}

export default Comments