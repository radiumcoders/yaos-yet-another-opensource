import Container from "@/components/core/container";
import { db } from "@/db";
import { dataTable } from "@/db/schema";
import LibsFilter from "@/components/libs-filter";

// Revalidate every 30 seconds to show fresh data
export const revalidate = 30;

export default async function LibsPage() {
  // Fetch all data from database
  const allData = await db.select().from(dataTable);

  return (
    <Container className="relative min-h-screen z-10 max-w-7xl mx-auto px-4 w-full flex flex-col">
      <div className="flex-1 flex flex-col py-6">
        {/* Page Header */}
        <div className="pb-6">
          <h1 className="text-4xl font-bridge font-bold mb-2">
            Browse Libraries
          </h1>
          <p className="text-muted-foreground">
            Discover and explore open source libraries and tools
          </p>
        </div>

        {/* Empty State */}
        {allData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl opacity-20">📚</div>
              <h2 className="text-2xl font-bridge text-muted-foreground">
                No libraries yet
              </h2>
              <p className="text-muted-foreground">
                Click the + button on the home page to add your first library
              </p>
            </div>
          </div>
        ) : (
          /* Filter and Grid */
          <LibsFilter libraries={allData} />
        )}
      </div>
    </Container>
  );
}
