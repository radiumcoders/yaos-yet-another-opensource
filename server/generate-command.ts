"use server";

export async function generateCommand({
  components,
  rigName,
}: {
  components: Array<string>;
  rigName: string;
}) {
  const joined = `pnpx shadcn@latest add ${components
    .map((comp) => `${rigName}/${comp}`)
    .join(" ")}${rigName.includes("https://") ? ".json" : ""}`;
  console.log("Generated Command:", joined);
  return joined;
}
