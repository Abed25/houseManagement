"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LoadingScreen from "./LoadingScreen";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen />}
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
  );
} 