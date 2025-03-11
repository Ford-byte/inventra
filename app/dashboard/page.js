"use client";
import useProductApiStore from "@/public/components/store/useProductApi";
import useTransactionApi from "@/public/components/store/useTransactionApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { getTransactions } = useTransactionApi();
  const { getProduct } = useProductApiStore();
  const [transactions, setTransactions] = useState([]);
  const [product, setProduct] = useState([]);
  const [length, setLength] = useState(0);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [stockIn, setStockIn] = useState();
  const [sales, setSales] = useState();

  useEffect(() => {
    fetchData();
    fetchProduct();
  }, []);

  useEffect(() => {
    setLength(transactions.length);
  }, [transactions]);

  useEffect(() => {
    if (product?.length > 0) {
      calculateInventoryValue();
      calculateStockIn();
      calculateSales();
    }
  }, [product]);

  const fetchData = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async (search = "") => {
    try {
      const response = await getProduct({ search });
      setProduct(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateInventoryValue = () => {
    let total = 0;
    product.forEach((item) => {
      total += item?.price * item?.stock_difference;
    });
    setInventoryValue(total);
  };

  const calculateStockIn = () => {
    let total = 0;
    product.forEach((item) => {
      total += item?.stock_difference;
    });
    setStockIn(total);
  };

  const calculateSales = () => {
    let total = 0;
    product.forEach((item) => {
      total += item?.price * item?.stock_out;
    });
    setSales(total);
  }

  return (
    <div className="container px-[8px]">
      <div className="flex flex-col gap-[12px] py-[12px]">
        <h2 className="text-center font-black py-[12px] text-xl">DASHBOARD</h2>
        <div className="w-full flex items-center border p-[12px]">
          <div id="logo">
            <Image
              src={`/images/dropbox.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-cover"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Total Products</h2>
            {length ? (
              <span className="font-black">{length}</span>
            ) : (
              <span className="font-black animate-pulse">...</span>
            )}
          </div>
        </div>
        <div className="w-full flex items-center border p-[12px]">
          <div id="logo">
            <Image
              src={`/images/total.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-contain"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Inventory Value</h2>
            <span className={`font-black ${inventoryValue ? "" : "animate-pulse"}`}>
            ₱ {inventoryValue ? inventoryValue.toFixed(2) : "..."}
            </span>
          </div>
        </div>
        <div className="w-full flex items-center border p-[12px]">
          <div id="logo">
            <Image
              src={`/images/stockin.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-cover"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Stock</h2>
            <span className={`font-black ${stockIn ? "" : "animate-pulse  "}`}>{stockIn ? stockIn : "..."}</span>
          </div>
        </div>
        <div className="w-full flex items-center border p-[12px]">
          <div id="logo">
            <Image
              src={`/images/stockout.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-cover"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Stock Out</h2>
            <span className={`font-black ${sales ? "" : "animate-pulse  "}`}>₱ {sales ? sales : "..."}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
