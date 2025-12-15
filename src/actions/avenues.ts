"use server";

import { db } from "@/db";
import { avenues } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAvenues() {
    try {
        const result = await db.select().from(avenues).orderBy(asc(avenues.order));
        return result;
    } catch (error) {
        console.error("Failed to fetch avenues:", error);
        return [];
    }
}

export async function updateAvenue(id: number, imageUrl: string) {
    try {
        await db.update(avenues).set({ imageUrl }).where(eq(avenues.id, id));
        revalidatePath("/about");
        revalidatePath("/admin/avenues");
        return { success: true };
    } catch (error) {
        console.error("Failed to update avenue:", error);
        return { success: false, error: "Failed to update avenue" };
    }
}

export async function seedAvenues() {
    try {
        const existing = await db.select().from(avenues);
        if (existing.length === 0) {
            const defaultAvenues = [
                { title: "Club Service", order: 1 },
                { title: "Community Service", order: 2 },
                { title: "Professional Service", order: 3 },
                { title: "International Service", order: 4 },
                { title: "District Priority Project 'DREAM'", order: 5 },
            ];
            await db.insert(avenues).values(defaultAvenues);
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to seed avenues:", error);
        return { success: false, error: "Failed to seed avenues" };
    }
}
