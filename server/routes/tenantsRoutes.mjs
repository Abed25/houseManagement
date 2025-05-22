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
export default router;
