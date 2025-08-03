const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nimesh%$#10",
  database: "student_management_test",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("MySQL Connected");
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: err }); // use return
      }
      console.log("data", res);
      if (result.length > 0) {
        return res.send({ message: "Login Success", user: result[0] }); // use return
      } else {
        return res.send({ message: "Invalid credentials" }); // use return
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
