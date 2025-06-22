"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface RegisterTenantProps {
  initialData?: {
    firstName: string;
    lastName: string;
    idNumber: string | number;
    familyType: string;
    phone: string;
    roomNumber: string;
    moveInDate: string;
    rentPaymentDate: string;
  };
}

export default function RegisterTenant({ initialData }: RegisterTenantProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    idNumber: initialData?.idNumber || "",
    familyType: initialData?.familyType || "",
    phone: initialData?.phone || "",
    roomNumber: initialData?.roomNumber || "",
    moveInDate: initialData?.moveInDate || "",
    rentPaymentDate: initialData?.rentPaymentDate || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        idNumber: initialData.idNumber || "",
        familyType: initialData.familyType || "",
        phone: initialData.phone || "",
        roomNumber: initialData.roomNumber || "",
        moveInDate: initialData.moveInDate || "",
        rentPaymentDate: initialData.rentPaymentDate || "",
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    try {
      let response;
      if (initialData) {
        // Editing: send PUT to update
        response = await fetch(`http://localhost:5000/api/tenants/${initialData.idNumber}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Creating: send POST
        response = await fetch("http://localhost:5000/api/tenants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || (initialData ? "Failed to update tenant." : "Failed to register tenant."));
      } else {
        setSuccess(initialData ? "Tenant updated successfully!" : "Tenant registered successfully!");
        if (!initialData) {
          setFormData({
            firstName: "",
            lastName: "",
            idNumber: "",
            familyType: "",
            phone: "",
            roomNumber: "",
            moveInDate: "",
            rentPaymentDate: "",
          });
        }
      }
    } catch (err) {
      setError(initialData ? "Failed to update tenant. Please try again." : "Failed to register tenant. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Register New Tenant</h1>
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{success}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="idNumber">ID Number</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="familyType">Family Type</label>
          <select
            id="familyType"
            name="familyType"
            value={formData.familyType}
            onChange={handleChange}
            required
          >
            <option value="">Select Family Type</option>
            <option value="single">Single</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="roomNumber">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="moveInDate">Move-in Date</label>
          <input
            type="date"
            id="moveInDate"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rentPaymentDate">Rent Payment Date</label>
          <input
            type="date"
            id="rentPaymentDate"
            name="rentPaymentDate"
            value={formData.rentPaymentDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? (initialData ? 'Updating...' : 'Registering...') : (initialData ? 'Update Tenant' : 'Register Tenant')}
        </button>
      </form>
    </div>
  );
}
