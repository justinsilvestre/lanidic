"use client";

import Link from "next/link";
import { useState } from "react";
import radicalsPaths from "@/app/svg/radicalsPaths.json";
import classifiersPaths from "@/app/svg/classifiersPaths.json";
import { RootsTable, rootsTables } from "@/app/dic/[prefix]/rootsTables";

const classifiers = [
  "bu",
  "di",
  "gi",
  "ku",
  "li",
  "mi",
  "nu",
  "pi",
  "si",
  "tu",
];

type Classifier = (typeof classifiers)[number];

const consonants = ["b", "d", "g", "k", "l", "m", "n", "p", "s", "t"] as const;
const vowels = ["a", "i", "u"] as const;

const complementaryPairs = [
  ["na", "tu"],
  ["si", "ku"],
  ["ma", "lu"],
  ["pi", "bu"],
  ["ga", "di"],
  ["mi", "ka"],
  ["du", "li"],
  ["bi", "gu"],
  ["nu", "pa"],
  ["da", "ti"],
  ["la", "ni"],
  ["gi", "su"],
  ["mu", "ta"],
  ["ba", "ki"],
  ["pu", "sa"],
];

type Consonant = (typeof consonants)[number];
type Vowel = (typeof vowels)[number];
type Radical = `${Consonant}${Vowel}`;

function RootsTableDisplay({
  prefix,
  table,
  mode = "consonant triplets",
  className,
}: {
  prefix: string | null;
  table: RootsTable;
  mode?: "consonant triplets" | "complementaryPairs";
  className?: string;
}) {
  return (
    <div className={`${className} flex flex-col gap-1`}>
      {mode === "complementaryPairs"
        ? complementaryPairs.map(([radicalA, radicalB]) => {
            return (
              <div key={radicalA} className="flex flex-row gap-4">
                <TableCell
                  prefix={prefix}
                  suffix={radicalA}
                  radicalSuffixEntry={table[radicalA]}
                  key={radicalA}
                  className={`basis-1/2 text-right flex-row-reverse`}
                />
                <TableCell
                  prefix={prefix}
                  suffix={radicalB}
                  radicalSuffixEntry={table[radicalB]}
                  key={radicalB}
                  className="basis-1/2 flex-row"
                />
              </div>
            );
          })
        : consonants.map((consonant) => {
            return (
              <div key={consonant} className="flex flex-row gap-3">
                {vowels.map((vowel) => {
                  const radical: Radical = (consonant + vowel) as Radical;
                  const radicalSuffixEntry = table[radical];
                  return (
                    <TableCell
                      prefix={prefix}
                      suffix={radical}
                      radicalSuffixEntry={radicalSuffixEntry}
                      key={radical}
                      className="basis-1/3 flex-row"
                    />
                  );
                })}
              </div>
            );
          })}
    </div>
  );
}

function TableCell({
  prefix,
  suffix,
  radicalSuffixEntry,
  className,
}: {
  prefix: string | null;
  suffix: string;
  radicalSuffixEntry: string;
  className?: string;
}) {
  if (!radicalSuffixEntry) return <div className={`${className}`}></div>;
  const [word, derivationText, definition] = radicalSuffixEntry.split(" = ");
  const suffixSyllables = suffix.split(/(?<=[aeiou])(?=[bdgklmnpst])/);

  const prefixSyllables = prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/) || [];
  const classifier = (prefixSyllables[0] || null) as Classifier | null;
  return (
    <div className={`flex ${className}`}>
      <div className="">
        {derivationText.split(/ ?\+ ?/).map((meaningChunk, i) => {
          const isPrefix = prefix && i === 0;
          // if (isPrefix) return meaningChunk;
          if (isPrefix) return null;
          const suffixSyllable = suffixSyllables[
            i - (prefix ? 1 : 0)
          ] as Radical;

          return (
            <span key={String(i)} className="inline-block text-center">
              {/* <RadicalHandshapeSvg radical={suffixSyllable} className="block" /> */}
              <svg
                className="flex flex-row gap-2 bg-[rgba(var(--background-end-rgb),_.3)]"
                viewBox="-100 -100 1200 1200"
                width={130}
                height={130}
                style={{ fill: "rgb(var(--foreground-rgb))" }}
              >
                <path d={classifiersPaths.bust} />
                <ClassifiedHandshape
                  classifier={classifier}
                  handshapePath={radicalsPaths[suffixSyllable]}
                />
              </svg>
              <span className="block text-sm">
                {prefix ? meaningChunk : null}
              </span>
            </span>
          );
        })}
      </div>
      <div>
        <div className="">
          <b>{word}</b>
        </div>
        <div className="">{definition}</div>
      </div>
    </div>
  );
}

export default function RootsTables({
  prefix,
  table,
}: {
  prefix: string | null;
  table: RootsTable;
}) {
  const prefixRadicals =
    prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/).slice(1) || [];

  const [mode, setMode] = useState<"consonant triplets" | "complementaryPairs">(
    "complementaryPairs"
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h2>classifiers</h2>
      <ul>
        <li className="inline-block p-2">
          <Link href={"/"}>∅</Link>
        </li>
        {classifiers.map((classifier) => (
          <li key={classifier} className="inline-block p-2">
            <Link href={"/dic/" + classifier}>{classifier}-</Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-2">
        <button
          className={`px-1 rounded-sm ${
            mode === "consonant triplets"
              ? "text-[rgba(var(--background-end-rgb))] bg-[rgba(var(--foreground-rgb),_.5)]"
              : "bg-[rgba(var(--foreground-rgb),_.1)]"
          }`}
          onClick={() => setMode("consonant triplets")}
        >
          consonant triplets
        </button>
        <button
          className={`px-1 rounded-sm ${
            mode === "complementaryPairs"
              ? "text-[rgba(var(--background-end-rgb))] bg-[rgba(var(--foreground-rgb),_.5)]"
              : "bg-[rgba(var(--foreground-rgb),_.1)]"
          }`}
          onClick={() => setMode("complementaryPairs")}
        >
          complementary pairs
        </button>
      </div>
      <h1 className="text-4xl  text-center mb-2">
        {prefix ? (
          <>
            words with{" "}
            {prefixRadicals.map((radical, i) => {
              return (
                <RadicalHandshapeSvg
                  radical={radical as Radical}
                  className="inline-block"
                  key={i}
                />
              );
            })}{" "}
            <strong>{prefix}</strong>-
          </>
        ) : (
          <>monosyllables</>
        )}
      </h1>
      <ClassifierOrPrefixSign prefix={prefix} size={150} />

      <RootsTableDisplay
        className="w-full max-w-screen-lg"
        prefix={prefix}
        mode={mode}
        table={table}
      />
    </main>
  );
}

function RadicalHandshapeSvg({
  radical,
  className,
  size = 75,
}: {
  radical: Radical;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 500 500"
      height={size}
      width={size}
      className={`${className}`}
    >
      <path
        d={radicalsPaths[radical]}
        style={{ fill: "rgb(var(--foreground-rgb))" }}
      />
    </svg>
  );
}

function DominantHandSvgObject({
  handshapePath,
  x,
  y,
  rotation,
}: {
  handshapePath: string;
  x: number;
  y: number;
  rotation: number;
}) {
  return handshapePath === "PLACEHOLDER" ? (
    <circle
      cx={x}
      cy={y}
      r="100"
      style={{ fill: "rgb(var(--foreground-rgb), .5)" }}
    />
  ) : (
    <path
      d={handshapePath}
      transform={`rotate(${rotation}, ${x}, ${y}) translate(${x - 250} ${
        y - 360
      }) `}
    />
  );
}

function NonDominantHandSvgObject({
  handshapePath,
  x,
  y,
  rotation,
}: {
  handshapePath: string;
  x: number;
  y: number;
  rotation: number;
}) {
  const xOffset = handshapePath === "PLACEHOLDER" ? 0 : -250;
  const yOffset = handshapePath === "PLACEHOLDER" ? 0 : -360;
  return (
    // mirror image
    <g style={{ transform: `translate(${x + xOffset}px, ${y + yOffset}px)` }}>
      {handshapePath === "PLACEHOLDER" ? (
        <circle r="100" style={{ fill: "rgb(var(--foreground-rgb), .5)" }} />
      ) : (
        <path
          d={handshapePath}
          style={{
            transformOrigin: `${-xOffset}px ${-yOffset}px`,
            transform: `rotate(-${rotation}deg) scaleX(-1)`,
          }}
        />
      )}
    </g>
  );
}

function ClassifiedHandshape({
  classifier,
  handshapePath,
}: {
  classifier: Classifier | null;
  handshapePath: string;
}) {
  switch (classifier) {
    case "bu":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={400}
            y={800}
            rotation={0}
          />
          <path
            d={classifiersPaths.bu}
            transform={`scale(.85) translate(0,200)`}
          />
        </>
      );
    case "di":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={200}
            y={300}
            rotation={20}
          />
        </>
      );
    case "gi":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={150}
            y={600}
            rotation={30}
          />
        </>
      );
    case "ku":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={400}
            y={600}
            rotation={10}
          />
        </>
      );
    case "li":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={100}
            y={400}
            rotation={0}
          />
          <NonDominantHandSvgObject
            handshapePath={handshapePath}
            x={1000 - 100}
            y={400}
            rotation={0}
          />
        </>
      );
    case "mi":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={100}
            y={800}
            rotation={40}
          />
          <NonDominantHandSvgObject
            handshapePath={handshapePath}
            x={1000 - 100}
            y={800}
            rotation={40}
          />
        </>
      );
    case "nu":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={400}
            y={900}
            rotation={40}
          />
        </>
      );
    case "pi":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={300}
            y={600}
            rotation={20}
          />
          <path
            d={classifiersPaths.pi}
            transform={`scale(.85) translate(100,00)`}
          />
        </>
      );
    case "si":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={160}
            y={400}
            rotation={-20}
          />
        </>
      );
    case "tu":
      return (
        <>
          <DominantHandSvgObject
            handshapePath={handshapePath}
            x={700}
            y={600}
            rotation={20}
          />
          <path
            d={classifiersPaths.tu}
            transform={`scale(.85) translate(300,00)`}
          />
        </>
      );
  }

  // if (!classifier)
  return (
    <>
      <DominantHandSvgObject
        handshapePath={handshapePath}
        x={200}
        y={700}
        rotation={0}
      />
    </>
  );
}

function ClassifierOrPrefixSign({
  prefix,
  size,
}: {
  prefix: string | null;
  size?: number;
}) {
  const prefixSyllables = prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/) || [];
  const classifier = (prefixSyllables[0] || null) as Classifier | null;
  const remainingPrefix = prefixSyllables.slice(1) as Radical[];
  return (
    <>
      {" "}
      {classifier}
      {remainingPrefix}
      <svg
        className="flex flex-row gap-2 bg-[rgba(var(--background-end-rgb),_.3)]"
        viewBox="-200 -200 1400 1400"
        width={size}
        height={size}
        style={{ fill: "rgb(var(--foreground-rgb))" }}
      >
        <path d={classifiersPaths.bust} />

        {remainingPrefix.map((radical, i) => {
          return (
            <ClassifiedHandshape
              classifier={classifier}
              key={i}
              handshapePath={radicalsPaths[radical]}
            />
          );
        })}
        {remainingPrefix.length === 0 ? (
          <ClassifiedHandshape
            classifier={classifier}
            handshapePath="PLACEHOLDER"
          />
        ) : null}
      </svg>
    </>
  );
}
