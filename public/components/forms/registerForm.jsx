"use client";
import { useState } from "react";
import Image from "next/image";
import useUserApiStore from "../store/useUserApi";
import { z } from "zod";

export default function RegisterForm({ onClick, toggleLogin }) {
  const { createAccount } = useUserApiStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phoneNumber: "",
  });

  const { username, password, fullname, email, phoneNumber } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: undefined,
    }));
  };

  const formSchema = z.object({
    username: z.string().min(3, "Username should be at least 3 characters"),
    password: z.string().min(6, "Password should be at least 6 characters"),
    fullname: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(10, "Phone number should be at least 10 digits"),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError({}); // Reset errors before validation
    try {
      formSchema.parse(formData); // Validate form data

      const response = await createAccount({
        username,
        password,
        fullname,
        email,
        phoneNumber,
      });

      setSuccessMessage("Account created successfully!");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newError = {};
        err.errors.forEach((e) => {
          newError[e.path[0]] = e.message;
        });
        setError(newError);
      } else {
        setError({ general: "An error occurred during registration." });
      }
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

        {successMessage && (
          <div className="text-green-500 text-sm">{successMessage}</div>
        )}
        {error.general && (
          <div className="text-red-500 text-sm">{error.general}</div>
        )}

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
            onChange={handleChange}
            className={`w-full border px-[6px] py-[6px] text-xs ${
              error.fullname ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error.fullname && (
            <div className="text-red-500 text-xs">{error.fullname}</div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className={`w-full border px-[6px] py-[6px] text-xs ${
              error.email ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error.email && (
            <div className="text-red-500 text-xs">{error.email}</div>
          )}

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handleChange}
            className={`w-full border px-[6px] py-[6px] text-xs ${
              error.phoneNumber ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error.phoneNumber && (
            <div className="text-red-500 text-xs">{error.phoneNumber}</div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={username}
            onChange={handleChange}
            className={`w-full border px-[6px] py-[6px] text-xs ${
              error.username ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error.username && (
            <div className="text-red-500 text-xs">{error.username}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className={`w-full border px-[6px] py-[6px] text-xs ${
              error.password ? "border-red-500" : "border-gray-500"
            }`}
          />
          {error.password && (
            <div className="text-red-500 text-xs">{error.password}</div>
          )}

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
