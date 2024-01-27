import { PrefixPage } from "@/components/PrefixPage";
import { getPrefixTable } from "./roots/rootsTables";

export default function Home() {
  return <PrefixPage prefix={null} table={getPrefixTable(null)} />;
}
