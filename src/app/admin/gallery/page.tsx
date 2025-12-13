"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

export default function GalleryAdminPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        try {
            await deleteDoc(doc(db, "gallery", id));
            toast.success("Deleted successfully");
        } catch (error) {
            toast.error("Error deleting image");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Gallery Management</h1>
                <Button asChild>
                    <Link href="/admin/gallery/new">
                        <Plus className="mr-2 h-4 w-4" /> Upload Photo
                    </Link>
                </Button>
            </div>

            {items.length === 0 ? (
                <div className="p-12 text-center border rounded-lg bg-slate-50 dark:bg-slate-900 text-muted-foreground">
                    No images in gallery yet. Upload some memories!
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden border bg-slate-100">
                            <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            {item.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                                    {item.caption}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
