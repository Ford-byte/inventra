import apiClient from "@/app/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserApiStore = create(
  persist(
    (set, get) => ({
      user: null,
      userLogin: async ({ username, password }) => {
        try {
          const response = await apiClient.post("/api/user/login", {
            username,
            password,
          });
          toast.success(response?.data?.message);
          return response;
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message ||
            "Login Failed! Please check your credentials.";
          toast.error(errorMessage);
        }
      },

      createAccount: async ({
        username,
        password,
        fullname,
        email,
        phoneNumber,
      }) => {
        try {
          const response = await apiClient.post("/api/user/create", {
            username,
            password,
            fullname,
            email,
            phoneNumber,
          });
          toast.success(response?.data?.message);
          return response;
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message ||
            "Login Failed! Please check your credentials.";
          toast.error(errorMessage);
          console.log(error);
        }
      },

      userLogout: () => {
        set({ user: null });
        localStorage.removeItem("user-storage");
        toast.info("Logged out successfully.");
      },
    }),
    {
      name: "local-storage-state",
    }
  )
);

export default useUserApiStore;