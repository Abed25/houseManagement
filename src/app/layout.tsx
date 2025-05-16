import { Inter } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/layout/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-full">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
