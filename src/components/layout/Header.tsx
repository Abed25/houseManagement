"use client";

import { useTheme } from "@/context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import styles from "./Header.module.css";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Uzuri Investments Ltd</h1>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <MoonIcon className={styles.themeIcon} />
          ) : (
            <SunIcon className={styles.themeIcon} />
          )}
        </button>
      </div>
    </header>
  );
}
