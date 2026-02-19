import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";
import HeroSection from "@/components/hero-section";
import { getTopRatedTools } from "@/server/ratings";
import StarRating from "@/components/ui/star-rating";
import ProjectLogo from "@/components/ui/project-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { GithubLogoIcon, GlobeIcon } from "@phosphor-icons/react/dist/ssr";

export default async function Page() {
  const topRatedTools = await getTopRatedTools(6, 1);

  return (
    <>
      <Container className="relative min-h-screen z-10 max-w-7xl mx-auto px-4 w-full flex flex-col">
        <Navbar />
        <HeroSection />

        {/* Top Rated Tools Section */}
        {topRatedTools.length > 0 && (
          <div className="pb-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bridge font-bold mb-2">
                Top Rated Tools
              </h2>
              <p className="text-muted-foreground">
                Most loved by the community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  {/* Top Section: Image + Title (Horizontal) */}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <ProjectLogo
                        src={tool.logo_url}
                        alt={tool.title}
                        size="md"
                        fallbackText={tool.title}
                      />
                      <CardTitle className="text-xl font-bold font-geist-pixel-square flex-1">
                        {tool.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  {/* Middle Section: Rating, Description, and Tags */}
                  <CardContent className="space-y-4">
                    {/* Rating */}
                    <StarRating
                      rating={parseFloat(tool.average_rating || "0")}
                      totalRatings={tool.total_ratings || 0}
                      size={16}
                      interactive={false}
                    />

                    {/* Description */}
                    <CardDescription className="text-sm line-clamp-3">
                      {tool.description}
                    </CardDescription>

                    {/* Tags */}
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag, index) => (
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
                      {tool.live_url && (
                        <Link href={tool.live_url} target="_blank" className="flex-1">
                          <Button size="default" variant="default" className="w-full">
                            <GlobeIcon className="mr-2" size={16} />
                            Visit
                          </Button>
                        </Link>
                      )}
                      {tool.github_url && (
                        <Link href={tool.github_url} target="_blank" className="flex-1">
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
          </div>
        )}
      </Container>
    </>
  );
}
