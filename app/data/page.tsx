import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";
import { db } from "@/db";
import { dataTable } from "@/db/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import RatingWidget from "@/components/rating-widget";
import ProjectLogo from "@/components/ui/project-logo";

// Revalidate every 30 seconds to show fresh ratings
export const revalidate = 30;

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
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                {/* Top Section: Image + Title (Horizontal) */}
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <ProjectLogo
                      src={item.logo_url}
                      alt={item.title}
                      size="md"
                      fallbackText={item.title}
                    />
                    <CardTitle className="text-xl font-bold font-geist-pixel-square flex-1">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                {/* Middle Section: Rating, Description, and Tags */}
                <CardContent className="space-y-4">
                  {/* Rating */}
                  <RatingWidget
                    toolId={item.id}
                    initialRating={item.average_rating}
                    initialTotalRatings={item.total_ratings}
                    size={16}
                  />

                  {/* Description */}
                  <CardDescription className="text-sm line-clamp-3">
                    {item.description}
                  </CardDescription>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                </CardContent>

                {/* Bottom Section: Action Buttons */}
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    {item.live_url && (
                      <Link href={item.live_url} target="_blank" className="flex-1">
                        <Button size="default" variant="default" className="w-full">
                          <GlobeIcon className="mr-2" size={16} />
                          Visit
                        </Button>
                      </Link>
                    )}
                    {item.github_url && (
                      <Link href={item.github_url} target="_blank" className="flex-1">
                        <Button size="default" variant="outline" className="w-full">
                          <GithubLogoIcon className="mr-2" size={16} />
                          GitHub
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
