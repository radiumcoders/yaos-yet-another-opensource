import Container from "@/components/core/container";
import Navbar from "@/components/core/navbar";
import Providers from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Analytics } from "@vercel/analytics/next";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
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
  title: "YAOS - yet another open source",
  description:
    "one pace for u to find all the open source tools u require for ur next project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <NuqsAdapter>
          <Providers>
            <ThemeProvider attribute="class">
              <header className="w-full ">
                <Navbar />
                <Container>
                  <div className="h-8 border-b border-edge w-full text-primary/10 flex items-center justify-center">
                    <span>YAOS - yet another open source</span>
                  </div>
                </Container>
              </header>
              <Container className="flex-1">{children}</Container>
              <Toaster />
            </ThemeProvider>
          </Providers>
        </NuqsAdapter>
      </body>
      <Analytics />
    </html>
  );
}
