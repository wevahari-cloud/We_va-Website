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
            <div className="lg:hidden flex items-center gap-2">
                <Button asChild size="sm" className="bg-white text-[#005DAA] hover:bg-gray-100 font-bold h-9">
                    <Link href="https://rzp.io/l/donate-western-valley" target="_blank">Donate</Link>
                </Button>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#005DAA] border-l-white/10 text-white">
                        <SheetHeader>
                            <SheetTitle className="text-left flex items-center gap-2">
                                <span className="text-4xl font-black select-none tracking-tighter drop-shadow-sm">
                                    <span className="text-[#4285F4]">H</span>
                                    <span className="text-[#EA4335]">I</span>
                                    <span className="text-[#FBBC05]">!</span>
                                </span>
                                <span className="text-white font-bold text-xl ml-2 tracking-wide">RAC Western Valley</span>
                            </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-6 mt-10">
                            {navItems.map((item) => (
                                item.href === "/about" ? (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block text-xl font-medium transition-all hover:text-yellow-400 hover:translate-x-1",
                                            pathname === item.href ? "text-yellow-400 font-bold" : "text-white/90"
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
                                            "block text-xl font-medium transition-all hover:text-yellow-400 hover:translate-x-1",
                                            pathname === item.href ? "text-yellow-400 font-bold" : "text-white/90"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}

                            <div className="flex flex-col gap-4 mt-4 border-t border-white/10 pt-6">
                                <Button asChild variant="secondary" className="w-full bg-white text-[#005DAA] hover:bg-gray-100 font-bold text-md h-12">
                                    <Link href="https://rzp.io/l/donate-western-valley" target="_blank">Donate Funds</Link>
                                </Button>

                                <Button asChild className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold text-md h-12 shadow-lg hover:shadow-yellow-500/20">
                                    <Link href="https://chat.whatsapp.com/FPW5uTF6sI1FGJodn7PPE1" target="_blank">Join Us Today</Link>
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
