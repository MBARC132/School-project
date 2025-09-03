import React, { useEffect, useState } from "react";
import "./ShowSchools.css";
import axios from "axios";

function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/getschool`)
      .then((res) => setSchools(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Schools List</h2>
      <div className="school-grid">
        {schools.map((school) => (
          <div key={school.id} className="school-card">
            {school.image && (
              <img
                src={`${API_URL}${school.image}`}
                alt={school.name}
              />
            )}
            <div className="school-info">
              <div className="school-name">{school.name}</div>
              <div className="school-details">{school.address}</div>
              <div className="school-details">{school.city}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowSchools;
