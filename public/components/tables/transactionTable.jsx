export default function TransactionTable(props) {
    // Example data (you can replace this with data passed through props or fetched from an API)
    const products = [
      { name: "Handbag", price: "$129.99", stock: 30, status: "In Stock" },
      { name: "Shoes", price: "$89.50", stock: 25, status: "In Stock" },
      { name: "Bedding Set", price: "$69.99", stock: 40, status: "In Stock" },
      { name: "Dining Table", price: "$449.99", stock: 5, status: "In Stock" },
      { name: "Soap Set", price: "$24.95", stock: 50, status: "In Stock" },
    ];
  
    return (
      <div className=" bg-white dark:bg-neutral-700 w-full py-[12px]">
        <div className="relative m-[2px] py-2">
          <label htmlFor="inputSearch" className="sr-only">
            Search
          </label>
          <input
            id="inputSearch"
            type="text"
            placeholder="Search..."
            className="block w-64 rounded-lg border dark:border-none dark:bg-neutral-600 py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 text-neutral-500 dark:text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </div>
  
        <div className="relative m-[2px] mb-3 float-right hidden sm:block">
          <label htmlFor="inputFilter" className="sr-only">
            Filter
          </label>
          <select
            id="inputFilter"
            className="block w-40 rounded-lg border dark:border-none dark:bg-neutral-600 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="1" defaultValue>
              Last week
            </option>
            <option value="2">Last month</option>
            <option value="3">Yesterday</option>
            <option value="4">Last 7 days</option>
            <option value="5">Last 30 days</option>
          </select>
        </div>
  
        <table className="min-w-full text-left text-xs whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
            <tr>
              <th scope="col" className="px-2 py-6">
                Product
              </th>
              <th scope="col" className="px-2 py-6">
                Price
              </th>
              <th scope="col" className="px-2 py-6">
                Stock
              </th>
              <th scope="col" className="px-2 py-6">
                Status
              </th>
            </tr>
          </thead>
  
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className={`border-b dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 ${index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-800' : ''}`}
              >
                <th scope="row" className="px-2 py-6">
                  {product.name}
                </th>
                <td className="px-2 py-6">{product.price}</td>
                <td className="px-2 py-6">{product.stock}</td>
                <td className="px-2 py-6">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <nav className="mt-5 flex items-center justify-between text-sm" aria-label="Page navigation example">
          <p>
            Showing <strong>1-5</strong> of <strong>10</strong>
          </p>
  
          <ul className="list-style-none flex">
            <li>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#!"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#!"
              >
                1
              </a>
            </li>
            <li aria-current="page">
              <a
                className="relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300"
                href="#!"
              >
                2
                <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                  (current)
                </span>
              </a>
            </li>
            <li>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#!"
              >
                3
              </a>
            </li>
            <li>
              <a
                className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                href="#!"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  