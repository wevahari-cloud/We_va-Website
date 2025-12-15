"use server";

import { db } from "@/db";
import { whyJoin } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBenefits() {
    try {
        const benefits = await db.select().from(whyJoin).orderBy(asc(whyJoin.order));
        return benefits;
    } catch (error) {
        console.error("Failed to fetch benefits:", error);
        return [];
    }
}

export async function updateBenefit(id: number, data: { imageUrl?: string; title?: string; description?: string }) {
    try {
        await db.update(whyJoin).set(data).where(eq(whyJoin.id, id));
        revalidatePath("/");
        revalidatePath("/admin/why-join");
        return { success: true };
    } catch (error) {
        console.error("Failed to update benefit:", error);
        return { success: false, error: "Database update failed" };
    }
}

export async function seedBenefits() {
    try {
        const count = await db.select().from(whyJoin);
        if (count.length > 0) return { success: true, message: "Already seeded" };

        await db.insert(whyJoin).values([
            {
                title: "Professional Development",
                description: "Enhance your leadership skills, public speaking, and project management capabilities through hands-on experiences.",
                icon: "Briefcase",
                order: 1
            },
            {
                title: "Community Service",
                description: "Make a tangible difference in society through impactful projects focusing on health, education, and environment.",
                icon: "HeartHandshake",
                order: 2
            },
            {
                title: "Fellowship & Fun",
                description: "Build lifelong friendships with like-minded individuals and enjoy exciting social events and trips.",
                icon: "Smile",
                order: 3
            }
        ]);

        revalidatePath("/");
        revalidatePath("/admin/why-join");
        return { success: true };
    } catch (error) {
        console.error("Failed to seed benefits:", error);
        return { success: false, error: "Seeding failed" };
    }
}
