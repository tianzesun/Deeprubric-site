import { 
  LayoutDashboard, BookOpen, ClipboardCheck, 
  Settings, Users, ShieldCheck, FileText 
} from "lucide-react";

export const NAV_ITEMS = {
  admin: [
    { label: "System Overview", href: "/admin/dashboard", icon: ShieldCheck },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Global Courses", href: "/admin/courses", icon: BookOpen },
  ],
  professor: [ // Changed from TEACHER to professor
    { label: "Course Overview", href: "/professor/dashboard", icon: LayoutDashboard },
    { label: "My Rubrics", href: "/professor/rubrics", icon: FileText },
    { label: "Class Analytics", href: "/professor/analytics", icon: ClipboardCheck },
  ],
  grader: [
    { label: "Grading Queue", href: "/grader/dashboard", icon: ClipboardCheck },
    { label: "Submissions", href: "/grader/submissions", icon: FileText },
  ],
  student: [
    { label: "My Progress", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Grades", href: "/student/grades", icon: ClipboardCheck },
    { label: "Resources", href: "/student/resources", icon: BookOpen },
  ]
};