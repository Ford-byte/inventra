"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Image
        src="/images/error.png"
        width={100}
        height={100}
        alt="Error image"
      />

      <button
        onClick={handleRedirect}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Back to Homepage
      </button>
    </div>
  );
}
