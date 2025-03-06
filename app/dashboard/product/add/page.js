"use client";

import useProductApiStore from "@/public/components/store/useProductApi";
import { useEffect, useState } from "react";

export default function Page() {
  const { getCategories, addProduct } = useProductApiStore();
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getCategories();
      setCategories(response?.data?.data || []);
    };

    fetchCategory();
  }, [getCategories]);

  const handleAddProduct = async () => {
    try {
      const productData = {
        name: productName,
        price: price,
        stock: stock,
        category: category,
        supplier: supplier,
      };

      const response = await addProduct(productData);

      console.log(response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    setProductName("");
    setPrice("");
    setStock("");
    setCategory("");
    setSupplier("");
  };

  return (
    <div>
      <h2 className="text-center font-black py-[12px] text-xl">ADD PRODUCT</h2>
      <div className="border-y border-gray-500 w-full flex flex-col gap-y-[12px] p-4">
        <span>
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </span>
        <span>
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </span>
        <span>
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </span>
        <span>
          {categories && (
            <select
              className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories?.map((item, index) => (
                <option key={index} value={index + 1}>
                  {item?.category}
                </option>
              ))}
            </select>
          )}
        </span>
        <span>
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </span>
        <span className="flex justify-end gap-[8px] py-[12px]">
          <div
            className="text-sm py-[4px] bg-red-500 text-white px-[8px] font-black cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </div>
          <div
            className="text-sm py-[4px] bg-blue-500 text-white px-[8px] font-black cursor-pointer"
            onClick={handleAddProduct}
          >
            Save
          </div>
        </span>
      </div>
    </div>
  );
}
