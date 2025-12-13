"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { getGalleryImages, deleteGalleryImage } from "@/actions/gallery";
import { toast } from "sonner";

export default function AdminGalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGallery();
    }, []);

    async function loadGallery() {
        const data = await getGalleryImages();
        setImages(data);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (confirm("Delete this photo?")) {
            const result = await deleteGalleryImage(id);
            if (result.success) {
                toast.success("Deleted");
                loadGallery();
            }
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gallery Management</h1>
                <Button asChild><Link href="/admin/gallery/new"><Plus className="mr-2 h-4 w-4" />Upload Photo</Link></Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map(img => (
                    <div key={img.id} className="relative group">
                        <img src={img.imageUrl} alt={img.title || ""} className="w-full aspect-square object-cover rounded" />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => handleDelete(img.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
