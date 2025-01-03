import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });

        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data.data });
            toast.success("Account created successfully", {
                autoClose: 2000,
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
            });
        } finally {
            set({ isSigningUp: false });
        }
    },

    googleSignup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/google-signup", data)
            set({ authUser: res.data.data });
            toast.success("Account created successfully", {
                autoClose: 2000,
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
            });
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data.data });
            toast.success("Logged in successfully", {
                autoClose: 1500,
            });

        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/updateProfile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}))