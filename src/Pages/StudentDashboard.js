// src/pages/StudentProfile.js
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/StudentProfile.css";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  // Dummy student data

  // const student = {
  //   fname: "Janith",
  //   lname: "Perera",
  //   email: "janith@example.com",
  //   mobile: "0771234567",
  //   nic: "200012345678",
  //   gender: "Male",
  //   status_id: 1,
  // };

  const studentId = localStorage.getItem("userId");
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🧹 Clear user session
    localStorage.clear();

    // 🔁 Redirect to login
    navigate("/");
  };

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:3001/student_profile/${studentId}`)
        .then((res) => {
          setStudent(res.data); // 🎯 real data
        })
        .catch((err) => {
          console.error("Failed to fetch student data:", err);
        });
    }
  }, [studentId]);

  if (!student) {
    return <div>Loading profile...</div>; // Until data load
  }

  return (
    <div className="profile-container">
      <h2>🎓 Student Profile</h2>
      <div className="profile-card">
        <div className="profile-image"></div>
        <p>
          <strong>Full Name:</strong> {student.fname} {student.lname}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Mobile:</strong> {student.mobile}
        </p>
        <p>
          <strong>NIC:</strong> {student.nic}
        </p>
        <p>
          <strong>Gender:</strong> {student.gender_id === 1 ? "Male" : "Female"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {student.status_id === 1 ? "Active" : "Inactive"}
        </p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
