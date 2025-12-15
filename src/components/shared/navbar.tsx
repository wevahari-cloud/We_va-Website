import Link from "next/link";
import { getSiteSettings } from "@/actions/site-settings";
import { NavbarClient } from "./navbar-client";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Leaders", href: "/leaders" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
];

// Helper to inject Cloudinary background removal with aggressive white removal
const getTransparentUrl = (url: string) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    // Apply background removal + make white transparent + optimize
    return url.replace("/upload/", "/upload/e_bgremoval:white_20,f_auto,q_auto/");
};

export async function Navbar() {
    const settings = await getSiteSettings();
    const logoUrl = settings.navbarLogoUrl ? getTransparentUrl(settings.navbarLogoUrl) : null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-[#005DAA] backdrop-blur">
            <div className="relative w-full px-[10px] flex h-20 items-center justify-between">
                {/* HI! Decoration */}
                <span className="text-5xl font-black mr-2 select-none tracking-tighter drop-shadow-sm">
                    <span className="text-[#4285F4]">H</span>
                    <span className="text-[#EA4335]">I</span>
                    <span className="text-[#FBBC05]">!</span>
                </span>

                {/* Centered Logo Section */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/">
                        {logoUrl && (
                            <img src={logoUrl} alt="Club Logo" className="h-32 w-auto object-contain" />
                        )}
                    </Link>
                </div>

                {/* Client-side nav for interactivity */}
                <NavbarClient navItems={NAV_ITEMS} />
            </div>
        </header>
    );
}
