import { getFromTitle } from "@/server/add-actions";
import { fetchComponentNames } from "@/server/fetch-component-names";
import Container from "@/components/core/container";
import Grid from "@/components/components";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getFromTitle(slug);
  const names: Array<string> = await fetchComponentNames(
    data.at(0)?.githubRawUrl || "",
  );

  return (
    <Container className="p-4 h-fit">
      <h1 className="text-3xl font-bold mb-4">
        {data.at(0)?.title?.replace(/-/g, " ")}
      </h1>
      <p className="mb-6">{data.at(0)?.description}</p>
      <p className="mb-3">Select Multiple OR Single Components  To Generate Command:</p>
      <Grid name={names} rigName={data.at(0)?.registrieName || ""} />
    </Container>
  );
}
