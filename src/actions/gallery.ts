"use server";

import { db } from "@/db";
import { gallery } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getGalleryImages() {
    try {
        const images = await db.select().from(gallery).orderBy(desc(gallery.createdAt));
        return images;
    } catch (error) {
        console.error("Failed to fetch gallery images:", error);
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
