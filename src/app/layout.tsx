import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap"
});

const bebas = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://royal-deccan-athletics-fitness-club.vercel.app"),
  title: "Best Athletics & Fitness Academy in Kolhapur | Royal Deccan Athletics",
  description:
    "Royal Deccan Athletics & Fitness Club in Kolhapur offers premium athletics, kids fitness, police physical preparation, army preparation, sprint training and discipline-focused coaching for ages 6-18.",
  keywords: [
    "Best Athletics & Fitness Academy in Kolhapur",
    "Royal Deccan Athletics",
    "sports academy Kolhapur",
    "police physical training Kolhapur",
    "kids fitness Kolhapur",
    "athletics coaching Kolhapur"
  ],
  openGraph: {
    title: "Royal Deccan Athletics & Fitness Club",
    description:
      "Professional athletics and fitness training for children and teens aged 6-18 in Kolhapur.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logo.png.png",
        width: 1200,
        height: 630,
        alt: "Royal Deccan Athletics & Fitness Club"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`}>
      <body>{children}</body>
    </html>
  );
}
