import { loadSearchParams } from "@/app/search-params";
import Container from "@/components/core/container";
import Cards from "@/components/core/ness/cards";
import Header from "@/components/header";
import Search from "@/components/search";
import { getData, getDataBySearch } from "@/server/add-actions";
import { SearchParams } from "nuqs";
import { unstable_cache } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { slug } = await params;
  const search = await loadSearchParams(searchParams);

  const getCachedSearchData = unstable_cache(
    async (searchTerm: string) => getDataBySearch(searchTerm),
    ["search-data"],
    {
      tags: ["search"],
      revalidate: 5,
    },
  );

  const data = await getData(slug);
  const searchData = search.search
    ? await getCachedSearchData(search.search)
    : [];
  return (
    <Container className="p-4 flex flex-col gap-4 h-fit border-b border-x-0 border-edge">
      <Header catagory={slug} seeMore={false} />
      <Search />

      {search.search && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchData.map((item) => (
              <div key={item.id}>
                <Cards
                  title={item.title}
                  description={item.description}
                  githubUrl={item.githubUrl}
                  isUi={slug === "ui-library"}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {search.search ? "All Items" : "Items"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item.id}>
              <Cards
                title={item.title}
                description={item.description}
                githubUrl={item.githubUrl}
                isUi={slug === "ui-library"}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
