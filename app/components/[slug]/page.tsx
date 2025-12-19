import { getFromTitle } from "@/actions/add-actions";
import { fetchComponentNames } from "@/actions/fetch-component-names";
import Container from "@/components/core/container";
import { nanoid } from "nanoid";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getFromTitle(slug);
  const names : Array<string> = await fetchComponentNames(data.at(0)?.githubRawUrl || "");
  return (
    <Container className="p-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          {data.at(0)?.title?.replace(/-/g, " ")}
        </h1>
        <p className="mb-6">{data.at(0)?.description}</p>
        <h2 className="text-2xl font-semibold mb-4">Components:</h2>
        <ul className="list-disc list-inside">
          {names.map((name) => (
            <li key={nanoid()}>{name}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
