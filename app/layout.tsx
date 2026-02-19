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
import Navbar from "@/components/core/navbar";
import Container from "@/components/core/container";

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
          <div className="min-h-screen w-full bg-white dark:bg-zinc-950 relative overflow-hidden">
            {/* Soft Blue Radial Background - Light Mode */}
            <div
              className="fixed inset-0 z-0 dark:hidden"
              style={{
                background: "#ffffff",
                backgroundImage: `
                  radial-gradient(circle at top center, rgba(59, 130, 246, 0.5), transparent 70%)
                `,
              }}
            />
            {/* Soft Blue Radial Background - Dark Mode */}
            <div
              className="fixed inset-0 z-0 dark:block hidden"
              style={{
                background: "#09090b",
                backgroundImage: `
                  radial-gradient(circle at top center, rgba(59, 130, 246, 0.4), transparent 70%)
                `,
              }}
            />
            
            {/* Fixed Navbar */}
            <Container className="fixed top-0 left-0 right-0 z-50 px-4 h-fit">
              <Navbar />
            </Container>
            
            {/* Content with top padding to account for fixed navbar */}
            <div className="relative z-10 pt-20">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
