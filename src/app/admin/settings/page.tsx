"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { getSiteSettings, updateNavbarLogo } from "@/actions/site-settings";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
    const [logoUrl, setLogoUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const settings = await getSiteSettings();
            setLogoUrl(settings.navbarLogoUrl || "");
        } catch (error) {
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleLogoUpdate = async (url: string) => {
        const result = await updateNavbarLogo(url);
        if (result.success) {
            toast.success("Navbar logo updated successfully");
            setLogoUrl(url);
        } else {
            toast.error("Failed to update logo");
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
                <p className="text-muted-foreground">Manage your site-wide configuration</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Navbar Logo</CardTitle>
                    <CardDescription>
                        Upload a logo for the navigation bar. The background will be automatically removed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {logoUrl && (
                        <div className="mb-4 p-4 bg-[#005DAA] rounded-lg flex items-center justify-start">
                            <div className="h-24 w-auto">
                                <img
                                    src={logoUrl.includes("cloudinary.com")
                                        ? logoUrl.replace("/upload/", "/upload/e_bgremoval:white_20,f_auto,q_auto/")
                                        : logoUrl
                                    }
                                    alt="Navbar Logo Preview"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                    )}
                    <ImageUpload
                        value={logoUrl}
                        onChange={handleLogoUpdate}
                        onRemove={() => handleLogoUpdate("")}
                        aspectRatio={16 / 9}
                        aspectRatioLabel="Logo (Transparent background recommended)"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
