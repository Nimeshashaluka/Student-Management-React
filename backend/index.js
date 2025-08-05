const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "*****",
  database: "student_management",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }
  console.log("MySQL Connected");
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).send({ error: err }); // use return
      }

      // Check if user exists
      if (result.length > 0) {
        console.log("data", result);
        return res.send({ message: "Login Success", user: result[0] }); // use return
      } else {
        return res.send({ message: "Invalid credentials" }); // use return
      }
    }
  );
});

//Students search
app.get("/students", (req, res) => {
  const query = "SELECT * FROM user WHERE user_type_id = 3";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
    console.log("Fetched students:", results); // Log the fetched students
  });
});

// Fetch sub-admins
app.get("/sub_admin", (req, res) => {
  const query = "SELECT * FROM user WHERE user_type_id = 2";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching sub-admins:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
    console.log("Fetched sub-admins:", results); // Log the fetched sub-admins
  });
});

// Update student
app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const { fname, lname, mobile, nic, email, gender_id, status_id } = req.body;

  const sql =
    "UPDATE user SET fname = ?, lname = ?,mobile = ?,nic = ?, email = ?, gender_id = ?, status_id = ? WHERE id = ?";
  const values = [
    fname,
    lname,
    mobile,
    nic,
    email,
    gender_id,
    status_id,
    studentId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ error: "Update failed" });
    }

    res.json({ message: "Student updated successfully" });
  });
});

// Update subadmin
app.put("/sub_admin/:id", (req, res) => {
  const subadminId = req.params.id;
  const { fname, lname, mobile, nic, email, gender_id, status_id } = req.body;

  const sql =
    "UPDATE user SET fname = ?, lname = ?, mobile = ?, nic = ?, email = ?, gender_id = ?, status_id = ? WHERE id = ?";
  const values = [
    fname,
    lname,
    mobile,
    nic,
    email,
    gender_id,
    status_id,
    subadminId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating subadmin:", err);
      return res.status(500).json({ error: "Subadmin update failed" });
    }

    res.json({ message: "Subadmin updated successfully" });
  });
});


// Create new student
app.post("/student_create", (req, res) => {
  const { fname, lname, mobile, nic, email, password, gender_id, status_id } =
    req.body;

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
  INSERT INTO user (fname, lname, email, mobile, nic, password, gender_id, status_id, user_type_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, 3)
`;

  const values = [
    fname,
    lname,
    mobile,
    nic,
    email,
    password,
    gender_id,
    status_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating student:", err);
      return res.status(500).json({ error: "Failed to create student" });
    }

    res.status(201).json({ message: "Student created successfully" });
  });
});


app.get("/student_profile/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM user WHERE id = ? AND user_type_id = 3";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send({ error: err });
    if (result.length === 0) return res.status(404).send({ message: "Student not found" });
    res.send(result[0]);
  });
});


// Start the server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
