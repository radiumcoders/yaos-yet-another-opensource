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
    data.at(0)?.githubRawUrl || ""
  );

  const registrieName = data.at(0)?.registrieName || "";
  const isReactBits = registrieName.toLowerCase().includes("react-bits");

  // Sort components only for react-bits: Priority order TS-TW, TS-CSS, JS-TW, JS-CSS
  const sortedNames = isReactBits
    ? [...names].sort((a, b) => {
        const hasTS_a = a.includes("-TS-");
        const hasTS_b = b.includes("-TS-");
        const hasJS_a = a.includes("-JS-");
        const hasJS_b = b.includes("-JS-");
        const hasTW_a = a.includes("-TW");
        const hasTW_b = b.includes("-TW");

        // Priority 1: TS before JS
        if (hasTS_a && !hasTS_b) return -1;
        if (!hasTS_a && hasTS_b) return 1;
        if (hasJS_a && !hasJS_b && !hasTS_b) return -1;
        if (!hasJS_a && hasJS_b && !hasTS_a) return 1;

        // Priority 2: within same language, TW before CSS
        if (hasTW_a && !hasTW_b) return -1;
        if (!hasTW_a && hasTW_b) return 1;

        // Priority 3: alphabetical by component name
        return a.localeCompare(b);
      })
    : names;

  return (
    <Container className="p-4 h-fit border-x-0">
      <h1 className="text-3xl font-bold mb-4">
        {data.at(0)?.title?.replace(/-/g, " ")}
      </h1>
      <p className="mb-6">{data.at(0)?.description}</p>
      <p className="mb-3">
        Select Multiple OR Single Components To Generate Command:
      </p>
      <Grid name={sortedNames} rigName={registrieName} />
    </Container>
  );
}
