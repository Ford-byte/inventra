import DeleteIcon from "@/public/icons/delete";
import EditIcon from "@/public/icons/edit";

export default function Page() {
  return (
    <div className="container px-[8px]">
      <h2 className="text-center font-black py-[12px] text-xl">PRODUCTS</h2>
      <div className="flex justify-center">
        <input
          type="search"
          className="border border-gray-500 p-[4px]"
          placeholder="Search..."
        />
      </div>
      {/*  */}
      <div className="flex flex-col gap-y-[6px] py-[12px]">
        <div className="p-4 shadow-lg border border-gray-200 relative">
          <div className="flex justify-between">
            <h3 className="uppercase text-lg">LION IVORY / 5KG</h3>
            <div className="flex gap-[4px]">
              <span className="">
                <EditIcon className={`size-4 fill-blue-500`} />
              </span>
              <span className="">
                <DeleteIcon className={`size-4 fill-red-500`} />
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
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
            </div>
          </div>
          <div className="pt-[12px] text-xs flex justify-end">Last Updated: <span className="">February 7,2025</span></div>
        </div>
        <div className="p-4 shadow-lg border border-gray-200 relative">
          <div className="flex justify-between">
            <h3 className="uppercase text-lg">LION IVORY / 5KG</h3>
            <div className="flex gap-[4px]">
              <span className="">
                <EditIcon className={`size-4 fill-blue-500`} />
              </span>
              <span className="">
                <DeleteIcon className={`size-4 fill-red-500`} />
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
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
            </div>
          </div>
          <div className="pt-[12px] text-xs flex justify-end">Last Updated: <span className="">February 7,2025</span></div>
        </div>
        <div className="p-4 shadow-lg border border-gray-200 relative">
          <div className="flex justify-between">
            <h3 className="uppercase text-lg">LION IVORY / 5KG</h3>
            <div className="flex gap-[4px]">
              <span className="">
                <EditIcon className={`size-4 fill-blue-500`} />
              </span>
              <span className="">
                <DeleteIcon className={`size-4 fill-red-500`} />
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
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
            </div>
          </div>
          <div className="pt-[12px] text-xs flex justify-end">Last Updated: <span className="">February 7,2025</span></div>
        </div>
        <div className="p-4 shadow-lg border border-gray-200 relative">
          <div className="flex justify-between">
            <h3 className="uppercase text-lg">LION IVORY / 5KG</h3>
            <div className="flex gap-[4px]">
              <span className="">
                <EditIcon className={`size-4 fill-blue-500`} />
              </span>
              <span className="">
                <DeleteIcon className={`size-4 fill-red-500`} />
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
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
              <label>PRICE</label>
            </div>
          </div>
          <div className="pt-[12px] text-xs flex justify-end">Last Updated: <span className="">February 7,2025</span></div>
        </div>
      </div>
    </div>
  );
}
