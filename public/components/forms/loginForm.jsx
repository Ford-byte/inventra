"use client";

import Image from "next/image";
import { useState } from "react";
import useUserApiStore from "../store/useUserApi";
import RegisterForm from "./registerForm";

export default function LoginForm({ onClick, toggleRegister }) {
  const { userLogin } = useUserApiStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await userLogin({ username, password });
    if (response) {
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 z-[0] bg-black/50" onClick={onClick} />
      <div className="bg-white w-full max-w-sm border-y border-gray-200 shadow-lg flex flex-col items-center gap-y-[12px] py-[12px] z-[1]">
        <Image
          src={`/favicon.ico`}
          width={50}
          height={50}
          alt="logo"
          className="object-cover"
        />
        <h2 className="text-xs">LOG IN YOUR ACCOUNT</h2>
        <form
          onSubmit={handleLogin}
          className="py-[12px] flex flex-col gap-y-[6px]"
        >
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
          <button
            type="submit"
            className="w-full border border-gray-500 bg-blue-500 px-[6px] py-[6px] text-xs text-white font-bold uppercase shadow-md"
          >
            Login
          </button>
        </form>
        <h6 className="flex gap-[4px] text-xs">
          Don't have an account?
          <span className="text-blue-500 underline" onClick={toggleRegister}>
            Sign Up
          </span>
        </h6>
      </div>
    </div>
  );
}
