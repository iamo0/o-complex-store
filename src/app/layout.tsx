import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mystore",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-white`}
      >
        <header className="sticky top-0 shadow-stone-800 shadow-sm backdrop-blur-xl">
          <h1 className="text-center text-2xl font-bold p-5 text-shadow-xs text-shadow-stone-400"><Link href="/">My Store</Link></h1>
        </header>
        <main className="p-5 w-xs ml-auto mr-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
