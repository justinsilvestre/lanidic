/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import radicalsPaths from "@/app/svg/radicalsPaths.json";
import classifiersPaths from "@/app/svg/classifiersPaths.json";
import { rootsTables } from "@/app/roots/rootsTables";
import { Radical, Classifier } from "@/app/roots/rootsStructure";
import { ClassifiedHandshape, capitalize, toRadicalForm } from "./PrefixPage";
import { useEffect, useState } from "react";
import { parseDerivationText } from "./parseDerivationText";

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
        {prefix && (
          <div className="text-sm mt-4 p-1 bg-[rgba(var(--foreground-rgb),_.05)]">
            {parseDerivationText(prefix, capitalize(derivationText)).map(
              (segment, i) => {
                switch (segment.type) {
                  case "text":
                    return segment.text;
                  case "prefix":
                  case "classifier": {
                    const prefixAsRoot =
                      rootsTables.byPrefix[prefix].prefixAsRoot ||
                      segment.syllablesText;
                    return (
                      <span key={String(i)}>
                        <Link
                          href={`/p/${segment.syllablesText}`}
                          className="group whitespace-nowrap"
                        >
                          <span className="[font-variant:small-caps] [font-size:1.2em] group-hover:underline">
                            {segment.inflectedMeaning || segment.meaning}
                          </span>
                          &nbsp;
                          <span className="italic group-hover:text-orange-600">
                            ({prefixAsRoot})
                          </span>
                        </Link>
                      </span>
                    );
                  }
                  case "radical": {
                    const radical = toRadicalForm(segment.syllablesText);
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
                            {segment.inflectedMeaning || segment.meaning}
                          </span>
                        </Link>
                      </span>
                    );
                  }
                }
              }
            )}
          </div>
        )}
        {!prefixSyllables.length && (
          <div className="text-xs mt-3">
            <h4 className="  ">radical meanings:</h4>
            {Object.keys(rootsTables.byRadical[suffix as Radical]).map(
              (radicalMeaning, i, arr) => (
                <span key={String(i)} className="italic">
                  <Link
                    href={`/r/${suffix}#${radicalMeaning}`}
                    className="hover:underline text-xs"
                  >
                    <span className="inline-flex flex-col items-center hover:underline text-xs">
                      <span>
                        {radicalMeaning}
                        {i < arr.length - 1 && ","}
                      </span>
                    </span>
                  </Link>
                  {i < arr.length - 1 && <> </>}
                </span>
              )
            )}
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
      const nextFrameIndex = animationFrameIndex + 1;

      setAnimationFrameIndex(
        nextFrameIndex === totalFramesCount ? null : nextFrameIndex
      );
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
      className={`group flex flex-row gap-2 bg-[rgba(var(--background-end-rgb),_.3)] ${
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
            filter:
              "drop-shadow(5px 5px 5px rgb(var(--background-end-rgb))) drop-shadow(5px 5px 5px rgb(var(--background-end-rgb))) drop-shadow(5px 5px 5px rgb(var(--background-end-rgb)))",
          }}
        >
          {animationFrameIndex === 0
            ? `${classifier}- /${firstRadical}/`
            : `/${radicals[animationFrameIndex]}/`}
        </text>
      )}
      {totalFramesCount > 1 && animationFrameIndex === null && (
        <text
          x={40}
          y={950}
          textAnchor="left"
          fontSize={90}
          className=" opacity-50 group-hover:opacity-100"
          style={{
            fill: "rgb(var(--foreground-rgb))",
            filter:
              "drop-shadow(5px 5px 5px rgb(var(--background-end-rgb))) drop-shadow(5px 5px 5px rgb(var(--background-end-rgb))) drop-shadow(5px 5px 5px rgb(var(--background-end-rgb)))",
          }}
        >
          {"▶"}&#xFE0E;
        </text>
      )}
    </svg>
  );
}

export type DerivationTextSegment =
  | {
      type: "radical" | "classifier" | "prefix";
      meaning: string;
      inflectedMeaning?: string;
      syllablesText: string;
    }
  | {
      type: "text";
      text: string;
    };
