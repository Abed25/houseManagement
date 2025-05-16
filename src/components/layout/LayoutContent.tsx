"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LoadingScreen from "./LoadingScreen";
import styles from "./LayoutContent.module.css";

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
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.content}>
          <Header />
          <main className={styles.main}>
            <div className={styles.scrollContainer}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
} 