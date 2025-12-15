import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_KiHkJ9Evhx6C@ep-patient-band-aht7biyv-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require",
    },
});
