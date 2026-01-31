"use client"; // <--- Add this at the very top

import React from "react";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center`}
    >
      {/* Main content */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
