import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/compliance", "Trust & Compliance", "DeepRubric's approach to FERPA, GDPR and the data security standards required by academic institutions.");

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
