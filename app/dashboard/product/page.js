"use client";

import DeleteIcon from "@/public/icons/delete";
import useProductApiStore from "@/public/components/store/useProductApi";
import EditIcon from "@/public/icons/edit";
import { useEffect, useState } from "react";

export default function Page() {
  const { getProduct } = useProductApiStore();
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct();
        setProducts(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  function removeTimestamp(inputString) {

    const splitString = inputString.split("T")[0];
    return splitString;
  }

  return (
    <div className="container px-[8px]">
      <h2 className="text-center font-black py-[12px] text-xl">PRODUCTS</h2>
      <div className="flex justify-center">
        <input
          type="search"
          className="border border-gray-500 p-[4px]"
          placeholder="Search..."
        />
      </div>
      {/*  */}
      <div className="flex flex-col gap-y-[6px] py-[12px] mb-[70px]">
        {products &&
          products?.map((item, index) => {
            return (
              <div
                className="p-4 shadow-lg border border-gray-200 relative"
                key={index}
              >
                <div className="flex justify-between">
                  <h3 className="uppercase text-lg">{item?.product_name}</h3>
                  <div className="flex gap-[4px]">
                    <span className="">
                      <EditIcon className={`size-4 fill-blue-500`} />
                    </span>
                    <span className="">
                      <DeleteIcon className={`size-4 fill-red-500`} />
                    </span>
                  </div>
                </div>
                <div className="flex gap-x-[12px] py-[4px]">
                  <div className="flex flex-col gap-y-[4px] text-xs py-[4px] pr-[12px] border-r">
                    <label>PRICE</label>
                    <label>STOCK</label>
                    <label>CATEGORY</label>
                    <label>SUPPLIER</label>
                  </div>
                  <div className="flex flex-col gap-y-[4px] pl-[12px] text-xs py-[4px]">
                    <label>{item?.price}</label>
                    <label>{item?.stock_difference}</label>
                    <label>{item?.category}</label>
                    <label>{item?.supplier_id}</label>
                  </div>
                </div>
                <div className="pt-[12px] text-xs flex justify-end">
                  Last Updated:{" "}
                  <span className="px-[4px]">{removeTimestamp(item?.date)}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
