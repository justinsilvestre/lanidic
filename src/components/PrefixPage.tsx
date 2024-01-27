/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useState } from "react";
import radicalsPaths from "@/app/svg/radicalsPaths.json";
import classifiersPaths from "@/app/svg/classifiersPaths.json";
import { ExpandedPrefixTable, rootsTables } from "@/app/roots/rootsTables";
import {
  complementaryPairs,
  consonants,
  vowels,
  Radical,
  Classifier,
  classifiers,
} from "@/app/roots/rootsStructure";
import { RootDefinition } from "./RootDefinition";

function PrefixTableDisplay({
  prefix,
  table,
  className,
}: {
  prefix: string | null;
  table: ExpandedPrefixTable;
  mode?: "consonant triplets" | "complementaryPairs";
  className?: string;
}) {
  const [mode, setMode] = useState<"consonant triplets" | "complementaryPairs">(
    "complementaryPairs"
  );

  const prefixSyllables = prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/) || [];
  const prefixRadicals = prefixSyllables.slice(1);
  return (
    <div className={`${className} flex flex-col gap-1`}>
      <h1 className="text-2xl  text-center mb-2">
        {prefix ? (
          <>
            {prefixRadicals.length ? (
              <>words with prefix</>
            ) : (
              <>words with classifier</>
            )}{" "}
            <strong>
              {prefixRadicals.length ? (
                <>
                  {rootsTables.byPrefix[prefix].prefixForms?.join(", ") ||
                    prefix}
                </>
              ) : (
                <>{prefixSyllables[0]}</>
              )}
            </strong>
            -
          </>
        ) : (
          <>standalone radicals</>
        )}
      </h1>
      <div className="m-auto max-w-[500px]">
        <ClassifierOrPrefixSign
          prefix={prefix}
          size={150}
          className="float-left mr-4"
        />
        {prefix?.length === 2 || !prefix ? (
          <p>
            {classifierDescriptions[prefix?.length === 2 ? prefix : "null"]}
          </p>
        ) : null}
        {prefix && rootsTables.byPrefix[prefix]?.definition && (
          <>
            <p className="mb-4">
              These words are derived from{" "}
              <b>{rootsTables.byPrefix[prefix].prefixAsRoot}</b>, meaning "
              {rootsTables.byPrefix[prefix].definition.replace(/\.$/, "")}".
            </p>
            <p className="">
              classifier:{" "}
              <Link
                href={`/p/${prefixSyllables[0]}`}
                className="font-bold underline hover:no-underline"
              >
                {prefixSyllables[0]}-
              </Link>
            </p>
            <p className="">
              {prefixRadicals.length === 1 ? "radical: " : "radicals: "}
              {prefixRadicals.map((radical) => (
                <Link
                  href={`/r/${radical}`}
                  key={radical}
                  className="font-bold underline hover:no-underline"
                >
                  {radical}
                </Link>
              ))}
            </p>
          </>
        )}
      </div>
      <div className="flex flex-row gap-2 m-auto my-4 max-w-[500px]">
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
      </div>
      <div className="flex flex-col">
        {mode === "complementaryPairs"
          ? complementaryPairs.map(([radicalA, radicalB]) => {
              return (
                <div key={radicalA} className="flex flex-row flex-wrap ">
                  <RootDefinition
                    prefix={prefix}
                    suffix={radicalA}
                    entry={table.children[radicalA]}
                    key={radicalA}
                    className={`basis-1/2 flex-grow p-1 text-right flex-row-reverse`}
                  />
                  <RootDefinition
                    prefix={prefix}
                    suffix={radicalB}
                    entry={table.children[radicalB]}
                    key={radicalB}
                    className="basis-1/2 flex-grow p-1 flex-row min-w-[200px]"
                  />
                </div>
              );
            })
          : consonants.map((consonant) => {
              return (
                <div
                  key={consonant}
                  className="flex flex-row flex-wrap justify-center"
                >
                  {vowels.map((vowel) => {
                    const radical: Radical = (consonant + vowel) as Radical;
                    const radicalSuffixEntry = table.children[radical];
                    return (
                      <RootDefinition
                        prefix={prefix}
                        suffix={radical}
                        entry={radicalSuffixEntry}
                        key={radical}
                        className="basis-1/3 p-1 flex-row min-w-[200px] max-sm:flex-grow"
                      />
                    );
                  })}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export function PrefixPage({
  prefix,
  table,
}: {
  prefix: string | null;
  table: ExpandedPrefixTable;
}) {
  return (
    <>
      <PrefixTableDisplay
        className="w-full max-w-screen-lg m-4"
        prefix={prefix}
        table={table}
      />
    </>
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
  if (!radicalsPaths[radical]) throw new Error(`invalid radical ${radical}`);

  return (
    <svg
      viewBox="30 30 450 450"
      height={size}
      width={size}
      className={`${className}`}
    >
      <path
        d={radicalsPaths[radical].fill}
        style={{ fill: "rgb(var(--background-end-rgb))" }}
      />
      <path
        d={radicalsPaths[radical].outline}
        style={{ fill: "rgb(var(--foreground-rgb))" }}
      />
    </svg>
  );
}

function DominantHandSvgObject({
  handshapeForm,
  x,
  y,
  rotation,
  scale = 1,
}: {
  handshapeForm: HandshapeForm | "PLACEHOLDER";
  x: number;
  y: number;
  rotation: number;
  scale?: number;
}) {
  const xOffset = handshapeForm === "PLACEHOLDER" ? 0 : -250;
  const yOffset = handshapeForm === "PLACEHOLDER" ? 0 : -250;
  return (
    <g style={{ transform: `translate(${x + xOffset}px, ${y + yOffset}px)` }}>
      {handshapeForm === "PLACEHOLDER" ? (
        <circle r="100" style={{ fill: "rgb(var(--foreground-rgb), .5)" }} />
      ) : (
        <>
          <path
            d={handshapeForm.fill}
            style={{
              transformOrigin: `${-xOffset}px ${-yOffset}px`,
              transform: `rotate(${rotation}deg) scale(${scale})`,
              fill: "rgb(var(--background-end-rgb))",
            }}
          />
          <path
            d={handshapeForm.outline}
            style={{
              transformOrigin: `${-xOffset}px ${-yOffset}px`,
              transform: `rotate(${rotation}deg) scale(${scale})`,
            }}
          />
        </>
      )}
    </g>
  );
}

function NonDominantHandSvgObject({
  handshapeForm,
  x,
  y,
  rotation,
}: {
  handshapeForm: HandshapeForm | "PLACEHOLDER";
  x: number;
  y: number;
  rotation: number;
}) {
  const xOffset = handshapeForm === "PLACEHOLDER" ? 0 : -250;
  const yOffset = handshapeForm === "PLACEHOLDER" ? 0 : -250;
  return (
    <g style={{ transform: `translate(${x + xOffset}px, ${y + yOffset}px)` }}>
      {handshapeForm === "PLACEHOLDER" ? (
        <circle r="100" style={{ fill: "rgb(var(--foreground-rgb), .5)" }} />
      ) : (
        <>
          <path
            d={handshapeForm.fill}
            style={{
              transformOrigin: `${-xOffset}px ${-yOffset}px`,
              transform: `rotate(${rotation}deg) scaleX(-1)`,
              fill: "rgb(var(--background-end-rgb))",
              filter: "var(--non-dominant-hand-filter)",
            }}
          />
          <path
            d={handshapeForm.outline}
            style={{
              transformOrigin: `${-xOffset}px ${-yOffset}px`,
              transform: `rotate(${rotation}deg) scaleX(-1)`,
            }}
          />
        </>
      )}
    </g>
  );
}

type HandshapeForm = {
  fill: string;
  outline: string;
};

export function ClassifiedHandshape({
  classifier,
  dominantHand,
  nondominantHand: givenNondominantHand,
  showMovement = true,
}: {
  classifier: Classifier | null;
  dominantHand: HandshapeForm | "PLACEHOLDER";
  nondominantHand?: HandshapeForm | "PLACEHOLDER";
  showMovement?: boolean;
}) {
  const nondominantHand = givenNondominantHand || dominantHand;
  switch (classifier) {
    case "bu":
      return (
        <>
          <path
            d={classifiersPaths.bu.fill}
            transform={`translate(500,700)`}
            style={{
              fill: "rgb(var(--background-end-rgb))",
              filter: "brightness(0.9)",
            }}
          />
          <path
            d={classifiersPaths.bu.outline}
            transform={`translate(500,700)`}
          />
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={400}
            y={750}
            rotation={0}
          />
        </>
      );
    case "di":
      return (
        <>
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={200}
            y={230}
            rotation={20}
          />
        </>
      );
    case "gi":
      return (
        <>
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={300}
            y={550}
            rotation={40}
          />
        </>
      );
    case "ku":
      return (
        <>
          {showMovement && (
            <>
              <path
                d={classifiersPaths.shortUp.fill}
                transform={`translate(400,750)`}
                style={{
                  fill: "rgb(var(--background-end-rgb), 0.5)",
                }}
              />
              <path
                d={classifiersPaths.shortUp.outline}
                transform={`translate(400,750)`}
                style={{
                  opacity: "0.7",
                }}
              />
            </>
          )}
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={400}
            y={600}
            rotation={10}
          />
        </>
      );
    case "li":
      return (
        <>
          {showMovement && (
            <>
              {" "}
              <path
                d={classifiersPaths.longDown.fill}
                style={{
                  transform: "translate(240px,100px)",
                  fill: "rgb(var(--background-end-rgb), 0.5)",
                }}
              />
              <path
                d={classifiersPaths.longDown.outline}
                style={{
                  transform: "translate(240px,100px)",
                  opacity: "0.7",
                }}
              />
              <path
                d={classifiersPaths.longDown.fill}
                style={{
                  transform: "translate(670px,100px)",
                  fill: "rgb(var(--background-end-rgb), 0.5)",
                }}
              />
              <path
                d={classifiersPaths.longDown.outline}
                style={{
                  transform: "translate(670px,100px)",
                  opacity: "0.7",
                }}
              />
            </>
          )}
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={150}
            y={500}
            rotation={-10}
          />
          <NonDominantHandSvgObject
            handshapeForm={nondominantHand}
            x={1000 - 150}
            y={500}
            rotation={10}
          />
        </>
      );
    case "mi":
      return (
        <>
          {showMovement && (
            <>
              <path
                d={classifiersPaths.shortUp.fill}
                style={{
                  transformOrigin: "100px 100px",
                  transform: "translate(200px, 500px) rotate(220deg) ",
                  fill: "rgb(var(--background-end-rgb), 0.5)",
                }}
              />
              <path
                d={classifiersPaths.shortUp.outline}
                style={{
                  transformOrigin: "100px 100px",
                  transform: "translate(200px, 500px) rotate(220deg) ",
                }}
              />
              <path
                d={classifiersPaths.shortUp.fill}
                style={{
                  transformOrigin: "100px 100px",
                  transform: "translate(520px, 550px) rotate(140deg) ",
                  fill: "rgb(var(--background-end-rgb), 0.5)",
                }}
              />
              <path
                d={classifiersPaths.shortUp.outline}
                style={{
                  transformOrigin: "100px 100px",
                  transform: "translate(520px, 550px) rotate(140deg) ",
                }}
              />
            </>
          )}
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={200}
            y={800}
            rotation={40}
          />
          <NonDominantHandSvgObject
            handshapeForm={nondominantHand}
            x={1000 - 200}
            y={800}
            rotation={-40}
          />
        </>
      );
    case "nu":
      return (
        <>
          {showMovement && (
            <>
              <path
                d={classifiersPaths.longDown.fill}
                style={{
                  transform: "translate(400px, 400px) rotate(10deg)",
                  fill: "rgb(var(--background-end-rgb), 0.3)",
                }}
              />

              <path
                d={classifiersPaths.longDown.outline}
                style={{
                  transform: "translate(400px, 400px) rotate(10deg)",
                }}
              />
            </>
          )}
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={400}
            y={800}
            rotation={40}
            scale={1.1}
          />
        </>
      );
    case "pi":
      return (
        <>
          <path
            d={classifiersPaths.pi.fill}
            transform={`translate(450,650)`}
            style={{
              fill: "rgb(var(--background-end-rgb))",
              filter: "brightness(0.9)",
            }}
          />
          <path
            d={classifiersPaths.pi.outline}
            transform={`translate(450,650)`}
          />
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={450}
            y={600}
            rotation={20}
          />
        </>
      );
    case "si":
      return (
        <>
          {showMovement && (
            <>
              <path
                d={classifiersPaths.curve.fill}
                transform={`translate(300,150)`}
                style={{ fill: "rgb(var(--background-end-rgb), 0.7)" }}
              />
              <path
                d={classifiersPaths.curve.outline}
                transform={`translate(300,150)`}
                style={{ opacity: "0.7" }}
              />
            </>
          )}
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={180}
            y={400}
            rotation={-20}
          />
        </>
      );
    case "tu":
      return (
        <>
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={550}
            y={600}
            rotation={20}
          />
          <path
            d={classifiersPaths.tu.fill}
            transform={`translate(400,700)`}
            style={{
              fill: "rgb(var(--background-end-rgb))",
              filter: "brightness(0.9)",
            }}
          />
          <path
            d={classifiersPaths.tu.outline}
            transform={`translate(400,700)`}
          />
        </>
      );
    default:
      return (
        <>
          <DominantHandSvgObject
            handshapeForm={dominantHand}
            x={250}
            y={650}
            rotation={0}
          />
        </>
      );
  }
}

function ClassifierOrPrefixSign({
  prefix,
  size,
  className,
}: {
  prefix: string | null;
  size?: number;
  className?: string;
}) {
  const prefixSyllables = prefix?.split(/(?<=[aeiou])(?=[bdgklmnpst])/) || [];
  const classifier = (prefixSyllables[0] || null) as Classifier | null;
  const remainingPrefix = prefixSyllables.slice(1) as Radical[];
  return (
    <svg
      className={`flex flex-row gap-2 bg-[rgba(var(--background-end-rgb),_.3)] ${className}`}
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      style={{ fill: "rgb(var(--foreground-rgb))" }}
    >
      <path d={classifiersPaths.bust.outline} transform="translate(260,75)" />

      {remainingPrefix.map((radical, i) => {
        return (
          <ClassifiedHandshape
            classifier={classifier}
            key={i}
            dominantHand={radicalsPaths[radical]}
          />
        );
      })}
      {remainingPrefix.length === 0 ? (
        <>
          <ClassifiedHandshape
            classifier={classifier}
            dominantHand="PLACEHOLDER"
          />
          <g opacity=".5">
            <ClassifiedHandshape
              classifier={classifier}
              dominantHand={radicalsPaths.na}
            />
          </g>
        </>
      ) : null}
    </svg>
  );
}

const classifierDescriptions: Record<Classifier | "null", string> = {
  null: "These especially common words include things like like numerals, pronouns, and grammatical helpers. They are all monosyllables, and they are signed in the neutral position.",
  bu: "This classifier denotes spatial relationships. These are all transitive verbs, i.e. verbs which take a direct object.",
  di: "This classiier denotes bodily relationships, bodily actions, and senses. These are all transitive verbs, i.e. verbs which take a direct object.",
  gi: "This classifier denotes body parts, plant parts, and organic things in general. These are all nouns and adjectives/intransitive verbs.",
  ku: "This classifier denotes life forms or states of living things. These are all nouns and adjectives/intransitive verbs.",
  li: "This classifier denotes substances, physical properties, and sensations. These are all nouns and adjectives/intransitive verbs.",
  mi: "This classifier denotes buildings, vehicles, and other artificial structures or places. These are all nouns.",
  nu: "This classifier denotes social and verbal relationships and actions. These are all transitive verbs, i.e. verbs which take a direct object.",
  pi: "This classifier denotes tools, artificial materials, and other artifacts made by people. These are all nouns.",
  si: "This classifier denotes natural places, weather phenomena, and other natural forces. These are all nouns and adjectives/intransitive verbs.",
  tu: "This classifier denotes shapes, physical and temporal dimensions, physical states, and physical actions. These are all nouns and adjectives/intransitive verbs.",
};

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toRadicalForm(derivationFormatSyllable: string) {
  return derivationFormatSyllable
    .toLowerCase()
    .replace("e", "i")
    .replace("o", "u") as Radical;
}
