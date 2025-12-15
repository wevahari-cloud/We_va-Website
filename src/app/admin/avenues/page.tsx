"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { getAvenues, updateAvenue, seedAvenues } from "@/actions/avenues";
import { getBenefits, updateBenefit, seedBenefits } from "@/actions/why-join";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AvenuesPage() {
    const [avenues, setAvenues] = useState<any[]>([]);
    const [benefits, setBenefits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Avenues
            let avenuesData = await getAvenues();
            if (avenuesData.length === 0) {
                await seedAvenues();
                avenuesData = await getAvenues();
            }
            setAvenues(avenuesData);

            // Fetch Benefits
            let benefitsData = await getBenefits();
            if (benefitsData.length === 0) {
                await seedBenefits();
                benefitsData = await getBenefits();
            }
            setBenefits(benefitsData);

        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAvenueImageUpdate = async (id: number, imageUrl: string) => {
        const result = await updateAvenue(id, imageUrl);
        if (result.success) {
            toast.success("Avenue image updated successfully");
            setAvenues(avenues.map(a => a.id === id ? { ...a, imageUrl } : a));
        } else {
            toast.error("Failed to update image");
        }
    };

    const handleBenefitImageUpdate = async (id: number, imageUrl: string) => {
        const result = await updateBenefit(id, { imageUrl });
        if (result.success) {
            toast.success("Benefit image updated successfully");
            setBenefits(prev => prev.map(b => b.id === id ? { ...b, imageUrl } : b));
        } else {
            toast.error("Failed to update image");
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
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Avenues & Benefits</h1>
                <p className="text-muted-foreground">Manage background images for public sections.</p>
            </div>

            {/* Avenues Section - 5 Columns */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">1. Avenues of Service</h2>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {avenues.map((avenue) => (
                        <Card key={avenue.id} className="overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-sm text-center h-10 flex items-center justify-center line-clamp-2">
                                    {avenue.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-2 space-y-3">
                                <div className="aspect-[4/5] relative bg-muted rounded-md overflow-hidden">
                                    {avenue.imageUrl ? (
                                        <img src={avenue.imageUrl} alt={avenue.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                                    )}
                                </div>
                                <ImageUpload
                                    value={avenue.imageUrl || ""}
                                    onChange={(url) => handleAvenueImageUpdate(avenue.id, url)}
                                    onRemove={() => handleAvenueImageUpdate(avenue.id, "")}
                                    aspectRatio={4 / 5}
                                    aspectRatioLabel="Portrait"
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Benefits Section - 3 Columns */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">2. Why Rotaract (Benefits)</h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                    {benefits.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="h-32 bg-muted relative">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-2 space-y-4">
                                <ImageUpload
                                    value={item.imageUrl || ""}
                                    onChange={(url) => handleBenefitImageUpdate(item.id, url)}
                                    onRemove={() => handleBenefitImageUpdate(item.id, "")}
                                />
                                <p className="text-xs text-muted-foreground line-clamp-3">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
