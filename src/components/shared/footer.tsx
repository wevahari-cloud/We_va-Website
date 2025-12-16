import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-200 py-12 border-t border-slate-800">
            <div className="container px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand & Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">RAC Western Valley</h3>
                    <p className="text-sm text-slate-400">Club ID: 214199 | District 3206</p>
                    <p className="text-sm text-slate-400">
                        Fellowship Through Service.
                    </p>

                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                        <li><Link href="/events?view=upcoming" className="hover:text-yellow-400 transition-colors">Upcoming Events</Link></li>
                        <li><Link href="/leaders" className="hover:text-yellow-400 transition-colors">Our Team</Link></li>
                        <li><Link href="/gallery" className="hover:text-yellow-400 transition-colors">Gallery</Link></li>
                    </ul>
                </div>

                {/* Contact Us (Moved to 3rd Column) */}
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                    <div className="space-y-3 text-sm text-slate-400">
                        <div className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors cursor-default">
                            <Mail className="h-4 w-4 shrink-0" />
                            <span>racwesternvalley@gmail.com</span>
                        </div>
                        <Link href="https://www.instagram.com/rac_western_valley/" target="_blank" className="flex items-center space-x-2 hover:text-pink-500 transition-colors">
                            <Instagram className="h-4 w-4 shrink-0" />
                            <span>@rac_western_valley</span>
                        </Link>
                        <Link href="https://www.linkedin.com/company/rotaract-club-of-western-valley/" target="_blank" className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                            <Linkedin className="h-4 w-4 shrink-0" />
                            <span>Rotaract Club of Western Valley</span>
                        </Link>
                    </div>

                    {/* Subscribe Section */}
                    <div className="mt-6">
                        <h5 className="text-sm font-semibold text-white mb-3">Stay Connected</h5>
                        <p className="text-xs text-slate-400 mb-3">Follow us on Instagram for updates and events</p>
                        <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            <Link href="https://www.instagram.com/rac_western_valley/" target="_blank" className="flex items-center justify-center gap-2">
                                <Instagram className="h-4 w-4" />
                                Subscribe
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Rotaract Essentials (Moved to 4th Column & Expanded) */}
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Rotary 4 Way Test</h4>
                        <ul className="text-sm text-slate-400 space-y-1 list-disc pl-4">
                            <li>Is it the <span className="text-white font-medium">TRUTH</span>?</li>
                            <li>Is it <span className="text-white font-medium">FAIR</span> to all concerned?</li>
                            <li>Will it build <span className="text-white font-medium">GOODWILL</span> and BETTER FRIENDSHIPS?</li>
                            <li>Will it be <span className="text-white font-medium">BENEFICIAL</span> to all concerned?</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Rotaract Prayer</h4>
                        <p className="text-sm text-slate-400 italic leading-relaxed">
                            "Oh! God! Our Almighty Father & Ruler of the Universe, We thank thee for the inspiration you have given us for the Rotaract movement based upon Fellowship through Service. We humbly beg you to continue thy grace to enable us to do Our Service to ourselves and to our neighbors and to honor and glory of thy holy name."
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} Rotaract Club of Western Valley. All rights reserved. (v1.4)</p>
                <p className="mt-1">Developed by Antigravity Agents.</p>
            </div>
        </footer>
    );
}
