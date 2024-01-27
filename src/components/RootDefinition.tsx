/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import radicalsPaths from "@/app/svg/radicalsPaths.json";
import classifiersPaths from "@/app/svg/classifiersPaths.json";
import { rootsTables } from "@/app/roots/rootsTables";
import { Radical, Classifier, classifiers } from "@/app/roots/rootsStructure";
import { ClassifiedHandshape, capitalize, toRadicalForm } from "./PrefixPage";
import { useEffect, useState } from "react";

export function RootDefinition({
  prefix,
  suffix,
  entry,
  className,
  showPrefixInPreview = true,
}: {
  prefix: string | null;
  suffix: string;
  entry: string;
  className?: string;
  showPrefixInPreview?: boolean;
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

  const prefixSyllables = (prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/) ||
    []) as Radical[];
  const classifier = (prefixSyllables[0] || null) as Classifier | null;
  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="">
        <span className="inline-block text-center">
          <RootSvg
            classifier={classifier}
            suffixSyllables={suffixSyllables}
            prefixSyllables={prefixSyllables}
            showPrefixInPreview={showPrefixInPreview}
          />
        </span>
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
                        <Link
                          href={`/p/${prefix}`}
                          className="group whitespace-nowrap"
                        >
                          <span className="[font-variant:small-caps] [font-size:1.2em] group-hover:underline">
                            {inflectedPrefixMeaning || prefixMeaning}
                          </span>
                          &nbsp;
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
                    const syllableIsClassifier = syllable.length === 1;
                    if (syllableIsClassifier) {
                      const classifier = classifiers.find((c) =>
                        c.startsWith(syllable.toLowerCase())
                      );
                      return (
                        <span key={String(i)}>
                          <Link
                            href={`/p/${classifier}`}
                            className="group whitespace-nowrap"
                          >
                            <span className="[font-variant:small-caps] [font-size:1.2em]">
                              {inflectedSyllableMeaning || syllableMeaning}
                            </span>
                            &nbsp;(
                            <span className="italic group-hover:text-orange-600">
                              {classifier}-
                            </span>
                            )
                          </Link>
                        </span>
                      );
                    }
                    const radical = toRadicalForm(syllable);
                    return (
                      <span key={String(i)}>
                        <Link
                          href={`/r/${radical}`}
                          className="group whitespace-nowrap"
                        >
                          <span className="inline-flex flex-col items-center group-hover:text-orange-700">
                            <span>/{radical}/</span>
                          </span>
                          &nbsp;
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
function RootSvg({
  classifier,
  suffixSyllables,
  prefixSyllables,
  showPrefixInPreview,
}: {
  classifier: string | null;
  suffixSyllables: Radical[];
  prefixSyllables: Radical[];
  showPrefixInPreview?: boolean;
}) {
  const firstRadical =
    (prefixSyllables[1] as Radical | undefined) || suffixSyllables[0];

  const [animationFrameIndex, setAnimationFrameIndex] = useState<number | null>(
    null
  );

  const totalFramesCount = prefixSyllables.length + suffixSyllables.length - 1;
  const radicals = prefixSyllables
    .slice(1)
    .concat(suffixSyllables) as Radical[];

  useEffect(() => {
    if (animationFrameIndex === null) return;
    if (animationFrameIndex >= totalFramesCount) {
      setAnimationFrameIndex(null);
      return;
    }

    const timeout = setTimeout(() => {
      setAnimationFrameIndex(animationFrameIndex + 1);
    }, 700);

    console.log(animationFrameIndex);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationFrameIndex]);

  return (
    <svg
      onClick={
        totalFramesCount > 1 ? () => setAnimationFrameIndex(0) : undefined
      }
      className={`flex flex-row gap-2 bg-[rgba(var(--background-end-rgb),_.3)] ${
        totalFramesCount > 1 ? "cursor-pointer" : ""
      }`}
      viewBox="0 0 1000 1000"
      width={130}
      height={130}
      style={{ fill: "rgb(var(--foreground-rgb))" }}
    >
      <path d={classifiersPaths.bust.outline} transform="translate(260,75)" />
      {(showPrefixInPreview || animationFrameIndex != null) &&
        prefixSyllables.slice(1).map((syllable, i) => {
          return (
            <ClassifiedHandshape
              key={i}
              className={`${
                animationFrameIndex != null && i !== animationFrameIndex
                  ? "hidden"
                  : ""
              }  ${
                animationFrameIndex == null && i !== totalFramesCount - 1
                  ? "opacity-50"
                  : ""
              }`}
              classifier={classifier}
              dominantHand={radicalsPaths[syllable]}
              nondominantHand={radicalsPaths[firstRadical]}
              showMovement={i === 0}
            />
          );
        })}
      {suffixSyllables.map((syllable, i) => {
        const frameIndex = i + prefixSyllables.length - 1;
        return (
          <ClassifiedHandshape
            key={String(i)}
            className={`${
              animationFrameIndex != null && frameIndex !== animationFrameIndex
                ? "hidden"
                : ""
            } ${
              animationFrameIndex == null && frameIndex !== totalFramesCount - 1
                ? "opacity-50"
                : ""
            } `}
            classifier={classifier}
            dominantHand={radicalsPaths[syllable]}
            nondominantHand={
              !showPrefixInPreview || prefixSyllables.length
                ? radicalsPaths[firstRadical]
                : null
            }
            showMovement={frameIndex === 0}
          />
        );
      })}
      {animationFrameIndex !== null && radicals[animationFrameIndex] && (
        <text
          x={40}
          y={950}
          textAnchor="left"
          fontSize={100}
          style={{
            fill: "rgb(var(--foreground-rgb))",
            // drop shadow
            filter:
              "drop-shadow(5px 5px 5px rgb(var(--background-end-rgb))) drop-shadow(5px 5px 5px rgb(var(--background-end-rgb))) drop-shadow(5px 5px 5px rgb(var(--background-end-rgb)))",
          }}
        >
          {animationFrameIndex === 0
            ? `${classifier}- /${firstRadical}/`
            : `/${radicals[animationFrameIndex]}/`}
        </text>
      )}
    </svg>
  );
}
