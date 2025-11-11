import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSSS Komik",
  description: "SSSS Komik - Platform komik digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-base-dark transition-all duration-300 min-h-[100dvh] flex flex-col mb-83 lg:mb-0">
        {children}
      </body>
    </html>
  );
}
