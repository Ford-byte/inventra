"use client";

import DeleteIcon from "@/public/icons/delete";
import useProductApiStore from "@/public/components/store/useProductApi";
import EditIcon from "@/public/icons/edit";
import { useEffect, useState } from "react";
import ConfirmDelete from "@/public/components/popup/confirmationDelete";
import { useRouter } from "next/navigation";

export default function Page() {
  const { getProduct, deleteProduct, setProduct } = useProductApiStore();
  const [products, setProducts] = useState();
  const [id, setId] = useState();
  const router = useRouter();
  const productCache = {};

  useEffect(() => {
    fetchProduct();
  }, []);

  const removeTimestamp = (inputString) => {
    const splitString = inputString.split("T")[0];
    return splitString;
  };

  const fetchProduct = async (search = "") => {
    if (search && productCache[search]) {
      setProducts(productCache[search]);
      return;
    }

    try {
      const response = await getProduct({ search: search });
      const data = response?.data?.data;

      if (search) {
        productCache[search] = data;
      }

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct({ id: id });
      console.log(response);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-[8px]">
      <h2 className="text-center font-black py-[12px] text-xl">PRODUCTS</h2>
      <div className="flex justify-center">
        <input
          type="search"
          className="border border-gray-500 p-[4px]"
          placeholder="Search..."
          onChange={(e) => fetchProduct(e.target.value)}
        />
      </div>
      {/*  */}
      <div className="flex flex-col gap-y-[6px] py-[12px] mb-[70px]">
        {products &&
          products?.map((item, index) => {
            console.log(item);
            return (
              <div
                className={`p-4 shadow-lg border relative ${
                  item?.stock_difference < 10 && item?.stock_difference > 0
                    ? "border-yellow-500"
                    : item?.stock_difference < 1
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
                key={index}
              >
                <div className="flex justify-between">
                  <h3 className="uppercase text-lg">{item?.product_name}</h3>
                  <div className="flex gap-[4px]">
                    <span className="">
                      <EditIcon
                        className={`size-4 fill-blue-500`}
                        onClick={() => {
                          setProduct([item]);
                          router.push(`/dashboard/product/add`);
                        }}
                      />
                    </span>
                    <span className="">
                      <DeleteIcon
                        className={`size-4 fill-red-500`}
                        onClick={() => {
                          setId(item?.product_id);
                        }}
                      />
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
                  <span className="px-[4px]">
                    {removeTimestamp(item?.date)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      {id && (
        <ConfirmDelete
          onConfirm={() => {
            handleDelete(id);
          }}
          onCancel={() => {
            setId("");
          }}
        />
      )}
    </div>
  );
}
