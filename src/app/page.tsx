import RootsTables from "@/components/RootsTables";
import { getRootsTable } from "./dic/[prefix]/rootsTables";

export default function Home() {
  return <RootsTables prefix={null} table={getRootsTable(null)} />;
}
