"use client";

import { auth } from "../firebase"; // Adjust path to firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Login() {
  const router = useRouter(); // Initialize router

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      router.push("/journals"); // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/room.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login Card */}
      <div className="relative bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Log in to access your journaling journey
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 hover:underline font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
