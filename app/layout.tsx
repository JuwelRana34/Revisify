import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import {Nunito_Sans } from "next/font/google";
import NavBar from "../components/NavBar";
import "./globals.css";

const Nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose weights you need
  variable: "--font-Nunito",           // CSS variable name
});

export const metadata: Metadata = {
  title: "Revisify",
  description: "its track your study revision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Nunito.variable} bg-green-600 antialiased`}
      >
        <NavBar />
        <div>
          {children}
          <Toaster richColors   position="bottom-center"/>
        </div>
      </body>
    </html>
  );
}
