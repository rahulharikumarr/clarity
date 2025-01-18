"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

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
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-gray-800">
          Clarity
        </a>
        <ul className="flex items-center space-x-6">
          {/* Show different links based on authentication status */}
          {user ? (
            <>
              <li className="text-gray-800">Hello, {user.email}</li>
              <li>
                <a
                  href="/dashboard"
                  className="text-blue-600 hover:underline"
                >
                  Journal
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-blue-600 hover:underline">
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
