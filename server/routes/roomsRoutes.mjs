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
  const { roomNuber, Floor, roomType, roomRent } = req.body;
  try {
    const [results] = await db.execute(
      "INSERT INTO rooms (roomNumber, Floor, roomType, roomRent) VALUES (?,?,?,?)",
      [roomNuber, Floor, roomType, roomRent]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
