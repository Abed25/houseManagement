//import { router } from "express";
import express from "express";
import db from "../config/database.mjs";

const router = express.Router();
router.use(express.json());

router.get("/rooms", async (req, res) => {
  //res.send("Retrive all rooms");
  try {
    const [rows] = await db.execute("SELECT * FROM rooms");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
  }
});

//INSERT INTO `rooms` (`roomNumber`, `Floor`, `roomType`, `roomRent`) VALUES ('1A', 'ground', 'Single', '4000');
router.post("/rooms", async (req, res) => {
  const { roomNumber, Floor, roomType, roomRent, roomDeposit } = req.body;
  try {
    const values = [roomNumber, Floor, roomType, roomRent, roomDeposit].map(
      (v) => (v === undefined ? null : v)
    );
    const [results] = await db.execute(
      "INSERT INTO rooms (roomNumber, Floor, roomType, roomRent, roomDeposit) VALUES (?,?,?,?,?)",
      values
    );
    res.status(201).json({ message: "Room created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Update a room by roomNumber
router.put("/rooms/:roomNumber", async (req, res) => {
  const { roomNumber } = req.params;
  const { Floor, roomType, roomRent, roomDeposit } = req.body;
  try {
    const values = [Floor, roomType, roomRent, roomDeposit, roomNumber].map(
      (v) => (v === undefined ? null : v)
    );
    const [results] = await db.execute(
      "UPDATE rooms SET Floor = ?, roomType = ?, roomRent = ?, roomDeposit = ? WHERE roomNumber = ?",
      values
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Delete a room by roomNumber
router.delete("/rooms/:roomNumber", async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const [results] = await db.execute(
      "DELETE FROM rooms WHERE roomNumber = ?",
      [roomNumber]
    );
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
