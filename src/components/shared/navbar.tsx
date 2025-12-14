"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Leaders", href: "/team" }, // Shortened for UI, can be "Presidents & Secretaries"
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
                {/* Logo Section */}
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3">
                    <img src="/pulse-logo.jpg" alt="Pulse of Purpose Logo" className="h-10 w-auto object-contain rounded-sm" />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight text-primary leading-tight">
                            RAC Western Valley
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">Club ID: 214199</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Button asChild variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        <Link href="https://chat.whatsapp.com/ExAmPleLiNk" target="_blank">Join Us</Link>
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <div className="lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left text-primary">RAC Western Valley</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-8">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
                                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Button asChild className="mt-4 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                    <Link href="https://chat.whatsapp.com/ExAmPleLiNk" target="_blank">Join Us Today</Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
