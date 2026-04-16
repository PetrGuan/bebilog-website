import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bebilog — Baby Tracking, Simplified",
  description:
    "Track feeding, sleep, growth, vaccines, and more — all in one beautifully designed app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
