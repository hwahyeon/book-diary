"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const { user } = await getUser();
      if (!user) return router.push("/login");
      setUser(user);
      setUsername(user.username || "");
      setBio(user.bio || "");
      setPhotoUrl(user.profile_image || "");
      setLanguage(user.language || "en");
      setIsPrivate(user.isPrivate || true);
    }
    fetchUserData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const res = await fetch("/api/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        bio,
        profile_image: photoUrl,
        user_id: user.id,
      }),
    });

    const { error } = await res.json();
    if (error) {
      setError(error);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Edit Profile</h1>
      <form
        onSubmit={handleUpdateProfile}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex flex-col">
          <label className="text-black font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-medium">Profile Image URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-black font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-black bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-black"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* 🔹 Private Account Toggle */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="w-5 h-5 border-black text-black focus:ring-2 focus:ring-black"
          />
          <span className="text-black font-medium">Public Profile</span>
        </label>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm">
            Profile updated successfully!
          </p>
        )}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-900 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
