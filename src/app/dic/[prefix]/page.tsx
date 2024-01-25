import RootsTables from "@/components/RootsTables";
import { getRootsTable } from "./rootsTables";

export default function Dic({ params }: { params: { prefix: string } }) {
  const prefix = params.prefix;
  const table = getRootsTable(prefix);

  return <RootsTables prefix={prefix} table={table} />;
}
