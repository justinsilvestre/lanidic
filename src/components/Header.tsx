"use client";

import Link from "next/link";
import { classifiers, consonants } from "../app/roots/rootsStructure";
import { useParams } from "next/navigation";

export function Header() {
  const params = useParams();
  return (
    <header className="flex flex-col items-center p-4">
      <h2>classifiers</h2>
      <ul>
        <li className="inline-block p-2">
          <Link href={"/"}>∅</Link>
        </li>
        {classifiers.map((classifier) => (
          <li key={classifier} className="inline-block p-2">
            {params.prefix !== classifier ? (
              <Link href={"/p/" + classifier}>{classifier}-</Link>
            ) : (
              <span className="font-bold">{classifier}-</span>
            )}
          </li>
        ))}
      </ul>
      <h2>radicals</h2>
      <ul>
        {consonants.map((consonant) => (
          <li key={consonant} className="inline-block p-2">
            {params.radical !== consonant + "a" ? (
              <Link href={`/r/${consonant}a`}>/{consonant}a/</Link>
            ) : (
              <span className="font-bold">/{consonant}a/</span>
            )}
            <br />
            {params.radical !== consonant + "i" ? (
              <Link href={`/r/${consonant}i`}>/{consonant}i/</Link>
            ) : (
              <span className="font-bold">/{consonant}i/</span>
            )}
            <br />
            {params.radical !== consonant + "u" ? (
              <Link href={`/r/${consonant}u`}>/{consonant}u/</Link>
            ) : (
              <span className="font-bold">/{consonant}u/</span>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
}
