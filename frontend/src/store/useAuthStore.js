import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isVerifyingOTP: false,
    isCheckingAuth: true,
    isSendingOTP: false,

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
                autoClose: 1500,
                onClose: () => {
                    toast.success("We have send you an email. Enter the otp to verify you account", {
                        autoClose: 1500,
                    });
                }
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
            toast.success(res.data.message, {
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

    verifyOTP: async (otp) => {
        try {
            set({ isVerifyingOTP: true });

            const response = await axiosInstance.post("/auth/verifyOTP", { otp });

            set({ authUser: response.data });

            toast.success("OTP verified successfully");
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message}`);
        } finally {
            set({ isVerifyingOTP: false });
        }
    },

    resendOTP: async () => {
        try {
            set({ isSendingOTP: true });
            const response = await axiosInstance.post("/auth/resendOTP", {});

            toast.success("Success: OTP resent successfully!");
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message || 'Failed to resend OTP!'}`);
        } finally {
            set({ isSendingOTP: false });
        }
    },
}))