import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "./context/Web3Context";

export const metadata: Metadata = {
  title: "SheBuilds | Proof-of-Skill NFT Platform",
  description: "Proof-of-skill NFT platform for women builders in Web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
