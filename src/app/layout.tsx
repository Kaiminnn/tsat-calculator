import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medical Calculator",
  description:
    "Calculate transferrin saturation and estimated creatinine clearance.",
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
