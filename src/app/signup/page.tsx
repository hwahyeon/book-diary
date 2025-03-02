"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, getSession, checkUsernameExists } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("en");
  const [isPrivate, setIsPrivate] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Track signup success

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (session) {
        router.replace("/"); // Redirect to the home page if already logged in
      }
    };
    checkAuth();
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if username already exists
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      setError("This username is already taken. Please choose another one.");
      return;
    }

    // Proceed with signup
    const { error } = await signUp(
      email,
      password,
      username,
      language,
      isPrivate
    );

    if (error) {
      setError(
        "An account with this email already exists. Please log in instead."
      );
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">Sign Up</h1>

      {success ? (
        // Show this message instead of the form after successful signup
        <p className="text-green-600 text-center">
          Check your email to verify your account.
        </p>
      ) : (
        <form onSubmit={handleSignup} className="flex flex-col gap-3 w-80">
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
            required
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="peer hidden"
            />
            <span className="w-5 h-5 border border-black rounded-md flex items-center justify-center peer-checked:bg-black">
              {isPrivate && <span className="text-white">✔</span>}
            </span>
            Set as private account
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}
