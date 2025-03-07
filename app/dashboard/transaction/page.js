import TransactionTable from "@/public/components/tables/transactionTable";
import Link from "next/link";

export default function Page() {
  return (
    <div className="">
      <h2 className="text-center font-black py-[12px] text-xl p-4">
        TRANSACTION
      </h2>
      <div className="flex justify-end py-[4px]">
        <Link
          href={`/dashboard/product/add`}
          className="text-xs bg-[#4536CA] text-white p-[8px] flex items-center gap-x-[4px]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          ADD TRANSACTION
        </Link>
      </div>
      <TransactionTable />
    </div>
  );
}
