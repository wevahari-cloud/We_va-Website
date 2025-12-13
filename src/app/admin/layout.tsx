"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                if (pathname !== "/admin/login") {
                    router.push("/admin/login");
                }
            } else {
                setUser(currentUser);
                if (pathname === "/admin/login") {
                    router.push("/admin");
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // If on login page, render without sidebar (if somehow logic allows, but usually routed separately)
    // Actually, standard practice: Login page should utilize a DIFFERENT layout or check inside.
    // BUT Next.js Nested Layouts apply to all children.
    // If "/admin/login" is a child of "/admin", this layout applies.
    // We want Login Page to be FULL SCREEN, NO SIDEBAR.
    // So we conditionally render Sidebar.

    if (pathname === "/admin/login") {
        return <main>{children}</main>;
    }

    // If not user (and not loading, and not on login - shouldn't happen due to redirect), return null/spinner
    if (!user && pathname !== "/admin/login") return null;

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900/50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
