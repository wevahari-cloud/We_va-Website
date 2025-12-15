"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/image-upload";
import { getBenefits, updateBenefit, seedBenefits } from "@/actions/why-join";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function WhyJoinAdminPage() {
    const [benefits, setBenefits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [seeding, setSeeding] = useState(false);

    useEffect(() => {
        loadBenefits();
    }, []);

    const loadBenefits = async () => {
        setLoading(true);
        try {
            const data = await getBenefits();
            if (data.length === 0) {
                // Auto-seed if empty
                await seedBenefits();
                const seeded = await getBenefits();
                setBenefits(seeded);
            } else {
                setBenefits(data);
            }
        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: number, field: string, value: string) => {
        // Optimistic update
        setBenefits(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));

        // We defer the actual API call to a save button or debounce could be used, 
        // but given the requirement, let's just create a save handler or separate update calls for text vs image.
        // For ImageUpload, it usually triggers immediately.
    };

    const handleImageUpdate = async (id: number, url: string) => {
        setBenefits(prev => prev.map(b => b.id === id ? { ...b, imageUrl: url } : b));
        const result = await updateBenefit(id, { imageUrl: url });
        if (result.success) {
            toast.success("Image updated successfully");
        } else {
            toast.error("Failed to update image");
            loadBenefits(); // Revert
        }
    };

    if (loading) return <div className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Why Rotaract - Benefits Management</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="h-40 bg-muted relative">
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    No Background Image
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ImageUpload
                                value={item.imageUrl || ""}
                                onChange={(url) => handleImageUpdate(item.id, url)}
                                onRemove={() => handleImageUpdate(item.id, "")}
                            />
                            {/* Read-only info or editable if needed later, focusing on image for now as requested */}
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
