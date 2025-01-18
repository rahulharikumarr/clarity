"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { auth } from "../firebase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Redirect to login if the user is not authenticated
        router.push("/login");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
    </div>
  );
}
