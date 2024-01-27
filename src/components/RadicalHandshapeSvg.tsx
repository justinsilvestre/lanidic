/* eslint-disable react/no-unescaped-entities */
"use client";
import radicalsPaths from "@/app/svg/radicalsPaths.json";
import { Radical } from "@/app/roots/rootsStructure";

export function RadicalHandshapeSvg({
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
