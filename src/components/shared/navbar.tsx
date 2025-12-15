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

// Helper to inject Cloudinary background removal
const getTransparentUrl = (url: string) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/e_background_removal/");
};

export async function Navbar() {
    const settings = await getSiteSettings();
    const logoUrl = settings.navbarLogoUrl ? getTransparentUrl(settings.navbarLogoUrl) : null;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-[#005DAA] backdrop-blur">
            <div className="container mx-auto px-4 md:px-8 flex h-20 items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3">
                    {logoUrl && (
                        <img src={logoUrl} alt="Club Logo" className="h-12 w-auto object-contain" />
                    )}
                </Link>

                {/* Client-side nav for interactivity */}
                <NavbarClient navItems={NAV_ITEMS} />
            </div>
        </header>
    );
}
