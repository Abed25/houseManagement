"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import styles from "./Sidebar.module.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Users", href: "/users", icon: UsersIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.sidebarHeader}>
        <h2 className={styles.logo}>{!isCollapsed && "Dashboard"}</h2>
        <button
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className={styles.navigation}>
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={styles.navItem}>
            <item.icon className={styles.navIcon} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton}>
          <ArrowLeftOnRectangleIcon className={styles.navIcon} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
