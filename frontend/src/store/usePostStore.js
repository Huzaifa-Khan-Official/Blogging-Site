import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const usePostStore = create((set) => {
  // const queryClient = useQueryClient();

  return {
    isSaveMutating: false,
    isFeatureMutating: false,
    isDeleteMutating: false,

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