import app from "./app.mjs";
import connectDB from "./config/db.mjs";
import db from "./config/database.mjs";

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  if (connection) connection.release(); // Release the connection back to the pool
  console.log("Connected to MySQL database pool");
});

app.get("/", (req, res) => {
  res.send("Backend all is set");
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
