"use server";

export async function generateCommand({
  components,
  rigName,
  npm
}: {
  components: Array<string>;
  rigName: string;
  npm : string
}) {
  const joined = `${npm} shadcn@latest add ${components
    .map((comp) => `${rigName}/${comp}`)
    .join(" ")}${rigName.includes("https://") ? ".json" : ""}`;
  console.log("Generated Command:", joined);
  return joined;
}
