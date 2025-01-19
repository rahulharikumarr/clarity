"use client";

import { auth } from "../firebase"; // Adjust path to firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Signup() {
  const router = useRouter(); // Initialize router

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/room.jpeg')`, // Replace with your image path
      }}
    >
      {/* Signup Form Container */}
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Sign Up</h1>
        <p className="text-center text-gray-600 mt-2 text-sm">
          Create your account to start journaling.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
