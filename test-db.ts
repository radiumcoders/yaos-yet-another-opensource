import { db } from "./db";
import { dataTable } from "./db/schema";

async function testDB() {
  try {
    console.log("🔍 Connecting to database...");
    const result = await db.select().from(dataTable);
    console.log("✅ Database connection successful!");
    console.log(`📊 Found ${result.length} rows in the database`);
    console.log("📝 Data:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("❌ Database error:", error);
  }
}

testDB();
