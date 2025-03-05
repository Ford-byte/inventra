import Image from "next/image";

export default function Page() {
  return (
    <div className="container px-[8px]">
      <div className="flex flex-col gap-[12px] py-[12px]">
        <h2 className="text-center font-black py-[12px] text-xl">DASHBOARD</h2>
        <div className="w-full flex items-center border p-[12px]">
          <div className="" id="logo">
            <Image
              src={`/images/dropbox.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-cover"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Total Products</h2>
            <span className="font-black">100</span>
          </div>
        </div>
        <div className="w-full flex items-center border p-[12px]">
          <div className="" id="logo">
            <Image
              src={`/images/total.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-contain"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Inventory Value</h2>
            <span className="font-black">30000.00</span>
          </div>
        </div>
        <div className="w-full flex items-center border p-[12px]">
          <div className="" id="logo">
            <Image
              src={`/images/stockin.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-cover"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Stock In</h2>
            <span className="font-black">100</span>
          </div>
        </div>
        <div className="w-full flex items-center border p-[12px]">
          <div className="" id="logo">
            <Image
              src={`/images/stockout.jpg`}
              width={50}
              height={50}
              alt="logo"
              className="size-[50px] object-cover"
            />
          </div>
          <div className="flex flex-col px-[12px]">
            <h2 className="Total Products">Stock Out</h2>
            <span className="font-black">100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
