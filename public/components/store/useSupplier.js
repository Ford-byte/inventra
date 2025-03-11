import apiClient from "@/app/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSupplierApi = create(
  persist(
    (set, get) => ({
      getSupplier: async () => {
        try {
          const response = await apiClient.get(`/api/supplier`);
          return response;
        } catch (error) {
          console.log(error.error);
        }
      },

      addSupplier: async ({ fullname, item_supplied, email, phone_number }) => {
        try {
          const response = await apiClient.post(`/api/supplier`, {
            fullname,
            item_supplied,
            email,
            phone_number,
          });
          toast.success(response?.data?.message);
          return response;
        } catch (error) {
          console.log(error.error);
        }
      },

      deleteSupplier: async ({ id }) => {
        try {
          const response = await apiClient.delete(`/api/supplier`, {
            data: { id: id },
          });
          toast.success(response?.data?.message);
          return response;
        } catch (error) {
          console.log(error.error);
        }
      },
    }),
    {
      name: "local-storage-state",
    }
  )
);

export default useSupplierApi;
