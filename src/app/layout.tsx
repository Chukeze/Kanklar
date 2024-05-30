import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider"
import { ErrorProvider } from '@/providers/error-provider'

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanklar",
  description: "All In Enterprise Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >      
            <ErrorProvider>
            {children}
            </ErrorProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}
