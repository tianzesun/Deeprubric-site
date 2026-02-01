import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or your preferred font
import "../styles/globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";

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
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'DeepRubric | Professional Academic Grading & Assessment Platform',
    description: 'Human-in-the-Loop Assessment Architecture for Institutions. Advanced grading, curriculum management, and assessment tools for educational institutions.',
    siteName: 'DeepRubric',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DeepRubric - Professional Academic Grading Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepRubric | Professional Academic Grading & Assessment Platform',
    description: 'Human-in-the-Loop Assessment Architecture for Institutions.',
    images: ['/images/twitter-image.jpg'],
    creator: '@DeepRubricAI',
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
  manifest: '/site.webmanifest',
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