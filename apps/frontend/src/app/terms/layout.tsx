import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/terms", "Terms of Service", "The terms that govern your use of DeepRubric.");

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
