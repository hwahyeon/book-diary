"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        router.replace("/"); // Redirect to the home page if already logged in
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      router.push("/"); // Navigate to the home page after logging in
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-900 transition"
        >
          Login
        </button>
      </form>

      {/* Forgot Password Button */}
      <button
        onClick={() => router.push("/forgot-password")}
        className="mt-3 text-sm text-gray-600 hover:underline"
      >
        Forgot your password?
      </button>
    </div>
  );
}
