"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await sendPasswordResetEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setMessage("A password reset link has been sent to your email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-900 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
