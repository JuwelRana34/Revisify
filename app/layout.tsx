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
  title: "Revisifybd — Smart Study Revision Tracker",
  description: "Revisifybd helps students efficiently track, organize, and optimize their study revisions, ensuring faster learning and better exam performance.",
   icons: {
    icon: "/notebook.png",       
    shortcut: "/notebook.png", 
    apple: "/notebook.png",
  },
  keywords: [
    "Revisifybd", 
    "study tracker", 
    "revision app", 
    "exam preparation", 
    "learning management",
    "student productivity"
  ],
  authors: [{ name: "Revisifybd Team", url: "https://revisifybd.netlify.app" }],
  openGraph: {
    title: "Revisifybd — Smart Study Revision Tracker",
    description: "Track, organize, and optimize your study revisions with Revisifybd for smarter and faster learning.",
    url: "https://revisifybd.netlify.app",
    siteName: "Revisifybd",
    type: "website",
    images: [
      {
        url: "https://revisify.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Revisifybd - Study Revision Tracker",
      },
    ],
  },
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
