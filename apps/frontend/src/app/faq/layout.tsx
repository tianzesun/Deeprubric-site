import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/faq", "FAQ", "Answers to common questions about DeepRubric: grading accuracy, LMS integrations, data privacy, pricing and supported assignment types.");

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
