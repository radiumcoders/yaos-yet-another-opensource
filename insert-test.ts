import { db } from "./db";
import { dataTable } from "./db/schema";
import { randomUUID } from "crypto";

const data = [
  {
    id: randomUUID(),
    title: "8Bit-CN",
    description:
      "A set of retro-designed, accessible components and a code distribution platform. Open Source. Open Code. ",
    github_url: "https://github.com/TheOrcDev/8bitcn-ui",
    live_url: "https://www.8bitcn.com/",
    raw_github_url: null,
    tags: ["shadcn", "retro", "ui", "components", "react", "tailwindcss"],
  },
  {
    id: randomUUID(),
    title: "React Bits",
    description:
      "An open source collection of animated, interactive & fully customizable React components for building memorable websites. ",
    github_url: "https://github.com/DavidHDev/react-bits",
    live_url: "https://reactbits.dev/",
    raw_github_url: null,
    tags: ["shadcn", "ui", "components", "react", "tailwindcss"],
  },
];

async function insertTestData() {
  try {
    console.log("🚀 Inserting test data...");

    console.log("📝 Data to insert:", data);

    await db.insert(dataTable).values(data);

    console.log("✅ Test data inserted successfully!");

    // Verify insertion
    const allData = await db.select().from(dataTable);
    console.log(`📊 Total rows in database: ${allData.length}`);
    console.log("📋 All data:", JSON.stringify(allData, null, 2));
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

insertTestData();
