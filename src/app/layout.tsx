import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "a work-in-progress lexicon for a work-in-progress language",
  description: "a work in progress",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="en">
      <body className={` min-h-screen ${inter.className}`}>
        <Header />
        <main className="flex flex-col items-center p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
