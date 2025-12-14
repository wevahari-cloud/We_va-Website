"use server";

import { db } from "@/db";
import { leaders, pastYears, pastLeaders } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- Current Board (Leaders) Actions ---

export async function getLeaders() {
    try {
        const allLeaders = await db.select().from(leaders).orderBy(asc(leaders.order));
        return allLeaders;
    } catch (error) {
        console.error("Failed to fetch leaders:", error);
        return [];
    }
}

export async function addLeader(data: {
    name: string;
    role: string;
    imageUrl?: string;
    linkedinUrl?: string;
    email?: string;
}) {
    try {
        await db.insert(leaders).values(data);
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to add leader:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function updateLeader(id: number, data: Partial<typeof leaders.$inferInsert>) {
    try {
        await db.update(leaders).set(data).where(eq(leaders.id, id));
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to update leader:", error);
        return { success: false, error: "Database update failed" };
    }
}

export async function deleteLeader(id: number) {
    try {
        await db.delete(leaders).where(eq(leaders.id, id));
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete leader:", error);
        return { success: false, error: "Database delete failed" };
    }
}

export async function reorderLeaders(updates: { id: number; order: number }[]) {
    try {
        // Run updates in parallel (or improved batching if supported)
        await Promise.all(
            updates.map((update) =>
                db.update(leaders).set({ order: update.order }).where(eq(leaders.id, update.id))
            )
        );
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to reorder leaders:", error);
        return { success: false, error: "Database update failed" };
    }
}


// --- Past Years & Past Leaders Actions ---

export async function getPastYearsWithLeaders() {
    try {
        // Fetch years
        const years = await db.select().from(pastYears).orderBy(asc(pastYears.order)); // oldest years first

        // Fetch all past leaders
        const pLeaders = await db.select().from(pastLeaders);

        // Combine
        const result = years.map(year => {
            const yearLeaders = pLeaders
                .filter(l => l.yearId === year.id)
                .sort((a, b) => (a.order || 0) - (b.order || 0) || a.id - b.id);
            return {
                ...year,
                leaders: yearLeaders
            };
        });

        return result;
    } catch (error) {
        console.error("Failed to fetch past years:", error);
        return [];
    }
}

export async function addPastYear(data: {
    name: string;
    themeTitle?: string;
    themeLogoUrl?: string;
}) {
    try {
        // Auto-assign order? Or just let it be database default/null. 
        // Best to just use ID or createdAt for default sort if order is null.
        await db.insert(pastYears).values(data);
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to add past year:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function updatePastYear(id: number, data: Partial<typeof pastYears.$inferInsert>) {
    try {
        await db.update(pastYears).set(data).where(eq(pastYears.id, id));
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to update past year:", error);
        return { success: false, error: "Database update failed" };
    }
}

export async function addPastLeader(data: {
    yearId: number;
    name: string;
    role: string;
    imageUrl?: string;
    order?: number;
}) {
    try {
        await db.insert(pastLeaders).values(data);
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to add past leader:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function updatePastLeader(id: number, data: Partial<typeof pastLeaders.$inferInsert>) {
    try {
        await db.update(pastLeaders).set(data).where(eq(pastLeaders.id, id));
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to update past leader:", error);
        return { success: false, error: "Database update failed" };
    }
}

export async function deletePastLeader(id: number) {
    try {
        await db.delete(pastLeaders).where(eq(pastLeaders.id, id));
        revalidatePath("/leaders");
        revalidatePath("/admin/leaders");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete past leader:", error);
        return { success: false, error: "Database delete failed" };
    }
}
