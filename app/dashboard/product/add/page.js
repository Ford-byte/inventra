"use client";

import TransactionForm from "@/public/components/forms/transactionForm";
import useProductApiStore from "@/public/components/store/useProductApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { getCategories, addProduct, product, editProduct, setProduct } =
    useProductApiStore();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
    supplier: "",
    productId: null,
  });
  const [mode, setMode] = useState("add");
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    if (product && product.length > 0) {
      setMode("update");
      const {
        product_name,
        price,
        stock_in,
        category_id,
        supplier_id,
        product_id,
      } = product[0];
      setFormData({
        productName: product_name,
        price: price,
        stock: stock_in,
        category: category_id,
        supplier: supplier_id,
        productId: product_id,
      });
    }
  }, [getCategories, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    const { productName, price, stock, category, supplier } = formData;

    if (!productName || !price || !stock || !category || !supplier) {
      alert("Please fill all fields");
      return;
    }

    try {
      const productData = {
        name: productName,
        price: price,
        stock: stock,
        category: category,
        supplier: supplier,
      };

      const response = await addProduct(productData); // addProduct should create a new product
      console.log(response);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleUpdate = async () => {
    const { productName, price, stock, category, productId } = formData;

    if (!productName || !price || !stock || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await editProduct({
        product_name: productName,
        price: price,
        stock_in: stock,
        category_id: category,
        id: productId,
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      productName: "",
      price: "",
      stock: "",
      category: "",
      supplier: "",
      productId: null,
    });
    setProduct("");
    setMode("add");
  };

  const handleBack = () => {
    setTimeout(() => {
      setFormData({
        productName: "",
        price: "",
        stock: "",
        category: "",
        supplier: "",
        productId: null,
      });
      setProduct("");
      setMode("add");
    }, 1000);
    router.push(`/dashboard/product`);
  };

  const closeTransaction = () => {
    setMode("add");
  };

  return (
    <div>
      {mode !== "transaction" && (
        <h2 className="text-center font-black py-[12px] text-xl uppercase">
          {mode === "update" ? "Update Product" : "Add Product"}
        </h2>
      )}
      {mode !== "transaction" && (
        <div className="border-y border-gray-500 w-full flex flex-col gap-y-[12px] p-4">
          <div>
            <input
              type="text"
              className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
              placeholder="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div>
            {categories.length > 0 && (
              <select
                className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.category}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <input
              type="text"
              className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
              placeholder="Supplier Name"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-[8px] py-[12px]">
            {mode === "add" ? (
              <button
                className="text-sm py-[4px] bg-red-500 text-white px-[8px] font-black cursor-pointer"
                onClick={handleCancel}
              >
                Cancel
              </button>
            ) : (
              <button
                className="text-sm py-[4px] bg-red-500 text-white px-[8px] font-black cursor-pointer"
                onClick={handleBack}
              >
                Back
              </button>
            )}

            {mode === "add" ? (
              <button
                className="text-sm py-[4px] bg-blue-500 text-white px-[8px] font-black cursor-pointer"
                onClick={handleSaveProduct}
              >
                Save
              </button>
            ) : (
              <button
                className="text-sm py-[4px] bg-blue-500 text-white px-[8px] font-black cursor-pointer"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </div>
        </div>
      )}
      {mode !== "update" && (
        <div
          className={`${
            mode === "transaction"
              ? "text-center font-black py-[12px] text-xl uppercase"
              : "text-center font-black py-[12px] text-md uppercase shadow-lg bg-blue-500 text-white my-[12px]"
          }`}
          onClick={() => setMode("transaction")}
        >
          ADD TRANSACTION
        </div>
      )}
      {mode === "transaction" && <TransactionForm onCancel={closeTransaction}/>}
    </div>
  );
}
