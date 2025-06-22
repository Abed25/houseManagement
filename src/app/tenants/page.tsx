"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const RegisterTenant = dynamic(() => import("./register/page"), { ssr: false });

interface Tenant {
  firstName: string;
  lastName: string;
  idNumber: string;
  familyType: string;
  phone: string;
  roomNumber: string;
  moveInDate: string;
  rentPaymentDate: string;
}

export default function TenantsDashboard() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const fetchTenants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/tenants");
      if (!response.ok) throw new Error("Failed to fetch tenants");
      const data = await response.json();
      setTenants(data);
    } catch (err) {
      setError("Failed to load tenants. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const filteredTenants = tenants.filter((tenant) => {
    const q = search.toLowerCase();
    return (
      tenant.firstName.toLowerCase().includes(q) ||
      tenant.lastName.toLowerCase().includes(q) ||
      String(tenant.idNumber).toLowerCase().includes(q) ||
      tenant.roomNumber.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (tenant: Tenant) => {
    if (!window.confirm(`Remove tenant ${tenant.firstName} ${tenant.lastName} from room ${tenant.roomNumber}?`)) return;
    setDeleteLoading(tenant.idNumber + tenant.roomNumber);
    setActionMsg(null);
    try {
      // You need to implement this endpoint in your backend
      const response = await fetch(`http://localhost:5000/api/tenants/${tenant.idNumber}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete tenant");
      setActionMsg("Tenant deleted successfully.");
      fetchTenants();
    } catch (err) {
      setActionMsg("Failed to delete tenant.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Modal overlay styles
  const modalStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };
  const modalContentStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 8,
    padding: 24,
    minWidth: 320,
    maxWidth: 480,
    boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tenants Dashboard</h1>
      <div className={styles.dashboardBar}>
        <input
          type="text"
          placeholder="Search by name, room, or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.actionButton} onClick={() => setShowRegister(true)}>
          Register Tenant
        </button>
        <button className={styles.actionButton} onClick={fetchTenants}>
          Refresh
        </button>
      </div>
      {actionMsg && <div style={{ color: actionMsg.includes("success") ? "green" : "red", marginBottom: 12 }}>{actionMsg}</div>}
      {isLoading && <div>Loading tenants...</div>}
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      {!isLoading && !error && (
        filteredTenants.length === 0 ? (
          <div>No tenants found. <button className={styles.submitButton} onClick={() => setShowRegister(true)}>Register a Tenant</button></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>First Name</th>
                  <th className={styles.th}>Last Name</th>
                  <th className={styles.th}>ID Number</th>
                  <th className={styles.th}>Family Type</th>
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>Room</th>
                  <th className={styles.th}>Move In</th>
                  <th className={styles.th}>Rent Payment</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant, idx) => (
                  <tr className={styles.tr} key={tenant.idNumber + tenant.roomNumber + idx}>
                    <td className={styles.td}>{tenant.firstName}</td>
                    <td className={styles.td}>{tenant.lastName}</td>
                    <td className={styles.td}>{tenant.idNumber}</td>
                    <td className={styles.td}>{tenant.familyType}</td>
                    <td className={styles.td}>{tenant.phone}</td>
                    <td className={styles.td}>{tenant.roomNumber}</td>
                    <td className={styles.td}>{tenant.moveInDate}</td>
                    <td className={styles.td}>{tenant.rentPaymentDate}</td>
                    <td className={styles.td}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(tenant)}
                        disabled={deleteLoading === tenant.idNumber + tenant.roomNumber}
                      >
                        {deleteLoading === tenant.idNumber + tenant.roomNumber ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
      {showRegister && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowRegister(false)}
              aria-label="Close"
            >
              ×
            </button>
            <RegisterTenant />
          </div>
        </div>
      )}
    </div>
  );
} 