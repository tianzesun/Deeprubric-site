"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { NAV_ITEMS as dashboardNavConfig } from "@/config/dashboard-nav";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on server to avoid hydration mismatch
  if (!mounted) return null;

  const userRole = (user?.role as string)?.toLowerCase() || "student";
  const navItems = (dashboardNavConfig as any)[userRole] || [];

  return (
    <aside className="w-64 border-r bg-gray-50/40 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-brand-900">DeepRubric</h1>
      </div>
      <nav className="px-4 space-y-2">
        {navItems.map((item: any, index: number) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href || index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                pathname === item.href
                  ? "bg-white text-brand-500 shadow-sm border"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {typeof IconComponent === "function" ? (
                <IconComponent className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4" />
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
