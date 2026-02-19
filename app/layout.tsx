import {
  GeistPixelCircle,
  GeistPixelSquare,
  GeistPixelTriangle,
} from "geist/font/pixel";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import {
  Geist,
  Geist_Mono,
  Inter,
  Bricolage_Grotesque,
} from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bridge",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YAOS - Yet Another Open Source",
  description:
    "A handpicked collection of open-source UI libraries, portfolio templates, tools, and resources to accelerate your next project. All free. All open.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} ${GeistPixelCircle.variable} ${GeistPixelSquare.variable} ${GeistPixelTriangle.variable}  antialiased min-h-dvh flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
