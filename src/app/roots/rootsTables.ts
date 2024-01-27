import { Radical } from "@/app/roots/rootsStructure";
import rootsTables_ from "@/app/roots/rootsTables.json";

export const rootsTables = rootsTables_ as {
  rootsCount: number;
  byPrefix: Record<Prefix, PrefixTable>;
  byRadical: Record<Radical, Record<RadicalMeaning, string[]>>;
  roots: Record<string, RootSpecsText>;
};
export type PrefixTable = {
  definition: string;
  prefixAsRoot: string | null;
  prefixForms?: string[];
  children: Suffix[];
};
type Prefix = string;
type Suffix = string;
type RadicalMeaning = string;

type RootSpecsText = string;

export type ExpandedPrefixTable = {
  definition: string;
  prefixAsRoot: string | null;
  prefixForms?: string[];
  children: Record<string, string>;
};

export type ExpandedRadicalTable = {
  radicals: Record<RadicalMeaning, Record<string, string>>;
};

export function getPrefixTable(
  prefix: string | null = null
): ExpandedPrefixTable {
  if (prefix === null) return monosyllablesTable;
  const table = rootsTables.byPrefix[prefix as keyof typeof rootsTables];
  if (!table) throw new Error(`No roots table for prefix ${prefix}`);
  return {
    ...table,
    children: Object.fromEntries(
      table.children.map((suffix) => [
        suffix,
        rootsTables.roots[prefix + suffix],
      ])
    ),
  };
}

export function getRadicalTable(radical: Radical): ExpandedRadicalTable {
  const table = rootsTables.byRadical[radical];
  if (!table) throw new Error(`No roots table for radical ${radical}`);
  return {
    radicals: Object.fromEntries(
      Object.entries(table).map(([meaning, roots]) => [
        meaning,
        Object.fromEntries(
          roots.map((root) => [root, rootsTables.roots[root]])
        ),
      ])
    ),
  };
}

const monosyllablesTable: ExpandedPrefixTable = {
  definition: "",
  prefixAsRoot: null,
  children: {
    ba: "ba = [monosyllable] =  = stay, remain",
    bi: "be = [monosyllable] =  = now",
    bu: "bo = [monosyllable] =  = eight",
    da: "da = [monosyllable] =  = more, much",
    di: "de = [monosyllable] =  = ten",
    du: "do = [monosyllable] =  = you",
    ga: "ga = [monosyllable] =  = nine",
    gi: "ge = [monosyllable] =  = and, with",
    gu: "go = [monosyllable] =  = when",
    ka: "ka = [monosyllable] =  = what, something",
    ki: "ke = [monosyllable] =  = start",
    ku: "ko = [monosyllable] =  = four",
    la: "la = [monosyllable] =  = as much as",
    li: "le = [monosyllable] =  = that, this, he, she, it",
    lu: "lo = [monosyllable] =  = six",
    ma: "ma = [monosyllable] =  = five",
    mi: "me = [monosyllable] =  = I",
    mu: "mo = [monosyllable] =  = all",
    na: "na = [monosyllable] =  = one",
    ni: "ne = [monosyllable] =  = than, by, of",
    nu: "no = [monosyllable] =  = before",
    pa: "pa = [monosyllable] =  = after",
    pi: "pe = [monosyllable] =  = seven",
    pu: "po = [monosyllable] =  = not, other",
    sa: "sa = [monosyllable] =  = same",
    si: "se = [monosyllable] =  = three",
    su: "so = [monosyllable] =  = part",
    ta: "ta = [monosyllable] =  = only",
    ti: "te = [monosyllable] =  = less, few, little",
    tu: "to = [monosyllable] =  = two",
  },
};
