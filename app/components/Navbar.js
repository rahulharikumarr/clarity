"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { HomeIcon } from "@heroicons/react/24/solid";


export default function Navbar() {
  const [user, setUser] = useState(null); // Track authenticated user
  const router = useRouter();

  // Fetch current user from Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set the user state
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold tracking-wide text-gray-800 hover:text-gray-600 transition"
        >
          clarity
        </a>

        {/* Links */}
        <ul className="flex items-center space-x-6">
          {/* Home Icon */}
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 rounded-lg text-gray-700 font-medium transition"
            >
              <HomeIcon className="h-6 w-6 text-blue-500" />
            </a>
          </li>
          {user ? (
            <>
              <li className="text-sm sm:text-base text-gray-700 font-medium">
                Hi, {user.email.split("@")[0]}
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:shadow-md transition"
                >
                  Add Journal
                </a>
              </li>
              <li>
                <a
                  href="/journals"
                  className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:shadow-md transition"
                >
                  My Journals
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 hover:shadow-md transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  href="/login"
                  className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:shadow-md transition"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 hover:shadow-md transition"
                >
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
