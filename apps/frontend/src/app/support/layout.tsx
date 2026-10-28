import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/support", "Support", "Get help with DeepRubric. Contact our support team for technical questions, onboarding and assessment best practices.");

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
