import EmailIcon from "@/public/icons/email";
import PhoneIcon from "@/public/icons/phone";

export default function Page() {
  return (
    <div className="">
      <h2 className="text-center font-black py-[12px] text-xl uppercase p-4">
        Suppliers
      </h2>
      <div className="flex flex-col gap-y-[12px] container px-[6px] pb-[70px]">
        <div className="shadow-lg rounded-lg border border-gray-200 p-4">
          <h4 className="font-black text-lg">RICE SUPPLY</h4>
          <h5 className="uppercase text-sm">
            CONTACT: <span className="font-black">John Doe</span>
          </h5>

          <div className="flex flex-col gap-y-[4px]">
            <div className="flex items-center gap-x-[6px]">
              <EmailIcon className={`size-4`} />
              <span className="text-blue-500 underline text-sm">
                john@techsolutions.com
              </span>
            </div>
            <div className="flex items-center gap-x-[6px]">
              <PhoneIcon className={`size-4`} />
              <span className="text-blue-500 underline text-sm">
                john@techsolutions.com
              </span>
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg border border-gray-200 p-4">
          <h4 className="font-black text-lg">RICE SUPPLY</h4>
          <h5 className="uppercase text-sm">
            CONTACT: <span className="font-black">John Doe</span>
          </h5>

          <div className="flex flex-col gap-y-[4px]">
            <div className="flex items-center gap-x-[6px]">
              <EmailIcon className={`size-4`} />
              <span className="text-blue-500 underline text-sm">
                john@techsolutions.com
              </span>
            </div>
            <div className="flex items-center gap-x-[6px]">
              <PhoneIcon className={`size-4`} />
              <span className="text-blue-500 underline text-sm">
                john@techsolutions.com
              </span>
            </div>
          </div>
        </div>
        <div className="shadow-lg rounded-lg border border-gray-200 p-4">
          <h4 className="font-black text-lg">RICE SUPPLY</h4>
          <h5 className="uppercase text-sm">
            CONTACT: <span className="font-black">John Doe</span>
          </h5>

          <div className="flex flex-col gap-y-[4px]">
            <div className="flex items-center gap-x-[6px]">
              <EmailIcon className={`size-4`} />
              <span className="text-blue-500 underline text-sm">
                john@techsolutions.com
              </span>
            </div>
            <div className="flex items-center gap-x-[6px]">
              <PhoneIcon className={`size-4`} />
              <span className="text-blue-500 underline text-sm">
                john@techsolutions.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
