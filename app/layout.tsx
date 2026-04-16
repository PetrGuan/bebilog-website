import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bebilog — Baby Tracking, Simplified",
  description:
    "Bebilog helps parents track feeding, sleep, diapers, growth, and more — all in one beautiful app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
