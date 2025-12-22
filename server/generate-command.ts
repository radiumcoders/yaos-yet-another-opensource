"use server";

export async function generateCommand({
  components,
  rigName,
}: {
  components: Array<string>;
  rigName: string;
}) {
  const joined = `pnpm add ${components
    .map((comp) => `${rigName}/${comp}`)
    .join(" ")}`;
  console.log("Generated Command:", joined);
  return joined;
}
