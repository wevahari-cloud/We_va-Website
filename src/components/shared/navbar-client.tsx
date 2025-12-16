"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
}

interface NavbarClientProps {
    navItems: NavItem[];
}

export function NavbarClient({ navItems }: NavbarClientProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
                {navItems.map((item) => (
                    <React.Fragment key={item.href}>
                        {item.href === "/about" ? (
                            <a
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-yellow-400",
                                    pathname === item.href ? "text-white font-semibold" : "text-white/80"
                                )}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <Link
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-yellow-400",
                                    pathname === item.href ? "text-white font-semibold" : "text-white/80"
                                )}
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
                <Button asChild className="bg-white text-[#005DAA] hover:bg-gray-100 font-semibold mr-2">
                    <Link href="https://rzp.io/l/donate-western-valley" target="_blank">Donate</Link>
                </Button>
                <Button asChild variant="default" className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold">
                    <Link href="https://chat.whatsapp.com/FPW5uTF6sI1FGJodn7PPE1" target="_blank">Join Us</Link>
                </Button>
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle className="text-left text-primary">RAC Western Valley</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4 mt-8">
                            {navItems.map((item) => (
                                item.href === "/about" ? (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
                                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
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
                                )
                            ))}
                            <Button asChild variant="outline" className="mt-4 w-full border-[#005DAA] text-[#005DAA] hover:bg-[#005DAA] hover:text-white font-semibold">
                                <Link href="https://rzp.io/l/donate-western-valley" target="_blank">Donate Funds</Link>
                            </Button>

                            <Button asChild className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-semibold">
                                <Link href="https://chat.whatsapp.com/FPW5uTF6sI1FGJodn7PPE1" target="_blank">Join Us Today</Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
