/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import radicalsPaths from "@/app/svg/radicalsPaths.json";
import classifiersPaths from "@/app/svg/classifiersPaths.json";
import { rootsTables } from "@/app/roots/rootsTables";
import { Radical, Classifier } from "@/app/roots/rootsStructure";
import { ClassifiedHandshape, capitalize, toRadicalForm } from "./PrefixPage";

export function RootDefinition({
  prefix,
  suffix,
  entry,
  className,
}: {
  prefix: string | null;
  suffix: string;
  entry: string;
  className?: string;
}) {
  if (!entry)
    return (
      <div className={`${className}  p-2`}>
        <div className="h-full w-full bg-[rgba(var(--foreground-rgb),_.04)]"></div>
      </div>
    );
  const [word, abbreviatedDerivation, derivationText, definition] =
    entry.split(" = ");
  const suffixSyllables = suffix.split(
    /(?<=[aeiou])(?=[bdgklmnpst])/
  ) as Radical[];

  const prefixSyllables = prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/) || [];
  const classifier = (prefixSyllables[0] || null) as Classifier | null;
  const firstRadical =
    (prefixSyllables[1] as Radical | undefined) || suffixSyllables[0];
  const derivationComponents = abbreviatedDerivation.split(/ ?\+ ?/);
  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="">
        {derivationComponents.map((meaningChunk, i) => {
          const isPrefix = prefix && i === 0;
          // if (isPrefix) return meaningChunk;
          if (isPrefix) return null;
          const suffixSyllable = suffixSyllables[
            i - (prefix ? 1 : 0)
          ] as Radical;

          return (
            <span key={String(i)} className="inline-block text-center">
              <svg
                className="flex flex-row gap-2 bg-[rgba(var(--background-end-rgb),_.3)]"
                viewBox="0 0 1000 1000"
                width={130}
                height={130}
                style={{ fill: "rgb(var(--foreground-rgb))" }}
              >
                <path
                  d={classifiersPaths.bust.outline}
                  transform="translate(260,75)"
                />
                <ClassifiedHandshape
                  classifier={classifier}
                  dominantHand={radicalsPaths[suffixSyllable]}
                  nondominantHand={radicalsPaths[firstRadical]}
                  showMovement={prefixSyllables.length <= 1}
                />
              </svg>
            </span>
          );
        })}
      </div>
      <div>
        <div className="">
          <b>{word}</b>
          <> </>
          {rootsTables.byPrefix[prefix + suffix] && (
            <>
              <Link
                href={`/p/${prefix}${suffix}`}
                className="underline hover:no-underline"
              >
                {rootsTables.byPrefix[prefix + suffix].prefixForms
                  ?.map((p) => p + "-")
                  .join(", ")}
              </Link>
            </>
          )}
        </div>
        <div className="">{definition}</div>
        {derivationText && (
          <div className="text-sm mt-4 p-1 bg-[rgba(var(--foreground-rgb),_.05)]">
            {capitalize(derivationText)
              .split(/(?={)|(?<=})/)
              .map((segment, i) => {
                if (segment.startsWith("{")) {
                  const colonSegments = segment.slice(1, -1).split(":");
                  if (colonSegments.length === 1) {
                    const [prefixMeaning, inflectedPrefixMeaning] =
                      colonSegments[0].split("@@");
                    const wordSyllables = word.split(
                      /(?<=[aeiou])(?=[bdgklmnpst])/
                    );
                    const prefixRealization = wordSyllables
                      .slice(0, prefixSyllables.length)
                      .join("");
                    if (!prefix) throw new Error(`no prefix for ${word}`);
                    const prefixAsRoot =
                      rootsTables.byPrefix[prefix].prefixAsRoot;
                    return (
                      <span key={String(i)}>
                        <Link href={`/p/${prefix}`} className="group">
                          <span className="[font-variant:small-caps] [font-size:1.2em] group-hover:underline">
                            {inflectedPrefixMeaning || prefixMeaning}
                          </span>{" "}
                          <span className="italic group-hover:text-orange-600">
                            ({prefixAsRoot})
                          </span>
                        </Link>
                      </span>
                    );
                  } else {
                    const [syllable] = colonSegments;
                    const [syllableMeaning, inflectedSyllableMeaning] =
                      colonSegments[1].split("@@");
                    const syllableIsRadical = syllable.length === 1;
                    if (syllableIsRadical)
                      return (
                        <span key={String(i)}>
                          <span className="[font-variant:small-caps] [font-size:1.2em]">
                            {inflectedSyllableMeaning || syllableMeaning}
                          </span>
                        </span>
                      );
                    const radical = toRadicalForm(syllable);
                    return (
                      <span key={String(i)}>
                        <Link href={`/r/${radical}`} className="group">
                          <span className="inline-flex flex-col items-center group-hover:text-orange-700">
                            <span>/{radical}/</span>
                          </span>{" "}
                          <span className="font-bold underline group-hover:no-underline">
                            {inflectedSyllableMeaning || syllableMeaning}
                          </span>
                        </Link>
                      </span>
                    );
                  }
                }
                return segment;
              })}
          </div>
        )}
      </div>
    </div>
  );
}
