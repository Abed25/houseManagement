import express from "express";
import db from "../config/database.mjs";

const router = express.Router();

router.get("/tenants", async (req, res) => {
  //   res.json({ message: "Tenants route" });
  try {
    const [rows] = await db.execute("SELECT * FROM tenants");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
});
router.post("/tenants", async (req, res) => {
  const {
    firstName,
    lastName,
    idNumber,
    familyType,
    phone,
    roomNumber,
    moveInDate,
    rentPaymentDate,
  } = req.body;
  try {
    // Check if the room is already occupied
    const [existing] = await db.execute(
      "SELECT * FROM tenants WHERE roomNumber = ?",
      [roomNumber]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Room is already occupied. Only one tenant can be registered per room." });
    }
    const [results] = await db.execute(
      "INSERT INTO tenants ( firstName, lastName, idNumber, familyType, phone, roomNumber, moveInDate, rentPaymentDate ) VALUES (?,?,?,?,?,?,?,?)",
      [
        firstName,
        lastName,
        idNumber,
        familyType,
        phone,
        roomNumber,
        moveInDate,
        rentPaymentDate,
      ]
    );
    res.status(201).json({ message: "New tenant added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Delete a tenant by idNumber
router.delete("/tenants/:idNumber", async (req, res) => {
  const { idNumber } = req.params;
  try {
    const [results] = await db.execute(
      "DELETE FROM tenants WHERE idNumber = ?",
      [idNumber]
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json({ message: "Tenant deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Update a tenant by idNumber
router.put("/tenants/:idNumber", async (req, res) => {
  const { idNumber } = req.params;
  const {
    firstName,
    lastName,
    familyType,
    phone,
    roomNumber,
    moveInDate,
    rentPaymentDate,
  } = req.body;
  try {
    const [results] = await db.execute(
      "UPDATE tenants SET firstName = ?, lastName = ?, familyType = ?, phone = ?, roomNumber = ?, moveInDate = ?, rentPaymentDate = ? WHERE idNumber = ?",
      [firstName, lastName, familyType, phone, roomNumber, moveInDate, rentPaymentDate, idNumber]
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.json({ message: "Tenant updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
