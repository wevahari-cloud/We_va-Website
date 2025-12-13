import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-200 py-12 border-t border-slate-800">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand & Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">RAC Western Valley</h3>
                    <p className="text-sm text-slate-400">Club ID: 214199 | District 3201</p>
                    <p className="text-sm text-slate-400">
                        Fellowship Through Service.
                    </p>
                    <div className="flex space-x-4 pt-2">
                        <Link href="https://instagram.com/rac_western_valley" target="_blank" className="hover:text-pink-500 transition-colors">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-blue-500 transition-colors">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-blue-400 transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-blue-700 transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
                        <li><Link href="/events" className="hover:text-yellow-400 transition-colors">Upcoming Events</Link></li>
                        <li><Link href="/team" className="hover:text-yellow-400 transition-colors">Our Team</Link></li>
                        <li><Link href="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link></li>
                        <li><Link href="/admin" className="hover:text-yellow-400 transition-colors">Member Login</Link></li>
                    </ul>
                </div>

                {/* Rotary Essentials */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Rotary Essentials</h4>
                    <div className="text-sm space-y-2 text-slate-400">
                        <p><span className="font-semibold text-white">4-Way Test:</span> Is it the TRUTH? Is it FAIR to all concerned?</p>
                        <p>Will it build GOODWILL and BETTER FRIENDSHIPS? Will it be BENEFICIAL to all concerned?</p>
                    </div>
                </div>

                {/* Contact / Newsletter */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <Mail className="h-4 w-4" />
                        <span>contact@racwesternvalley.in</span>
                    </div>
                    <p className="text-xs text-slate-500 pt-4">
                        Subscribe for updates (Coming soon)
                    </p>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="email" placeholder="Email" className="bg-slate-900 border-slate-700" disabled />
                        <Button type="submit" variant="secondary" size="sm" disabled>Subscribe</Button>
                    </div>
                </div>
            </div>

            <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} Rotaract Club of Western Valley. All rights reserved.</p>
                <p className="mt-1">Developed by Antigravity Agents.</p>
            </div>
        </footer>
    );
}
