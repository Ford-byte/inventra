"use client";

import Image from "next/image";
import { useState } from "react";
import useUserApiStore from "../store/useUserApi";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function LoginForm({ onClick, toggleRegister }) {
  const { userLogin } = useUserApiStore();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });

  const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  // Handle input change for username and password
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }

    setError((prevError) => ({
      ...prevError,
      [name]: undefined,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset the error state before starting the validation
    setError({ username: "", password: "" });

    try {
      // Validate form inputs using Zod schema
      formSchema.parse({ username, password });

      // If validation passes, attempt login
      const response = await userLogin({ username, password });

      // Check if login is successful and navigate to the dashboard
      if (response.status === 200) {
        router.push(`/dashboard`);
      } else {
        setError({ ...error, username: "Invalid username or password" });
      }
    } catch (err) {
      // If validation fails, catch the error and set error state
      if (err instanceof z.ZodError) {
        const tempError = { username: "", password: "" };
        err.errors.forEach((error) => {
          if (error.path[0] === "username") {
            tempError.username = error.message;
          }
          if (error.path[0] === "password") {
            tempError.password = error.message;
          }
        });
        setError(tempError);
      }
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
            onChange={handleChange} // Use handleChange here
            className={`w-full border  px-[6px] py-[6px] text-xs ${
              error?.username ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error?.username && (
            <div className="text-red-500 text-xs">{error.username}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange} // Use handleChange here
            className={`w-full border  px-[6px] py-[6px] text-xs ${
              error?.password ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error?.password && (
            <div className="text-red-500 text-xs">{error.password}</div>
          )}

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
