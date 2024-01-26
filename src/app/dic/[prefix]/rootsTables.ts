import rootsTables_ from "@/app/rootsTables.json";

export const rootsTables = rootsTables_ as Record<Prefix, RootsTable>;
export type RootsTable = Record<Suffix, RootSpecsText>;
type Prefix = string;
type Suffix = string;
type RootSpecsText = string;

export function getRootsTable(prefix: string | null = null): RootsTable {
  if (prefix === null) return monosyllablesTable;
  const table = rootsTables[prefix as keyof typeof rootsTables];
  if (!table) return {};
  return table;
}

const monosyllablesTable: RootsTable = {
  ba: "ba = [monosyllable] = stay",
  bi: "be = [monosyllable] = now",
  bu: "bo = [monosyllable] = eight",
  da: "da = [monosyllable] = more",
  di: "de = [monosyllable] = ten",
  du: "do = [monosyllable] = you",
  ga: "ga = [monosyllable] = nine",
  gi: "ge = [monosyllable] = and",
  gu: "go = [monosyllable] = when",
  ka: "ka = [monosyllable] = what",
  ki: "ke = [monosyllable] = start",
  ku: "ko = [monosyllable] = four",
  la: "la = [monosyllable] = as much as",
  li: "le = [monosyllable] = that",
  lu: "lo = [monosyllable] = six",
  ma: "ma = [monosyllable] = five",
  mi: "me = [monosyllable] = I",
  mu: "mo = [monosyllable] = all",
  na: "na = [monosyllable] = one",
  ni: "ne = [monosyllable] = of",
  nu: "no = [monosyllable] = before",
  pa: "pa = [monosyllable] = after",
  pi: "pe = [monosyllable] = seven",
  pu: "po = [monosyllable] = not",
  sa: "sa = [monosyllable] = same",
  si: "se = [monosyllable] = three",
  su: "so = [monosyllable] = part",
  ta: "ta = [monosyllable] = only",
  ti: "te = [monosyllable] = less",
  tu: "to = [monosyllable] = two",
};