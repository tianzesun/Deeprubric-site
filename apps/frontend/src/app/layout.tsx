import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your preferred font
import "../styles/globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepRubric | Professional Academic Grading",
  description: "Human-in-the-Loop Assessment Architecture for Institutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-1000`}>
        {/* Global Navigation */}
        <Navigation />

        {/* This "main" container ensures content grows to fill space, 
            keeping the footer at the bottom on short pages */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}