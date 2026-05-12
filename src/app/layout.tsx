import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TSAT Calculator",
  description: "Calculate transferrin saturation from serum iron and TIBC.",
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
