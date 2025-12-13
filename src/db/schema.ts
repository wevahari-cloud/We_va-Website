import { pgTable, text, serial, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// Team Members
export const team = pgTable("team", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    bio: text("bio"),
    imageUrl: text("image_url"),
    type: text("type").default("member"), // 'board' or 'member'
    createdAt: timestamp("created_at").defaultNow(),
});

// Events
export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    date: text("date").notNull(), // Storing as YYYY-MM-DD string for simplicity
    time: text("time"),
    venue: text("venue"),
    category: text("category"),
    posterUrl: text("poster_url"),
    createdAt: timestamp("created_at").defaultNow(),
});

// History / Timeline
export const history = pgTable("history", {
    id: serial("id").primaryKey(),
    year: text("year").notNull(),
    title: text("title").notNull(),
    date: text("date"),
    description: text("description"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Gallery
export const gallery = pgTable("gallery", {
    id: serial("id").primaryKey(),
    title: text("title"),
    imageUrl: text("image_url").notNull(),
    category: text("category"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Site Content (Key-Value Key for dynamic pages)
// Using JSONB for flexibility (storing Hero, Stats, etc. in one row per section)
export const content = pgTable("content", {
    key: text("key").primaryKey(), // e.g. 'home', 'about', 'contact'
    data: jsonb("data").notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
