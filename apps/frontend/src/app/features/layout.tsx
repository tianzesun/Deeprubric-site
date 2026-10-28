import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/features", "Features", "AI-assisted grading with educators in control: rubric-based scoring, personalized feedback, integrity detection and course analytics.");

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
