"use client";
import { useState } from "react";
import useSupplierApi from "../store/useSupplier";

export default function SupplierForm(props) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { addSupplier } = useSupplierApi();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addSupplier({
        fullname: productName,
        item_supplied: productPrice,
        email,
        phone_number: phoneNumber,
      });
      console.log(response);
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="border-y border-gray-500 w-full flex flex-col gap-y-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4">
            <div>
              <input
                type="text"
                className="w-full px-3 py-3 border border-gray-300 text-sm"
                placeholder="Seller Name"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full px-3 py-3 border border-gray-300 text-sm"
                placeholder="Product Name"
                name="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full px-3 py-3 border border-gray-300 text-sm"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full px-3 py-3 border border-gray-300 text-sm"
                placeholder="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 py-4">
            <button
              type="button"
              className="text-sm py-3 bg-red-500 text-white px-4 font-bold cursor-pointer"
              onClick={props?.onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm py-3 bg-blue-500 text-white px-4 font-bold cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
