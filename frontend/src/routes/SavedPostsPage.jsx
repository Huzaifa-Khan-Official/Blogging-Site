import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostListItem from "../components/PostListItem";


const fetchPosts = async (postId) => {
    const res = await axiosInstance.get("/users/saved");
    return res.data;
}

const SavedPostsPage = () => {
    const { authUser } = useAuthStore();

    const { isPending, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
    });

    const allPosts = data || [];

    if (isPending) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <h1 className='mt-5 mb-8 text-2xl'>Saved Blog's</h1>

            {
                isPending ? (
                    <p className="text-center mb-6">Loading posts...</p>
                ) : allPosts.length === 0 && (
                    <p className="text-center mb-6">No posts found.</p>
                )
            }

            <div className='flex flex-col justify-between gap-8'>
                {/* Post Lists */}
                {allPosts.map((post) => (
                    <PostListItem key={post?._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default SavedPostsPage