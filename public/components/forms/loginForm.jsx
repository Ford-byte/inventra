import Image from "next/image";

export default function LoginForm({onClick}) {
  return (
    <div className="fixed inset-0 flex items-center  ">
        <div className="fixed inset-0 z-[0] bg-black/50 slide-in-blurred-top" onClick={onClick}/>
      <div className="bg-white w-full border-y border-gray-200 shadow-lg flex flex-col items-center gap-y-[12px] py-[12px] container z-[1] slide-in-blurred-top">
        <Image
          src={`/favicon.ico`}
          width={50}
          height={50}
          alt="logo"
          className="size-[50px] object-cover"
        />
        <h2 className="text-xs">LOG IN YOUR ACCOUNT</h2>
        <div className=" py-[12px] flex flex-col gap-y-[6px]">
          <input
            type="text"
            name="username"
            id=""
            placeholder="Username or Email"
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
          <input
            type="text"
            name="username"
            id=""
            placeholder="Password"
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
          <input
            type="submit"
            name="username"
            id=""
            placeholder="Username or Email"
            className="w-full border border-gray-500 bg-blue-500 px-[6px] py-[6px] text-xs text-white font-bold uppercase shadow-md"
          />
        </div>
        <h6 className="flex gap-[4px] text-xs">Don't have an account?<span className="text-blue-500 underline">Sign Up</span></h6>
      </div>
    </div>
  );
}
