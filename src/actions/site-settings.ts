"use server";

import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    try {
        const settings = await db.select().from(siteSettings).limit(1);
        if (settings.length === 0) {
            // Create default settings
            const [newSettings] = await db.insert(siteSettings).values({
                navbarLogoUrl: "/rotaract-logo.png",
            }).returning();
            return newSettings;
        }
        // If settings exist but logic falls through (unlikely with limit 1) or error fallback
        if (settings.length > 0) return settings[0];

        return { id: 1, navbarLogoUrl: "/rotaract-logo.png", updatedAt: new Date() };
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return { id: 1, navbarLogoUrl: "/rotaract-logo.png", updatedAt: new Date() };
    }
}

export async function updateNavbarLogo(logoUrl: string) {
    try {
        const settings = await getSiteSettings();

        await db.update(siteSettings)
            .set({
                navbarLogoUrl: logoUrl,
                updatedAt: new Date()
            })
            .where(eq(siteSettings.id, settings.id));

        revalidatePath("/");
        revalidatePath("/admin/settings");

        return { success: true };
    } catch (error) {
        console.error("Error updating navbar logo:", error);
        return { success: false, error: "Failed to update logo" };
    }
}
