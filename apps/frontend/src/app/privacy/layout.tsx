import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/privacy", "Privacy Policy", "How DeepRubric collects, uses and protects personal and educational data.");

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
