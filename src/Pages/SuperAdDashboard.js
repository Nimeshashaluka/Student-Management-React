// StudentDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Pages/SuperAdDash.css";

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [subAdmins, setSubAdmins] = useState([]);
  const [showModal3, setShowModal3] = useState(false);
  const [selectedSubadmin, setSelectedSubadmin] = useState(null);

  // Form data for creating/updating students
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    nic: "",
    gender_id: "",
    studentId: "",
  });

  const [formData2, setFormData2] = useState({
    fname: "",
    lname: "",
    mobile: "",
    nic: "",
    email: "",
    gender_id: "",
    studentId: "",
    password: "",
    status_id: "1",
  });
  // Form data for sub-admins
  const [formData3, setFormData3] = useState({
    fname: "",
    lname: "",
    mobile: "",
    nic: "",
    email: "",
    gender_id: "",
    studentId: "",
    password: "",
    status_id: "1",
  });

  // const subAdmins = ["Admin A", "Admin B", "Admin C"];

  useEffect(() => {
    fetchStudents();
    fetchSubadmins();
  }, []);

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };
  // Fetch sub-admins from the backend
  const fetchSubadmins = async () => {
    try {
      const res = await axios.get("http://localhost:3001/sub_admin");
      setSubAdmins(res.data);
    } catch (err) {
      console.error("Error fetching subadmins:", err);
    }
  };

  const total = students.length;
  const active = students.filter((s) => s.status_id === 1).length;
  const inactive = students.filter((s) => s.status_id !== 1).length;

  const total3 = subAdmins.length;
  const active3 = subAdmins.filter((s) => s.status_id === 1).length;
  const inactive3 = subAdmins.filter((s) => s.status_id !== 1).length;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };
  // Handle edit subadmin button click
  const handleInputChange3 = (e) => {
    const { name, value } = e.target;
    setFormData3({ ...formData3, [name]: value });
  };

  // Handle edit button click
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      fname: student.fname || "",
      lname: student.lname || "",
      email: student.email || "",
      mobile: student.mobile || "",
      nic: student.nic || "",
      gender_id: student.gender_id || "",
      status_id: student.status_id || "",
    });
    setShowModal(true);
  };
  // Handle create student button click
  const handleEdit3 = (subadmin) => {
    setSelectedSubadmin(subadmin);
    setFormData3({
      fname: subadmin.fname || "",
      lname: subadmin.lname || "",
      email: subadmin.email || "",
      mobile: subadmin.mobile || "",
      nic: subadmin.nic || "",
      gender_id: subadmin.gender_id || "",
      status_id: subadmin.status_id || "",
    });
    setShowModal3(true);
  };

  // Handle update student
  const handleSaveSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/students/${selectedStudent.id}`, formData)
      .then(() => {
        setShowModal(false);
        fetchStudents(); // Refresh table
      })
      .catch((err) => {
        console.error("Error updating student:", err);
      });
  };

  // Handle input changes for sub-admins
  const handleSaveSubmit3 = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/sub_admin/${selectedSubadmin.id}`, formData3)
      .then(() => {
        setShowModal3(false);
        fetchSubadmins(); // Refresh table
      })
      .catch((err) => {
        console.error("Error updating subadmin:", err);
      });
  };

  // Handle create student submission
  // const handleCreateSubmit = async (e) => {
  //   e.preventDefault();

  //   // Optional: Show form data in alert
  //   // alert("📋 Sending data to server:\n" + JSON.stringify(formData2, null, 2));

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/student_create",
  //       formData2
  //     );

  //     if (response.status === 201 || response.status === 200) {
  //       alert("✅ Student created successfully!");
  //       setFormData2({
  //         fname: "",
  //         lname: "",
  //         mobile: "",
  //         nic: "",
  //         email: "",
  //         gender_id: "",
  //         password: "",
  //         status_id: "1", // Optional if required
  //       });
  //       fetchStudents();

  //       //page reload
  //       window.location.reload();
  //     } else {
  //       alert("❌ Failed to create student.");
  //     }
  //   } catch (err) {
  //     console.error("Error creating student:", err);
  //     alert("❌ Error sending data to server.");
  //   }
  // };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const { fname, lname, mobile, nic, email, gender_id, password } = formData2;

    if (
      !fname ||
      !lname ||
      !mobile ||
      !nic ||
      !email ||
      !gender_id ||
      !password
    ) {
      alert("All fields are required.");
      return;
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Mobile number validation (should be 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    // NIC validation (old or new format)
    const nicRegex = /^(\d{9}[VvXx]|\d{12})$/;
    if (!nicRegex.test(nic)) {
      alert("Invalid NIC number.");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    // All validations passed, proceed with submission
    try {
      const response = await axios.post(
        "http://localhost:3001/student_create",
        formData2
      );

      if (response.status === 201 || response.status === 200) {
        alert("Student created successfully!");
        setFormData2({
          fname: "",
          lname: "",
          mobile: "",
          nic: "",
          email: "",
          gender_id: "",
          password: "",
          status_id: "1", // Optional if required
        });
        fetchStudents();
        window.location.reload(); // reload page
      } else {
        alert("Failed to create student.");
      }
    } catch (err) {
      console.error("Error creating student:", err);
      alert("Error sending data to server.");
    }
  };

  return (
    <div className="dashboard">
      <h1>SUPER ADMIN DASHBOARD</h1>

      <div className="container">
        {/* Create Student Form */}
        <div className="create-student">
          <h2>Create New Student</h2>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            // value={formData2.fname}
            onChange={handleInputChange2}
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            // value={formData2.lname}
            onChange={handleInputChange2}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            // value={formData2.mobile}
            onChange={handleInputChange2}
          />
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            // value={formData2.nic}
            onChange={handleInputChange2}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            // value={formData2.email}
            onChange={handleInputChange2}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            // value={formData2.password}
            onChange={handleInputChange2}
          />

          <select
            onChange={handleInputChange2}
            className="custom-select"
            name="gender_id"
            value={formData2.gender_id}
          >
            <option value="">Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
          {/* 
          <select onChange={handleInputChange} className="custom-select" name="status_id" value={formData2.status_id}>
            <option value="">Select Status</option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select> */}

          <button onClick={handleCreateSubmit}>Create</button>
        </div>

        {/* Student Table */}
        <div className="student-list">
          <h2>Student List</h2>
          <div
            style={{ overflowX: "auto", maxHeight: "350px", overflowY: "auto" }}
          >
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.fname + " " + student.lname}</td>
                    <td>{student.email}</td>
                    <td>{student.gender_id === 1 ? "Male" : "Female"}</td>
                    <td>{student.status_id === 1 ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div>Total Students: {total}</div>
            <div>Active Students: {active}</div>
            <div>Inactive Students: {inactive}</div>
          </div>

          {/* Edit Modal */}
          {showModal && (
            <div className="modal-backdrop">
              <div className="modal">
                <h2>Edit Student (ID: {selectedStudent.id})</h2>
                <form>
                  <label className="form-label">
                    First Name:
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </label>
                  <label className="form-label">
                    Last Name:
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </label>
                  <label className="form-label">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </label>
                  <label className="form-label">
                    Mobile:
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </label>
                  <label className="form-label">
                    NIC:
                    <input
                      type="text"
                      name="nic"
                      disabled={true}
                      value={formData.nic}
                      onChange={handleInputChange}
                      className="custom-input"
                    />
                  </label>

                  <label className="form-label">
                    Gender:
                    <select
                      name="gender_id"
                      value={formData.gender_id}
                      onChange={handleInputChange}
                      className="custom-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                  </label>

                  <label className="form-label">
                    Status:
                    <select
                      name="status_id"
                      value={formData.status_id}
                      onChange={handleInputChange}
                      className="custom-select"
                    >
                      <option value="">Select</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </label>

                  <form>
                    {/* input fields */}
                    <div className="modal-actions">
                      <button
                        type="submit"
                        className="save-btn"
                        onClick={handleSaveSubmit}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="close-btn"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sub Admin Section */}
      <div className="subadmin-list">
        <h2>Sub Admin List</h2>
        <div
          style={{ overflowX: "auto", maxHeight: "350px", overflowY: "auto" }}
        >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {subAdmins.map((subadmin) => (
                <tr key={subadmin.id}>
                  <td>{subadmin.id}</td>
                  <td>{subadmin.fname + " " + subadmin.lname}</td>
                  <td>{subadmin.email}</td>
                  <td>{subadmin.gender_id === 1 ? "Male" : "Female"}</td>
                  <td>{subadmin.status_id === 1 ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit3(subadmin)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stats">
          <div>Total SubAdmin: {total3}</div>
          <div>Active SubAdmin: {active3}</div>
          <div>Inactive SubAdmin: {inactive3}</div>
        </div>

        {/* Edit Modal */}
        {showModal3 && (
          <div className="modal-backdrop">
            <div className="modal">
              <h2>Edit Subadmin (ID: {selectedSubadmin.id})</h2>
              <form>
                <label className="form-label">
                  First Name:
                  <input
                    type="text"
                    name="fname"
                    value={formData3.fname}
                    onChange={handleInputChange3}
                    className="custom-input"
                  />
                </label>
                <label className="form-label">
                  Last Name:
                  <input
                    type="text"
                    name="lname"
                    value={formData3.lname}
                    onChange={handleInputChange3}
                    className="custom-input"
                  />
                </label>
                <label className="form-label">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData3.email}
                    onChange={handleInputChange3}
                    className="custom-input"
                  />
                </label>
                <label className="form-label">
                  Mobile:
                  <input
                    type="text"
                    name="mobile"
                    value={formData3.mobile}
                    onChange={handleInputChange3}
                    className="custom-input"
                  />
                </label>
                <label className="form-label">
                  NIC:
                  <input
                    type="text"
                    name="nic"
                    disabled={true}
                    value={formData3.nic}
                    onChange={handleInputChange3}
                    className="custom-input"
                  />
                </label>

                <label className="form-label">
                  Gender:
                  <select
                    name="gender_id"
                    value={formData3.gender_id}
                    onChange={handleInputChange3}
                    className="custom-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </label>

                <label className="form-label">
                  Status:
                  <select
                    name="status_id"
                    value={formData3.status_id}
                    onChange={handleInputChange3}
                    className="custom-select"
                  >
                    <option value="">Select</option>
                    <option value="1">Active</option>
                    <option value="2">Inactive</option>
                  </select>
                </label>

                <form>
                  {/* input fields */}
                  <div className="modal-actions">
                    <button
                      type="submit"
                      className="save-btn"
                      onClick={handleSaveSubmit3}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="close-btn"
                      onClick={() => setShowModal3(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
