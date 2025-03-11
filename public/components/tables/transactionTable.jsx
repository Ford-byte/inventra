"use client";

import { useEffect, useState } from "react";
import useTransactionApi from "../store/useTransactionApi";

export default function TransactionTable(props) {
  const { transactionPagination } = useTransactionApi();
  const [products, setProducts] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const limit = 5;

  useEffect(() => {
    fetchTransaction();
  }, [offset, limit]);

  const fetchTransaction = async () => {
    try {
      const response = await transactionPagination({ offset, limit });
      setProducts(response?.data?.data);
      setProductLength(response?.data?.data?.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageDown = () => {
    if (offset > 0) {
      setOffset(offset - limit);
      setPageCount(pageCount - 1);
    }
  };

  const handlePageUp = () => {
    if (products.length === limit) {
      setOffset(offset + limit);
      setPageCount(pageCount + 1);
    }
  };

  const totalPages = Math.ceil(productLength / limit);

  return (
    <div className="bg-white dark:bg-neutral-700 w-full py-[12px] mb-[100px]">
      
      <div className="relative m-[2px] py-2">
        <label htmlFor="inputSearch" className="sr-only">Search</label>
        <input
          id="inputSearch"
          type="text"
          placeholder="Search..."
          className="block w-full my-4 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-2 pr-1 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <table className="min-w-full text-left text-xs whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th scope="col" className="px-2 py-6">Product</th>
            <th scope="col" className="px-2 py-6">Price</th>
            <th scope="col" className="px-2 py-6">Stock</th>
            <th scope="col" className="px-2 py-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr
              key={index}
              className={`border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 ${
                index % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800" : ""
              }`}
            >
              <th scope="row" className="px-2 py-6">{product.product_name}</th>
              <td className="px-2 py-6">{product.price}</td>
              <td className="px-2 py-6">{product.stock_out}</td>
              <td className="px-2 py-6">
                {product.stock_out < 1
                  ? "Out of Stock"
                  : product.stock_out < 10
                  ? "Low Stock"
                  : "In Stock"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="mt-5 flex items-center justify-between text-sm" aria-label="Page navigation example">
        <p>
          Page <strong>{pageCount}</strong> of <strong>{totalPages}</strong>
        </p>

        <ul className="list-style-none flex">
          <li>
            <div
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={handlePageDown}
            >
              {"<"}
            </div>
          </li>
          <li>
            <a
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${
                offset === 0 ? "bg-blue-100 text-blue-700" : "text-neutral-600"
              } transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
              onClick={() => {
                setOffset(0);
                setPageCount(1);
              }}
            >
              {pageCount}
            </a>
          </li>
          <li>
            <div
              className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={handlePageUp}
              disabled={offset + limit >= productLength}
            >
              {">"}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
