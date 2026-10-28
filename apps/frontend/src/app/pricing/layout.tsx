import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/pricing", "Pricing", "One flat price per instructor with unlimited courses, students and submissions. Grade your first 100 submissions free, no credit card required.");

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
