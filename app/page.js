"use client";

import LoginForm from "@/public/components/forms/loginForm";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };
  return (
    <div className="">
      <div className="full-center !h-screen">
        <Image
          src={`/favicon.ico`}
          width={100}
          height={100}
          alt="logo"
          className="size-[100px] object-cover"
        />
      </div>
      <div className="fixed bottom-[24px] w-full flex justify-center flex-col items-center gap-y-[24px]">
        <div
          className="border border-gray-500 px-[24px] py-[12px] rounded-full text-sm font-[700] pointer"
          onClick={() => {
            toggleLogin();
          }}
        >
          LOG IN
        </div>
        <h2 className="text-xs">Gina's Store</h2>
      </div>

      {showLogin && <LoginForm onClick={toggleLogin} />}
    </div>
  );
}
