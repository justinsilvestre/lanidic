import { Radical } from "@/app/roots/rootsStructure";
import { getRadicalTable, rootsTables } from "@/app/roots/rootsTables";
import { RadicalPage } from "@/components/RadicalPage";

export async function generateStaticParams() {
  return Object.keys(rootsTables.byRadical).map((radical) => ({
    radical,
  }));
}

export default function RadicalRoute({
  params,
}: {
  params: { radical: Radical };
}) {
  const radical = params.radical;
  const table = getRadicalTable(radical);

  return <RadicalPage radical={radical} table={table} />;
}
