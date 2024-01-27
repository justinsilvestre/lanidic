// to do:
// - polysyllable prefix descriptions (word definition + meanings used in mnemonics)

export const classifiers = [
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
export type Classifier = (typeof classifiers)[number];
export const consonants = [
  "b",
  "d",
  "g",
  "k",
  "l",
  "m",
  "n",
  "p",
  "s",
  "t",
] as const;
export const vowels = ["a", "i", "u"] as const;
export const complementaryPairs = [
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
export type Radical = `${Consonant}${Vowel}`;
