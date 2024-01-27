/* eslint-disable react/no-unescaped-entities */
import { Radical } from "@/app/roots/rootsStructure";
import { ExpandedRadicalTable } from "@/app/roots/rootsTables";
import { RootDefinition } from "./RootDefinition";
import { RadicalHandshapeSvg } from "./RadicalHandshapeSvg";
import Link from "next/link";

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
  const radicalMeanings = Object.keys(table.radicals);
  return (
    <div className={className}>
      <h1 className=" m-auto max-w-screen-lg text-center">
        <RadicalHandshapeSvg
          radical={radical}
          size={100}
          className="inline-block"
        />{" "}
        <span className="text-2xl">
          radical <span className="font-bold">/{radical}/</span>{" "}
        </span>
        <span className="text-xl">({getRadicalForms(radical).join(", ")})</span>
      </h1>
      <p className="text-center">
        {radicalMeanings.map((meaning, i) => (
          <span key={meaning}>
            <a href={"#" + meaning} className="underline hover:no-underline">
              {meaning}
            </a>
            {i < radicalMeanings.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>

      <div className="py-4">{getRadicalDescription(radical)}</div>

      <div className="flex flex-col">
        {Object.entries(table.radicals).map(([radicalMeaning, entries]) => {
          return (
            <div key={radicalMeaning} className="mb-4">
              <h2 id={radicalMeaning} className="text-2xl mb-4">
                words with /{radical}/ meaning{" "}
                <span className=" font-bold">{radicalMeaning}</span>
              </h2>
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

function getRadicalForms(radical: Radical) {
  const consonant = radical[0];
  const vowel = radical[1];
  if (vowel === "a")
    return [`-${consonant}e-`, `-${consonant}o-`, `-${consonant}a`];

  if (vowel === "i")
    return [
      `-${consonant}i-`,
      `-${consonant}a-`,
      `-${consonant}e`,
      `-${consonant}ai`,
    ];

  if (vowel === "u")
    return [
      `-${consonant}u`,
      `-${consonant}a-`,
      `-${consonant}o`,
      `-${consonant}au`,
    ];

  throw new Error(`Invalid radical ${radical}`);
}

function getRadicalDescription(radical: Radical) {
  switch (radical) {
    case "ba":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ba/</b> stands for <b>hardness</b>, <b>coldness</b>,{" "}
            <b>rigidity</b>, <b>stillness</b>, <b>inactivity</b>,{" "}
            <b>slowness</b>, <b>endurance</b>, and <b>inertia</b>. Its
            complement is <Link href="/r/ku">/ku/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a rock, its hard mass standing still on
            the ground.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ba</b> means "to stay, remain".
          </p>
        </>
      );
    case "bi":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/bi/</b> stands for <b>centrality</b>,{" "}
            <b>concentration</b>,<b>thought</b>, <b>order</b>, <b>intention</b>,{" "}
            <b>artificiality</b>. By extension from its meaning of centrality,
            it also stands for <b>spinning</b> movements, which are centered on
            one point. Its complement is <Link href="/r/gu">/gu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a head, the seat of thought, raised in its
            central position on the body, directing the body's actions.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>be</b> means "now", the time which is
            <i>central</i> to the present moment.
          </p>
        </>
      );
    case "bu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/bu/</b> stands for <b>fullness</b>, <b>abundance</b>
            , , <b>fertility</b>, <b>luxuriance</b>, <b>thickness</b>, and{" "}
            <b>roundness</b>. Its complement is <Link href="/r/pi">/pi/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a hand holding a round fruit, which is
            full and ripe.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>bo</b> is a numeral, meaning "eight".
          </p>
        </>
      );
    case "da":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/da/</b> stands for <b>greatness</b>, <b>majority</b>
            , <b>superiority</b>, <b>branching</b>, and <b>size</b>. Its
            complement is <Link href="/r/ti">/ti/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a tree, its branches growing out from a
            large trunk.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>da</b> means "more, much".
          </p>
        </>
      );
    case "di":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/di/</b> stands for <b>craft</b>, <b>handling</b>,{" "}
            <b>dexterity</b>, <b>skill</b>, <b>arms</b>, <b>branches</b>,{" "}
            <b>holding</b>, <b>assistance</b>, <b>touch</b>, and
            <b>perception</b>. Its complement is <Link href="/r/ga">/ga/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>de</b> is a numeral, meaning "ten".
          </p>
        </>
      );
    case "du":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/du/</b> stands for <b>soil</b>, <b>land</b>,{" "}
            <b>depth</b>, <b>lowness</b>, <b>descent</b>, <b>pressure</b>,{" "}
            <b>gravity</b>, <b>substance</b>, <b>materiality</b>, <b>roots</b>,{" "}
            <b>solidity</b>,<b>earthliness</b>, <b>worldliness</b>, and{" "}
            <b>society</b>. Its complement is <Link href="/r/li">/li/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign points down towards the ground with the palm.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>do</b> means "you", the person who is being
            pointed at by the extended fingers of the handsign. As the
            second-person pronoun, its reference is the most stable and{" "}
            <i>grounded</i>
            of all the pronouns, from the perspective of the addressee.
          </p>
        </>
      );
    case "ga":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ga/</b> stands for <b>openings</b>,{" "}
            <p className="my-4 max-w-[550px] m-auto">gaps</p>,{" "}
            <p className="my-4 max-w-[550px] m-auto">mouths</p>,{" "}
            <p className="my-4 max-w-[550px] m-auto">consumption</p>, and{" "}
            <b>speech</b>. Its complement is <Link href="/r/di">/di/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a gaping mouth.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ga</b> is a numeral, meaning "nine".
          </p>
        </>
      );
    case "gu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/gu/</b> stands for <b>sides</b>, <b>laterality</b>,{" "}
            <b>byproducts</b>, <b>accidents</b>,{" "}
            <p className="my-4 max-w-[550px] m-auto">juxtaposition</p>,
            <b>simultaneity</b>, <b>time</b>,<b>accompaniment</b>, and{" "}
            <b>mixing</b>. Its complement is <Link href="/r/bi">/bi/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the thumb and index finger side by side.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>gu</b> means "when, if", a word that
            juxtaposes two events in time.
          </p>
        </>
      );
    case "gi":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/gi/</b> stands for <b>joints</b>, <b>joining</b>,{" "}
            <b>linking</b>,<b>accumulation</b>, <b>adhesion</b>, <b>sticking</b>
            , and <b>groups</b>. Its complement is{" "}
            <Link href="/r/su">/su/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows index and middle fingers bent, making the knuckle
            joints prominent, and suggesting the form of two people standing
            side by side.
          </p>

          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>gi</b> means "and", a word that links two
            or more things together, to be considered as one group.
          </p>
        </>
      );
    case "ki":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ki/</b> stands for <b>movement</b>, <b>mobility</b>,{" "}
            <b>quickness</b>, <b>acceleration</b>, <b>dynamism</b>,{" "}
            <b>energy</b>, and <b>shifting</b>. Its complement is{" "}
            <Link href="/r/ba">/ba/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of two running legs.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ke</b> means "to start; to become, turn
            into".
          </p>
        </>
      );
    case "ka":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ka/</b> stands for <b>exterior</b>,{" "}
            <b>foreignness</b>, <b>exposedness</b>, <b>novelty</b>,{" "}
            <b>ignorance</b>,<b>strangeness</b>, <b>appearance</b>, <b>color</b>
            , <b>marking</b>, <b>expression</b>, <b>manifestation</b>, and{" "}
            <b>existence</b>. Its complement is <Link href="/r/ma">/ma/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the little finger pointing outwards.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ka</b> means "what; something", a word that
            points to something unknown or unspecified.
          </p>
        </>
      );
    case "ku":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ku/</b> stands for <b>burning</b>, <b>processing</b>
            , <b>digesting</b>, <b>fuel</b>, <b>transformation</b>,{" "}
            <b>destruction</b>, and <b>fire</b>. Its complement is{" "}
            <Link href="/r/si">/si/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of an active fire, with four fingers like
            flames lapping.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, it is a numeral, meaning "four".
          </p>
        </>
      );
    case "la":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/la/</b> stands for <b>flatness</b>, <b>dullness</b>,{" "}
            <b>evenness</b>, <b>similarity</b>, <b>equivalence</b>,{" "}
            <b>equality</b>, <b>counting</b>, <b>numbers</b>, as well as flat
            things,
            <b>flaps</b>, <b>tongues</b>, and, by extension, <b>taste</b>. Its
            complement is <Link href="/r/ni">/ni/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a flat surface, or a tongue sticking out.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>la</b> means "as much as", a word that
            points out the equality of two things.
          </p>
        </>
      );
    case "li":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/li/</b> stands for <b>air</b>, <b>wind</b>,{" "}
            <b>height</b>, <b>ascent</b>, <b>flight</b>, <b>floating</b>,{" "}
            <b>breath</b>, <b>spirit</b>, <b>gas</b>, <b>volatility</b>, and{" "}
            <b>olfaction</b>. Its complement is <Link href="/r/du">/du/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign points up towards the sky.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>le</b> means "that, this, he, she, it". As
            the third-person pronoun, its reference is the most <i>volatile</i>{" "}
            of all the pronouns, from the perspective of the addressee.
          </p>
        </>
      );
    case "lu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/lu/</b> stands for <b>night</b>, <b>darkness</b>, as
            well as
            <b>sound</b> (a sense that works even in darkness), <b>voice</b>,{" "}
            <b>vibration</b>, <b>tides</b>, the <b>moon</b>, and <b>rhythm</b>.
            Its complement is <Link href="/r/ma">/ma/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign is iconic of a crescent moon, or a mouth open in song.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>lo</b> is a numeral, meaning "six". Its
            signed form is identical to the conventional sign for "six" in
            Chinese one-handed finger counting.
          </p>
        </>
      );
    case "ma":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ma/</b> stands for <b>day</b>, <b>light</b>,{" "}
            <b>vision</b>, <b>clarity</b>, <b>brightness</b>, <b>center</b>,{" "}
            <b>centrality</b>, <b>circle</b>, <b>roundness</b>, <b>eye</b>, and{" "}
            <b>revelation</b>. Its complement is <Link href="/r/lu">/lu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows five fingers spread out, like rays of light
            emanating from the sun.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ma</b> is a numeral, meaning "five".
          </p>
        </>
      );
    case "mi":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/mi/</b> stands for <b>interiority</b>, <b>homes</b>,{" "}
            <b>domesticity</b>,<b>familiarity</b>, <b>core</b>, <b>depth</b>,{" "}
            <b>concealment</b>, <b>privacy</b>, <b>intimacy</b>, <b>secrets</b>,
            and the <b>mind</b>. Its complement is{" "}
            <Link href="/r/ka">/ka/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign points inward, towards the body of the speaker.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>me</b> means "I, me".
          </p>
        </>
      );
    case "mu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/mu/</b> stands for <b>receiving</b>,{" "}
            <b>pulling in</b>, <b>absorption</b>, <b>suction</b>,{" "}
            <b>enclosure</b>, <b>capture</b>, and <b>support</b>, as well{" "}
            <b>recessed</b> or <b>concave</b> shapes. Its complement is{" "}
            <Link href="/r/ta">/ta/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the hand with fingers joined as though grasping a
            cup, or as though to mimic a mouth that has taken in food.
          </p>
        </>
      );
    case "na":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/na/</b> stands for <b>wholeness</b>,{" "}
            <b>integrity</b>, <b>completion</b>, <b>health</b>, and{" "}
            <b>purity</b>. Its complement is <Link href="/r/tu">/tu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows one sole finger raised up.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>na</b> means "one".
          </p>
        </>
      );
    case "ni":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ni/</b> stands for <b>points</b>, <b>angles</b>,{" "}
            <b>sharpness</b>, <b>verticality</b>, <b>disruption</b>,{" "}
            <b>pointing</b>, <b>indication</b>, <b>edges</b>, and <b>tips</b>.
            Its complement is <Link href="/r/la">/la/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the finger curled so as to emphasize the sharp
            point of the nail.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ne</b> means "than, by", a word that points
            out the difference between two things.
          </p>
        </>
      );
    case "nu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/nu/</b> stands for <b>priority</b>,{" "}
            <b>beginnings</b>, <b>leading</b>, <b>anteriority</b>,{" "}
            <b>production</b>, and <b>faces</b>. Its complement is{" "}
            <Link href="/r/pa">/pa/</Link>.
          </p>

          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the fingers curled forward to get in front of the
            thumb.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>no</b> means "before".
          </p>
        </>
      );
    case "pa":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/pa/</b> stands for <b>posteriority</b>, <b>backs</b>
            , <b>results</b>, <b>offspring</b>, and <b>remnants</b>. Its
            complement is <Link href="/r/nu">/nu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the fingers curled, almost as though to reach
            back behind the speaker.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>pa</b> means "after".
          </p>
        </>
      );
    case "pi":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/pi/</b> stands for <b>paths</b>,{" "}
            <p className="my-4 max-w-[550px] m-auto">ways</p>, <b>means</b>,{" "}
            <p className="my-4 max-w-[550px] m-auto">tools</p>,<b>length</b>,{" "}
            <b>extension</b>, <b>application</b>, <b>distance</b>, and{" "}
            <b>duration</b>. Its complement is <Link href="/r/bu">/bu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the fingers extended, in one direction, as though
            to trace a path.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>pe</b> is a numeral, meaning "seven". It is
            identical to the conventional sign for "seven" in Chinese one-handed
            finger counting.
          </p>
        </>
      );
    case "pu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/pu/</b> stands for <b>difference</b>,{" "}
            <b>differentiation</b>, <b>negativity</b>, <b>crossing</b>,{" "}
            <b>opposition</b>, <b>transcendence</b>, <b>distance</b>, and{" "}
            <b>space</b>. Its complement is <Link href="/r/sa">/sa/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows two fingers extended with a gap between them, as
            though to show the difference between them, or to show a space where
            something might cross through.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>po</b> means "not, other".
          </p>
        </>
      );
    case "sa":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/sa/</b> stands for <b>sameness</b>,{" "}
            <b>positivity</b>, <b>equality</b>, <b>reflection</b>, <b>copy</b>,
            and <b>similarity</b>. Its complement is{" "}
            <Link href="/r/pu">/pu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows two fingers extended, touching, as though to show
            the sameness between them.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>sa</b> means "the same as".
          </p>
        </>
      );
    case "si":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/si/</b> stands for <b>liquid</b>, <b>flowing</b>,{" "}
            <b>quenching</b>, <b>soothing</b>, <b>healing</b>, <b>satiation</b>,
            and <b>filling</b>. Its complement is <Link href="/r/ku">/ku/</Link>
            .
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows three fingers extended, suggesting the flow of
            water from a fountain, or three droplets of water at the fingertips.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>se</b> is a numeral, meaning "three".
          </p>
        </>
      );
    case "su":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/su/</b> stands for <b>section</b>, <b>part</b>,{" "}
            <b>exclusion</b>, <b>specificity</b>, <b>particularity</b>,{" "}
            <b>particle</b>, <b>slicing</b>, <b>place</b>, <b>locality</b>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the fingers curled, as though to cut of a small
            section of something rom the rest.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>so</b> means "part".
          </p>
        </>
      );
    case "ta":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ta/</b> stands for <b>giving</b>, <b>resistance</b>,{" "}
            <b>pushing</b>, <b>pressure</b>, <b>throwing</b>, and{" "}
            <b>dispensation</b>, as well as shapes that <b>protrude</b>. Its
            complement is <Link href="/r/mu">/mu/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the fingers extended, as though to push something
            away, or to suggest a protruding shape.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>ta</b> "only", a word that excludes
            everything else, pushing it away from the sphere of consideration.
          </p>
        </>
      );
    case "ti":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/ti/</b> stands for <b>smallness</b>, <b>scarcity</b>
            , <b>fibers</b>, and <b>foliage</b>. Its complement is{" "}
            <Link href="/r/da">/da/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows the two fingers touching lightly, as though
            holding something thin and delicate, with the other fingers extended
            to emphasize the delicate nature of the thing being held, or perhaps
            to suggest the shape of long, thin hairs.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>te</b> means "less, little".
          </p>
        </>
      );
    case "tu":
      return (
        <>
          <p className="my-4 max-w-[550px] m-auto">
            The radical <b>/tu/</b> stands for <b>separation</b>,{" "}
            <b>splitting</b>, <b>cutting</b>, <b>duplication</b>,{" "}
            <b>repetition</b>, <b>pattern</b>, <b>furcation</b>. Its complement
            is <Link href="/r/na">/na/</Link>.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            The handsign shows two fingers extended, to suggest a form being
            split in two, or to show the pattern of something that is repeated.
          </p>
          <p className="my-4 max-w-[550px] m-auto">
            As a standalone word, <b>to</b> is a numeral, meaning "two".
          </p>
        </>
      );
    default:
      throw new Error(`Invalid radical ${radical}`);
  }
}
