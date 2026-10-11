import { BookOpen, House, LayoutDashboard, Layers, ListChecks, Route, Users } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/pathway", label: "Pathway", icon: Route },
  { href: "/modules", label: "Modules", icon: Layers },
  { href: "/discharge-check", label: "Discharge check", icon: ListChecks },
  { href: "/roles", label: "Roles", icon: Users },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/guideline", label: "Guideline", icon: BookOpen },
] as const;
