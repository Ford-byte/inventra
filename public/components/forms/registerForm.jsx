"use client";
import { useState } from "react";
import Image from "next/image";
import useUserApiStore from "../store/useUserApi";

export default function RegisterForm({ onClick, toggleLogin }) {
  const { createAccount } = useUserApiStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await createAccount({
        username,
        password,
        fullname,
        email,
        phoneNumber,
      });

      setSuccessMessage("Account created successfully!");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
        <h2 className="text-xs uppercase">Register</h2>

        <form
          className="py-[12px] flex flex-col gap-y-[6px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-500 px-[6px] py-[6px] text-xs"
          />
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
            className={`w-full border border-gray-500 ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } px-[6px] py-[6px] text-xs text-white font-bold uppercase shadow-md`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <h6 className="flex gap-[4px] text-xs">
          Already have an account?
          <span className="text-blue-500 underline" onClick={toggleLogin}>
            Sign In
          </span>
        </h6>
      </div>
    </div>
  );
}
