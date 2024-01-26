import RootsTables from "@/components/RootsTables";
import { getRootsTable, rootsTables } from "./rootsTables";

export async function generateStaticParams() {
  return Object.keys(rootsTables).map((prefix) => ({
    prefix,
  }));
}

export default function Dic({ params }: { params: { prefix: string } }) {
  const prefix = params.prefix;
  const table = getRootsTable(prefix);

  return <RootsTables prefix={prefix} table={table} />;
}
