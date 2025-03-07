export default function TransactionForm(props) {
  return (
    <div className="">
      <div className="border-y border-gray-500 w-full flex flex-col gap-y-[12px] p-4">
        <div>
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Product Name"
            name="productName"
          />
        </div>

        <div>
          <input
            type="number"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Price"
            name="price"
          />
        </div>

        <div>
          <input
            type="number"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Stock"
            name="stock"
          />
        </div>

        <div className="flex justify-end gap-[8px] py-[12px]">
          <button
            className="text-sm py-[4px] bg-red-500 text-white px-[8px] font-black cursor-pointer"
            onClick={() => {
              props?.onCancel();
            }}
          >
            Cancel
          </button>
          <button className="text-sm py-[4px] bg-blue-500 text-white px-[8px] font-black cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
