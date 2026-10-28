import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/security", "Security", "How DeepRubric protects student and institutional data with encryption, access controls and secure infrastructure.");

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
