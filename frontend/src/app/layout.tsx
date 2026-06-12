import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillFlow | Decentralized Freelance Escrow",
  description: "Secure, transparent, and atomic freelance payments on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
