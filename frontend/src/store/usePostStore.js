import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const usePostStore = create((set) => {
  return {
    isFetching: false,
    isMutating: false,
    isSaveMutating: false,
    isFeatureMutating: false,
    isDeleteMutating: false,
    isUpdating: false,
    post: null,

    fetchPost: async (slug) => {
      set({ isFetching: true });
      try {
        const response = await axiosInstance.get(`/posts/${slug}`);
        set({ isFetching: false, post: response.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isFetching: false });
      }
    },

    createPost: async (newPost, queryClient, onSuccess) => {
      try {
        set({ isMutating: true });
        const response = await axiosInstance.post('/posts', newPost);

        queryClient.invalidateQueries(['posts']);
        toast.success('Post created successfully!', {
          autoClose: 1000,
          onClose: () => onSuccess(response.data.slug)
        });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isMutating: false });
      }
    },

    updatePost: async (id, updatedPost, queryClient, onSuccess) => {
      try {
        set({ isUpdating: true });
        const res = await axiosInstance.put(`/posts/${id}`, updatedPost);
        queryClient.invalidateQueries(['posts']);
        toast.success('Post updated successfully!', {
          autoClose: 1000,
          onClose: () => onSuccess(res.data.slug)
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
      finally {
        set({ isUpdating: false });
      }
    },

    deletePost: async (postId, onSuccess) => {
      set({ isDeleteMutating: true });
      try {
        await axiosInstance.delete(`/posts/${postId}`);
        toast.success("Post deleted successfully", {
          autoClose: 1000,
          onClose: onSuccess,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isDeleteMutating: false });
      }
    },

    savePost: async (postId, queryClient) => {
      set({ isSaveMutating: true });
      try {
        const res = await axiosInstance.put("/users/save", { postId });
        queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
        toast.success(res.data ? "Post unsaved" : "Post saved", {
          autoClose: 1000,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isSaveMutating: false });
      }
    },

    featurePost: async (post, isFeatured, queryClient) => {
      set({ isFeatureMutating: true });
      try {
        await axiosInstance.put(`/posts/feature`, { postId: post._id });
        queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
        toast.success(isFeatured ? "Post unfeatured" : "Post featured", {
          autoClose: 1000,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isFeatureMutating: false });
      }
    },
  }
});