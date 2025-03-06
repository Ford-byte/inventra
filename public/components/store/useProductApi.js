import apiClient from "@/app/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductApiStore = create(
  persist(
    (set, get) => ({
      getCategories: async () => {
        try {
          const response = apiClient.get(`/api/product/category`);
          return response;
        } catch (error) {
          console.log(error.error);
        }
      },

      addProduct: async ({ name, price, stock, category, supplier }) => {
        try {
          const response = await apiClient.post(`/api/product/stockIn`, {
            name,
            price,
            stock,
            category,
            supplier,
          });
          toast.success(response?.data?.message);
          return response;
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message || "Error occured.";
          toast.error(errorMessage);
        }
      },

      getProduct: async () => {
        try {
          const response = await apiClient.get(`/api/product`);
          return response;
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message || "Error occured.";
          console.log(errorMessage);
        }
      },
    }),
    {
      name: "local-storage-state",
    }
  )
);

export default useProductApiStore;
