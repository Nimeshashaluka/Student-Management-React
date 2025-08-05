// // server.js
// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");

// const app = express();
// const PORT = 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // DB Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Nimesh%$#10",
//   database: "student_management_test",
// });

// // DB Connect
// db.connect((err) => {
//   if (err) {
//     console.error("❌ DB Connection Error:", err);
//     return;
//   }
//   console.log("✅ MySQL Connected");
// });

// // Routes
// app.get("/students", (req, res) => {
//   const query = "SELECT * FROM user WHERE user_type_id = 3";
//   db.query(query, (err, results) => {
//     console.log("dataS", results);
//     if (err) {
//       console.error("❌ Error fetching students:", err);
//       return res.status(500).json({ error: "Database error" });
//     }else{
//         console.log("data2", results);
//     }
//     res.json(results);
    
//   });
// });

// // Server Start
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
