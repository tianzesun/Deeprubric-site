import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your preferred font
import "../styles/globals.css";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { MotionProvider } from "../components/MotionProvider";
import { baseOpenGraph, baseTwitter } from "../lib/metadata";
import structuredData from "../../public/structured-data.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DeepRubric | Professional Academic Grading & Assessment Platform",
    template: "%s | DeepRubric"
  },
  description: "Human-in-the-Loop Assessment Architecture for Institutions. Advanced grading, curriculum management, and assessment tools for educational institutions.",
  keywords: [
    "academic grading",
    "assessment platform", 
    "educational technology",
    "grading software",
    "curriculum management",
    "rubric assessment",
    "institutional grading",
    "FERPA compliant",
    "educational software",
    "grading automation"
  ],
  authors: [{ name: "DeepRubric Team" }],
  creator: "DeepRubric",
  publisher: "DeepRubric",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://deeprubric.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...baseOpenGraph,
    url: '/',
    title: 'DeepRubric | Professional Academic Grading & Assessment Platform',
    description: 'Human-in-the-Loop Assessment Architecture for Institutions. Advanced grading, curriculum management, and assessment tools for educational institutions.',
  },
  twitter: {
    ...baseTwitter,
    title: 'DeepRubric | Professional Academic Grading & Assessment Platform',
    description: 'Human-in-the-Loop Assessment Architecture for Institutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  category: 'education',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-20">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 transition-colors duration-1000`}>
        {/* Organization structured data; "<" is escaped so the JSON can't close the script tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />

        {/* Markham standard grain overlay */}
        <div className="grain-overlay" />
        
        {/* Keyboard users can jump past the navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        <MotionProvider>
          {/* Global Navigation */}
          <Navigation />

          {/* This "main" container ensures content grows to fill space, 
              keeping the footer at the bottom on short pages */}
          <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}