"use server";

import { db } from "@/db";
import { gallery } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { events } from "@/db/schema";
import { isNotNull } from "drizzle-orm";

export async function getGalleryImages() {
    try {
        const images = await db.select().from(gallery).orderBy(desc(gallery.createdAt));
        return images;
    } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        return [];
    }
}

export async function getPublicGalleryImages() {
    try {
        // Fetch gallery images
        const galleryImages = await db.select().from(gallery).orderBy(desc(gallery.createdAt));

        // Fetch events with posters
        const allEvents = await db.select({
            id: events.id,
            title: events.title,
            imageUrl: events.posterUrl,
            images: events.images,
            category: events.category,
            createdAt: events.createdAt,
        })
            .from(events)
            .orderBy(desc(events.createdAt));

        // Filter events that have a posterUrl OR additional images
        const eventPosters = allEvents.filter(e =>
            (e.imageUrl && e.imageUrl.trim() !== "") ||
            (Array.isArray(e.images) && e.images.length > 0 && e.images.some((img: any) => typeof img === 'string' && img.trim() !== ""))
        );

        // Transform event posters to match gallery structure and prevent ID collisions (if any)
        // Since we are just mapping them for display, we can use a composite ID or just rely on them being distinct enough for now
        // But to be safe, let's cast them to a unified type.

        // However, the cleanest way is just to combine them.
        // Let's assume unique IDs across tables is NOT guaranteed (both serial).
        // So we should map them to a display interface.

        const combinedImages = [
            ...galleryImages.map(img => ({ ...img, id: `gallery-${img.id}`, type: "gallery" })),
            ...eventPosters.flatMap(evt => {
                const items = [];
                // Add poster
                if (evt.imageUrl) {
                    items.push({
                        id: `event-${evt.id}-poster`,
                        title: evt.title,
                        imageUrl: evt.imageUrl as string,
                        category: evt.category,
                        createdAt: evt.createdAt,
                        type: "event",
                        eventId: evt.id,
                    });
                }

                // Add additional images
                // Ensure images is an array of strings
                if (Array.isArray(evt.images)) {
                    (evt.images as string[]).forEach((imgUrl, index) => {
                        if (typeof imgUrl === 'string' && imgUrl.trim() !== "") {
                            items.push({
                                id: `event-${evt.id}-extra-${index}`,
                                title: `${evt.title} - Photo ${index + 1}`,
                                imageUrl: imgUrl,
                                category: evt.category,
                                createdAt: evt.createdAt,
                                type: "event",
                                eventId: evt.id,
                            });
                        }
                    });
                }

                return items;
            })
        ];

        // Sort combined list by createdAt desc
        combinedImages.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
        });

        return combinedImages;
    } catch (error) {
        console.error("Failed to fetch public gallery images:", error);
        return [];
    }
}

export async function addGalleryImage(data: {
    title?: string;
    imageUrl: string;
    category?: string;
}) {
    try {
        await db.insert(gallery).values(data);
        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to add gallery image:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function deleteGalleryImage(id: number) {
    try {
        await db.delete(gallery).where(eq(gallery.id, id));
        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete gallery image:", error);
        return { success: false, error: "Database delete failed" };
    }
}
