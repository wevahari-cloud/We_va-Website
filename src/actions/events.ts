"use server";

import { db } from "@/db";
import { events } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getEvents() {
    try {
        const allEvents = await db.select().from(events).orderBy(desc(events.date));
        return allEvents;
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return [];
    }
}

export async function addEvent(data: {
    title: string;
    description?: string;
    date: string;
    time?: string;
    venue?: string;
    category?: string;
    posterUrl?: string;
    images?: string[];
}) {
    try {
        await db.insert(events).values(data);
        revalidatePath("/events");
        revalidatePath("/admin/events");
        revalidatePath("/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to add event:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function deleteEvent(id: number) {
    try {
        await db.delete(events).where(eq(events.id, id));
        revalidatePath("/events");
        revalidatePath("/admin/events");
        revalidatePath("/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return { success: false, error: "Database delete failed" };
    }
}

export async function getEvent(id: number) {
    try {
        const result = await db.select().from(events).where(eq(events.id, id));
        return result[0];
    } catch (error) {
        console.error("Failed to fetch event:", error);
        return null;
    }
}

export async function updateEvent(id: number, data: {
    title: string;
    description?: string;
    date: string;
    time?: string;
    venue?: string;
    category?: string;
    posterUrl?: string;
    images?: string[];
}) {
    try {
        await db.update(events).set(data).where(eq(events.id, id));
        revalidatePath("/events");
        revalidatePath("/admin/events");
        revalidatePath("/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to update event:", error);
        return { success: false, error: "Database update failed" };
    }
}
