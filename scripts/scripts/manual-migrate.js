const { Client } = require('pg');

const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_KiHkJ9Evhx6C@ep-patient-band-aht7biyv-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require",
});

async function migrate() {
    try {
        await client.connect();
        console.log("Connected to database...");

        // Add images column to events table
        await client.query('ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "images" jsonb;');
        console.log("Successfully added 'images' column to events table.");

    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.end();
    }
}

migrate();
