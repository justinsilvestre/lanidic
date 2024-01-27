/* eslint-disable react/no-unescaped-entities */
"use client";
import { classifiers } from "@/app/roots/rootsStructure";
import { toRadicalForm } from "./PrefixPage";
import { DerivationTextSegment } from "./RootDefinition";

export function parseDerivationText(
  rootPrefix: string,
  derivationText: string
) {
  const segments = derivationText.split(/(?={)|(?<=})/);
  const parsed: DerivationTextSegment[] = [];
  for (const segment of segments) {
    if (segment.startsWith("{")) {
      const colonSegments = segment.slice(1, -1).split(":");
      if (colonSegments.length === 1) {
        const [prefixMeaning, inflectedPrefixMeaning] =
          colonSegments[0].split("@@");
        parsed.push({
          type: "prefix",
          meaning: prefixMeaning,
          inflectedMeaning: inflectedPrefixMeaning,
          syllablesText: rootPrefix,
        });
      } else if (colonSegments[0].length === 1) {
        const [syllableMeaning, inflectedSyllableMeaning] =
          colonSegments[1].split("@@");
        const classifier = classifiers.find((c) =>
          c.startsWith(colonSegments[0].toLowerCase())
        );
        if (!classifier)
          throw new Error(`no classifier for ${colonSegments[0]}`);
        parsed.push({
          type: "classifier",
          meaning: syllableMeaning,
          inflectedMeaning: inflectedSyllableMeaning,
          syllablesText: classifier,
        });
      } else {
        const [syllable] = colonSegments;
        const [syllableMeaning, inflectedSyllableMeaning] =
          colonSegments[1].split("@@");
        const radical = toRadicalForm(syllable);
        parsed.push({
          type: "radical",
          meaning: syllableMeaning,
          inflectedMeaning: inflectedSyllableMeaning,
          syllablesText: radical,
        });
      }
    } else {
      parsed.push({
        type: "text",
        text: segment,
      });
    }
  }
  return parsed;
}
