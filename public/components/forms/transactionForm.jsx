"use client";

import { useEffect, useState } from "react";
import useProductApiStore from "../store/useProductApi";
import useTransactionApi from "../store/useTransactionApi";

export default function TransactionForm(props) {
  const { getProductNames } = useProductApiStore();
  const { addTransaction } = useTransactionApi();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productPrice, setProductPrice] = useState(0);
  const [pieces, setPieces] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProductNames();
      setProducts(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProduct(selectedProductId);
    const selectedProduct = products.find(
      (item) => item.id === selectedProductId
    );
    if (selectedProduct) {
      setProductPrice(selectedProduct.price);
      setStock(selectedProduct.stock_in);
    }
  };

  const handleSave = async () => {
    try {
      const selectedProductName = products.find(
        (product) => product.id === selectedProduct
      )?.product_name;

      if (!selectedProductName) {
        console.error("Product not found");
        return;
      }

      const response = await addTransaction({
        product_name: selectedProductName,
        price: productPrice,
        stock: pieces,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="border-y border-gray-500 w-full flex flex-col gap-y-4 p-4">
        <div>
          {loading ? (
            <div className="text-center text-sm text-gray-500">Loading...</div>
          ) : (
            <>
              {products.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                  <select
                    className="w-full px-3 py-3 border border-gray-300 text-sm"
                    onChange={handleProductChange}
                    value={selectedProduct}
                  >
                    {products.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.product_name}
                      </option>
                    ))}
                  </select>
                  <div>
                    <input
                      type="number"
                      className="w-full px-3 py-3 border border-gray-300 text-sm"
                      placeholder="Price"
                      name="price"
                      disabled={true}
                      value={productPrice}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      className={`w-full px-3 py-3 border text-sm ${
                        stock < 1
                          ? "border-red-500"
                          : stock < 10
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Stock"
                      name="stock"
                      value={pieces}
                      disabled={stock === 0 ? true : false}
                      onChange={(e) => setPieces(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-sm text-red-500">
                  No products available.
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end gap-4 py-4">
          <button
            className="text-sm py-3 bg-red-500 text-white px-4 font-bold cursor-pointer"
            onClick={props?.onCancel}
          >
            Cancel
          </button>
          <button
            className="text-sm py-3 bg-blue-500 text-white px-4 font-bold cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
