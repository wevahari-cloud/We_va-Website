"use server";

import { db } from "@/db";
import { team } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
    try {
        const members = await db.select().from(team).orderBy(team.createdAt);
        return members;
    } catch (error) {
        console.error("Failed to fetch team members:", error);
        return [];
    }
}

export async function addTeamMember(data: {
    name: string;
    role: string;
    bio?: string;
    imageUrl?: string;
    type?: string;
}) {
    try {
        await db.insert(team).values(data);
        revalidatePath("/team");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to add team member:", error);
        return { success: false, error: "Database insert failed" };
    }
}

export async function deleteTeamMember(id: number) {
    try {
        await db.delete(team).where(eq(team.id, id));
        revalidatePath("/team");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete team member:", error);
        return { success: false, error: "Database delete failed" };
    }
}
