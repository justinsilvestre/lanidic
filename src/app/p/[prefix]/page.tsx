import { PrefixPage } from "@/components/PrefixPage";
import { getPrefixTable, rootsTables } from "../../roots/rootsTables";

export async function generateStaticParams() {
  return Object.keys(rootsTables.byPrefix).map((prefix) => ({
    prefix,
  }));
}

export default function PrefixRoute({
  params,
}: {
  params: { prefix: string };
}) {
  const prefix = params.prefix;
  const table = getPrefixTable(prefix);

  return <PrefixPage prefix={prefix} table={table} />;
}
