import { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: `DigiFly Task`,
  description: "DigiFly Task - By Mohamed Fahim (Front End Developer)",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
