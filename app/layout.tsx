import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter , JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Container from "@/components/core/container";
import { ThemeProvider } from "next-themes";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-sans" });

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
  description: "one pace for u to find all the open source tools u require for ur next project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetBrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <Container className="h-screen">{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
