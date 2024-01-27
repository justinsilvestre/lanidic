"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    const osMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    if (localStorage.theme === "dark") {
      document.body.classList.add("dark");
      setMode("dark");
      if (osMode === "dark") localStorage.removeItem("theme");
    } else {
      document.body.classList.remove("dark");
      setMode("light");
      if (osMode === "light") localStorage.removeItem("theme");
    }
  }, []);

  return (
    <footer className="max-w-screen-lg p-4 m-auto text-right">
      {mode === "light" ? (
        <button
          onClick={() => {
            setMode("dark");
            document.body.classList.add("dark");
            const osIsDark = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches;
            if (osIsDark) {
              localStorage.removeItem("theme");
            } else {
              localStorage.theme = "dark";
            }
          }}
        >
          ☾ dark
        </button>
      ) : (
        <button
          onClick={() => {
            setMode("light");
            document.body.classList.remove("dark");
            const osIsDark = window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches;
            if (osIsDark) {
              localStorage.theme = "light";
            } else {
              localStorage.removeItem("theme");
            }
          }}
        >
          ☼ light
        </button>
      )}
    </footer>
  );
}
