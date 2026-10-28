import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/cookies", "Cookie Policy", "How DeepRubric uses cookies and similar technologies, and how you can manage them.");

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
