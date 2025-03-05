import DashBoard from "@/public/icons/dashboard";
import DropBox from "@/public/icons/dropbox";
import Plus from "@/public/icons/plus";
import Stats from "@/public/icons/stats";
import User from "@/public/icons/user";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed flex justify-around bottom-0 py-[24px] bg-pink-100 w-full px-[12px]">
      <Link href={`/dashboard`}>
        <DashBoard className={`size-6 pointer !text-black !fill-black`} />
      </Link>
      <Link href={`/dashboard/product`}>
        <DropBox className={`size-6 pointer !text-black !fill-black`} />
      </Link>
      <Link href={`/dashboard/product/add`}>
        <Plus className={`size-6 pointer !text-black !fill-black`} />
      </Link>
      <Link href={`/dashboard/transaction`}>
        <Stats className={`size-6 pointer !text-black !fill-black`} />
      </Link>
      <Link href={`/dashboard/product/suppliers`}>
        <User className={`size-6 pointer !text-black !fill-black`} />
      </Link>
    </div>
  );
}
