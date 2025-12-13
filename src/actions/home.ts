"use server";

import { db } from "@/db";
import { content } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getHomeContent() {
    try {
        const result = await db.select().from(content).where(eq(content.key, "home"));
        if (result.length === 0) return null;
        return result[0].data as any; // Cast JSONB to expected type
    } catch (error) {
        console.error("Failed to fetch home content:", error);
        return null;
    }
}

export async function updateHomeContent(data: any) {
    try {
        // Check if exists
        const existing = await db.select().from(content).where(eq(content.key, "home"));

        if (existing.length === 0) {
            await db.insert(content).values({
                key: "home",
                data: data,
            });
        } else {
            await db.update(content).set({
                data: data,
                updatedAt: new Date(),
            }).where(eq(content.key, "home"));
        }

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update home content:", error);
        return { success: false, error: "Database update failed" };
    }
}
