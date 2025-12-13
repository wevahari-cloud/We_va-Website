"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Calendar, History, Settings, LogOut, Image as ImageIcon, Home } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const ADMIN_NAV = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Home Page", href: "/admin/home", icon: Home },
    { label: "Team Management", href: "/admin/team", icon: Users },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "History Timeline", href: "/admin/history", icon: History },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-slate-900 text-slate-100">
            <div className="p-6">
                <h2 className="text-xl font-bold tracking-tight text-white">Admin Panel</h2>
                <p className="text-xs text-slate-400">RAC Western Valley</p>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {ADMIN_NAV.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white",
                            pathname === item.href ? "bg-primary text-white" : "text-slate-400"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
