export default function Page() {
  return (
    <div className="">
      <h2 className="text-center font-black py-[12px] text-xl">ADD PRODUCT</h2>
      <div className="border-y border-gray-500 w-full flex flex-col gap-y-[12px] p-4">
        <span className="">
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Product Name"
          />
        </span>
        <span className="">
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Price"
          />
        </span>
        <span className="">
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Stock"
          />
        </span>
        <span className="">
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Category"
          />
        </span>
        <span className="">
          <input
            type="text"
            className="w-full px-[8px] py-[12px] border border-gray-300 text-sm"
            placeholder="Product Name"
          />
        </span>
        <span className="flex justify-end gap-[8px] py-[12px]" >
            <div className="text-sm py-[4px] bg-red-500 text-white px-[8px]  font-black ">Cancel</div>
            <div className="text-sm py-[4px] bg-blue-500 text-white px-[8px]  font-black ">Save</div>
        </span>
      </div>
    </div>
  );
}
