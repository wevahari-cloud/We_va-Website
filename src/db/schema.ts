import { pgTable, text, serial, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";

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
    images: jsonb("images").$type<string[]>(), // Array of image URLs
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

// Leaders (Current Board)
export const leaders = pgTable("leaders", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    imageUrl: text("image_url"),
    order: integer("order"), // Changed to integer
    linkedinUrl: text("linkedin_url"),
    email: text("email"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Past Years (Theme & Logo metadata for each year)
export const pastYears = pgTable("past_years", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    themeTitle: text("theme_title"),
    themeLogoUrl: text("theme_logo_url"),
    order: integer("order"), // Changed to integer
    createdAt: timestamp("created_at").defaultNow(),
});

// Past Leaders (Linked to a Year)
export const pastLeaders = pgTable("past_leaders", {
    id: serial("id").primaryKey(),
    yearId: integer("year_id").notNull(), // Changed to integer
    name: text("name").notNull(),
    role: text("role").notNull(),
    imageUrl: text("image_url"),
    order: integer("order"), // Changed to integer
    createdAt: timestamp("created_at").defaultNow(),
});

// Avenues of Service
export const avenues = pgTable("avenues", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(), // 'Club Service', 'Community Service', etc.
    imageUrl: text("image_url"), // Background image
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

// Why Join Rotaract Benefits
export const whyJoin = pgTable("why_join", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    icon: text("icon"), // 'Briefcase', 'HeartHandshake', 'Smile'
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
});

// Site Settings (for navbar logo, etc.)
export const siteSettings = pgTable("site_settings", {
    id: serial("id").primaryKey(),
    navbarLogoUrl: text("navbar_logo_url"),
    updatedAt: timestamp("updated_at").defaultNow(),
});
