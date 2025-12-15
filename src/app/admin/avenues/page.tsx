"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { getAvenues, updateAvenue, seedAvenues } from "@/actions/avenues";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AvenuesPage() {
    const [avenues, setAvenues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAvenues = async () => {
        setLoading(true);
        let data = await getAvenues();

        // If no avenues, seed them
        if (data.length === 0) {
            await seedAvenues();
            data = await getAvenues();
        }

        setAvenues(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchAvenues();
    }, []);

    const handleImageUpdate = async (id: number, imageUrl: string) => {
        const result = await updateAvenue(id, imageUrl);
        if (result.success) {
            toast.success("Avenue image updated successfully");
            setAvenues(avenues.map(a => a.id === id ? { ...a, imageUrl } : a));
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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Avenues of Service</h1>
            <p className="text-muted-foreground">Manage the background images for the Avenues of Service section.</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {avenues.map((avenue) => (
                    <Card key={avenue.id}>
                        <CardHeader>
                            <CardTitle className="text-lg text-center h-12 flex items-center justify-center">
                                {avenue.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ImageUpload
                                value={avenue.imageUrl || ""}
                                onChange={(url) => handleImageUpdate(avenue.id, url)}
                                onRemove={() => handleImageUpdate(avenue.id, "")}
                                aspectRatio={16 / 9}
                                aspectRatioLabel="16:9 Landscape"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
