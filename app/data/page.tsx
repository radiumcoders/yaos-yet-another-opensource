import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";
import { db } from "@/db";
import { dataTable } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function DataPage() {
  // Fetch all data from database
  const allData = await db.select().from(dataTable);

  return (
    <Container className="relative min-h-screen z-10 max-w-7xl mx-auto px-4 w-full flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col py-6">
        {/* Page Header */}
        <div className="pb-6">
          <h1 className="text-4xl font-bridge font-bold mb-2">Added Data</h1>
          <p className="text-muted-foreground">
            View all your added items below
          </p>
        </div>

        {/* Data Grid */}
        {allData.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl opacity-20">📦</div>
              <h2 className="text-2xl font-bridge text-muted-foreground">
                No data yet
              </h2>
              <p className="text-muted-foreground">
                Click the + button in the navbar to add your first item
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allData.map((item) => (
              <div
                key={item.id}
                className="border border-ring rounded-lg p-6 bg-card hover:shadow-lg transition-shadow"
              >
                {/* Title */}
                <h3 className="text-xl font-bold mb-2 font-geist-pixel-square">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* URLs */}
                <div className="flex gap-2">
                  {item.github_url && (
                    <Link href={item.github_url} target="_blank">
                      <Button size="sm" variant="outline">
                        <GithubLogoIcon className="mr-2" size={16} />
                        GitHub
                      </Button>
                    </Link>
                  )}
                  {item.live_url && (
                    <Link href={item.live_url} target="_blank">
                      <Button size="sm" variant="outline">
                        <GlobeIcon className="mr-2" size={16} />
                        Live
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Raw GitHub URL (if exists) */}
                {item.raw_github_url && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <Link
                      href={item.raw_github_url}
                      target="_blank"
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View raw content →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
