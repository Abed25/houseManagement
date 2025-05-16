'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function RegisterTenant() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    familyType: '',
    phone: '',
    roomNumber: '',
    moveInDate: '',
    rentAmount: '',
    depositAmount: '',
    rentDeadlineDate: '',
    rentPaymentDate: '',
    rentPaymentStatus: 'pending'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Register New Tenant</h1>
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
          <label htmlFor="rentAmount">Monthly Rent</label>
          <input
            type="number"
            id="rentAmount"
            name="rentAmount"
            value={formData.rentAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="depositAmount">Security Deposit</label>
          <input
            type="number"
            id="depositAmount"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rentDeadlineDate">Rent Deadline Date</label>
          <input
            type="date"
            id="rentDeadlineDate"
            name="rentDeadlineDate"
            value={formData.rentDeadlineDate}
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

        <div className={styles.formGroup}>
          <label htmlFor="rentPaymentStatus">Rent Payment Status</label>
          <select
            id="rentPaymentStatus"
            name="rentPaymentStatus"
            value={formData.rentPaymentStatus}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Register Tenant
        </button>
      </form>
    </div>
  );
} 