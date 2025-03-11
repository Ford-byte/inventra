"use client";

import ConfirmDelete from "@/public/components/popup/confirmationDelete";
import useSupplierApi from "@/public/components/store/useSupplier";
import DeleteIcon from "@/public/icons/delete";
import EmailIcon from "@/public/icons/email";
import PhoneIcon from "@/public/icons/phone";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [supplier, setSupplier] = useState([]);
  const { getSupplier, deleteSupplier } = useSupplierApi();
  const [id, setId] = useState();

  useEffect(() => {
    fetchSupply();
  }, []);

  const fetchSupply = async () => {
    try {
      const response = await getSupplier();
      setSupplier(response?.data?.data || []);
      return response?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteSupplier({
        id: id,
      });
      console.log(response);
    } catch (error) {
      console.log("Error submitting form:", error);
    } finally {
      setId("");
      fetchSupply();
    }
  };

  return (
    <div className="">
      <h2 className="text-center font-black py-[12px] text-xl uppercase p-4">
        Suppliers
      </h2>
      <div className="flex justify-end py-[4px]">
        <Link
          href={`/dashboard/product/add`}
          className="text-xs bg-[#4536CA] text-white p-[8px] flex items-center gap-x-[4px]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          ADD SUPPLIER
        </Link>
      </div>
      <div className="relative m-[2px] py-2">
        <label htmlFor="inputSearch" className="sr-only">
          Search
        </label>
        <input
          id="inputSearch"
          type="text"
          placeholder="Search..."
          className="block w-full my-4 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-2 pr-1 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-y-[12px] container px-[6px] pb-[70px] overflow-auto">
        {supplier?.map((item, index) => {
          return (
            <div
              className="shadow-lg rounded-lg border border-gray-200 p-4"
              key={index}
            >
              <div className="absolute right-6">
                <DeleteIcon
                  className={`size-3 fill-red-500`}
                  onClick={() => {
                    setId(item?.id);
                  }}
                />
              </div>

              <h4 className="font-black text-lg">{item?.item_supplied}</h4>
              <h5 className="uppercase text-sm">
                CONTACT: <span className="font-black">{item?.fullname}</span>
              </h5>

              <div className="flex flex-col gap-y-[4px]">
                <div className="flex items-center gap-x-[6px]">
                  <EmailIcon className={`size-4`} />
                  <span className="text-blue-500 underline text-sm">
                    {item?.email}
                  </span>
                </div>
                <div className="flex items-center gap-x-[6px]">
                  <PhoneIcon className={`size-4`} />
                  <span className="text-blue-500 underline text-sm">
                    {item?.phone_number}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {id && (
        <ConfirmDelete
          onCancel={() => {
            setId("");
          }}
          onConfirm={() => {
            handleDelete(id);
          }}
        />
      )}
    </div>
  );
}
