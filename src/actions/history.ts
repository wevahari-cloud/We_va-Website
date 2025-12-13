"use server";

import { db } from "@/db";
import { history } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getHistoryMilestones() {
    try {
        const milestones = await db.select().from(history).orderBy(desc(history.date));
        return milestones;
    } catch (error) {
        console.error("Failed to fetch history milestones:", error);
        return [];
    }
}

export async function addHistoryMilestone(data: {
    year: string;
    title: string;
    date?: string;
    description?: string;
    imageUrl?: string;
}) {
    try {
        await db.insert(history).values(data);
        revalidatePath("/history");
        revalidatePath("/admin/history");
        return { success: true };
    } catch (error) {
        console.error("Failed to add history milestone:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function deleteHistoryMilestone(id: number) {
    try {
        await db.delete(history).where(eq(history.id, id));
        revalidatePath("/history");
        revalidatePath("/admin/history");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete history milestone:", error);
        return { success: false, error: "Database delete failed" };
    }
}
