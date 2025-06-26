"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import styles from "../page.module.css";

const RegisterTenant = dynamic(() => import("../register/page"), { ssr: false });

interface Tenant {
  firstName: string;
  lastName: string;
  idNumber: string | number;
  familyType: string;
  phone: string;
  roomNumber: string;
  moveInDate: string;
  rentPaymentDate: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function TenantDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const fullName = decodeURIComponent(params.fullName as string);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);
  const [editTenant, setEditTenant] = useState<Tenant | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchTenants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/tenants`);
        if (!response.ok) throw new Error("Failed to fetch tenants");
        const data = await response.json();
        // Filter by full name (case-insensitive)
        const matches = data.filter((t: Tenant) => `${t.firstName} ${t.lastName}`.toLowerCase() === fullName.toLowerCase());
        setTenants(matches);
      } catch (err) {
        setError("Failed to load tenant details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTenants();
  }, [fullName]);

  const handleDelete = async (tenant: Tenant) => {
    if (!window.confirm(`Remove tenant ${tenant.firstName} ${tenant.lastName} from room ${tenant.roomNumber}?`)) return;
    setDeleteLoading(String(tenant.idNumber) + tenant.roomNumber);
    setActionMsg(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tenants/${tenant.idNumber}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete tenant");
      setActionMsg("Tenant deleted successfully.");
      setTimeout(() => router.push("/tenants"), 1200);
    } catch (err) {
      setActionMsg("Failed to delete tenant.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => router.push('/tenants')}
        aria-label="Back to tenants"
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          background: 'none',
          border: 'none',
          fontSize: 28,
          color: '#222',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        ←
      </button>
      <h1 className={styles.title}>Tenant Details</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {actionMsg && <div style={{ color: actionMsg.includes("success") ? "green" : "red", marginBottom: 16 }}>{actionMsg}</div>}
      {!isLoading && !error && tenants.length === 0 && (
        <div>No tenant found with the name <b>{fullName}</b>.</div>
      )}
      {!isLoading && !error && tenants.length > 0 && (
        tenants.map((tenant, idx) => (
          <div key={tenant.idNumber + tenant.roomNumber + idx} style={{
            background: 'var(--background, #fff)',
            borderRadius: 8,
            boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
            padding: 24,
            marginBottom: 24,
            maxWidth: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><b>First Name:</b> {tenant.firstName}</div>
              <div><b>Last Name:</b> {tenant.lastName}</div>
              <div><b>ID Number:</b> {tenant.idNumber}</div>
              <div><b>Family Type:</b> {tenant.familyType}</div>
              <div><b>Phone:</b> {tenant.phone}</div>
              <div><b>Room Number:</b> {tenant.roomNumber}</div>
              <div><b>Move In Date:</b> {tenant.moveInDate}</div>
              <div><b>Rent Payment Date:</b> {tenant.rentPaymentDate}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <button
                className={styles.actionButton}
                style={{ background: '#e3342f' }}
                onClick={() => handleDelete(tenant)}
                disabled={deleteLoading === String(tenant.idNumber) + tenant.roomNumber}
              >
                {deleteLoading === String(tenant.idNumber) + tenant.roomNumber ? "Deleting..." : "Delete"}
              </button>
              <button
                className={styles.actionButton}
                onClick={() => setEditTenant(tenant)}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
      {editTenant && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setEditTenant(null)}
              aria-label="Close"
            >
              ×
            </button>
            <RegisterTenant initialData={editTenant} />
          </div>
        </div>
      )}
    </div>
  );
} 