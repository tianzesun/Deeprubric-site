import type { Metadata } from "next";

// Shared Open Graph and Twitter defaults. Next.js replaces these objects wholesale rather than
// merging them, so every page's metadata must spread them to keep the share image and site name.
export const baseOpenGraph = {
  type: "website",
  locale: "en_US",
  siteName: "DeepRubric",
  images: [
    {
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "DeepRubric - Professional Academic Grading Platform",
    },
  ],
} satisfies Metadata["openGraph"];

export const baseTwitter = {
  card: "summary_large_image",
  images: ["/images/twitter-image.jpg"],
  creator: "@DeepRubricAI",
} satisfies Metadata["twitter"];

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, url: path, title: `${title} | DeepRubric`, description },
    twitter: { ...baseTwitter, title: `${title} | DeepRubric`, description },
  };
}
