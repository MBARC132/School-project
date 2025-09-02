import React, { useEffect, useState } from "react";
import "./ShowSchools.css";
import axios from "axios";

function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getschool")
      .then((res) => {
        setSchools(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Schools List</h2>
      {schools.map((school) => (
        <div key={school.id} className="school-card">
          <div className="school-name">{school.name}</div>
          <div className="school-details">
            {school.address}, {school.city}, {school.state}
          </div>
          <div className="school-details">📞 {school.contact}</div>
          <div className="school-details">📧 {school.email_id}</div>

          {school.image && (
            <img
              src={`http://localhost:5000${school.image}`}
              alt={school.name}
              style={{
                width: "100px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ShowSchools;