import apiClient from "@/app/axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTransactionApi = create(
  persist(
    (set, get) => ({
      product: [],
      setProduct: (newProduct) => set({ product: newProduct }),

      getTransactions: async () => {
        try {
          const response = await apiClient.get(`/api/transaction`);
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

export default useTransactionApi;
