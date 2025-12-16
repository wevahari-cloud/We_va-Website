import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico" });

export const metadata: Metadata = {
  title: "Rotaract Club of Western Valley | Club 214199",
  description: "Official website of Rotaract Club of Western Valley (RID 3206). Fellowship Through Service.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pacifico.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
