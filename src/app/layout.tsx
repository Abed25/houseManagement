import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Dashboard",
  description: "A modern, customizable dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-full">
        <ThemeProvider>
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)]">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
