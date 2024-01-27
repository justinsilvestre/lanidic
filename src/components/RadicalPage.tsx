import { Radical } from "@/app/roots/rootsStructure";
import { ExpandedRadicalTable } from "@/app/roots/rootsTables";
import { RootDefinition } from "./RootDefinition";

export function RadicalPage({
  radical,
  table,
}: {
  radical: Radical;
  table: ExpandedRadicalTable;
}) {
  return (
    <>
      <RadicalTableDisplay
        className="w-full max-w-screen-lg m-4"
        radical={radical}
        table={table}
      />
    </>
  );
}

function RadicalTableDisplay({
  radical,
  table,
  className,
}: {
  radical: Radical;
  table: ExpandedRadicalTable;
  className?: string;
}) {
  return (
    <div className={className}>
      <h1 className="text-4xl font-bold">{radical}</h1>
      <p>{Object.keys(table.radicals).join(", ")}</p>
      <div className="flex flex-col">
        {Object.entries(table.radicals).map(([radicalMeaning, entries]) => {
          return (
            <div key={radicalMeaning} className="">
              <h2 className="text-2xl font-bold">{radicalMeaning}</h2>
              <div className="flex flex-row flex-wrap">
                {Object.entries(entries).map(([rootId, entry]) => {
                  const rootSyllables = rootId.split(
                    /(?<=[aeiou])(?=[bdgklmnpst])/
                  );

                  const [
                    word,
                    abbreviatedDerivation,
                    derivationText,
                    definition,
                  ] = entry.split(" = ");
                  const derivationComponents =
                    abbreviatedDerivation.split(/ ?\+ ?/);
                  const suffixLength = derivationComponents.length - 1;
                  const prefixLength = rootSyllables.length - suffixLength;
                  const prefix = rootSyllables.slice(0, prefixLength).join("");
                  const suffix = rootSyllables.slice(prefixLength).join("");
                  return (
                    <div key={entry}>
                      <RootDefinition
                        prefix={prefix}
                        suffix={suffix}
                        entry={entry}
                        className=""
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
