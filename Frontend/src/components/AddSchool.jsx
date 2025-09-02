import React, { useState } from "react";
import "./AddSchool.css";

function AddSchool() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "+91",
    email_id: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.name === "contact") {
      let value = e.target.value;
      if (!value.startsWith("+91")) {
        value = "+91" + value.replace(/^\+91/, "");
      }
      setFormData({ ...formData, contact: value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    const res = await fetch("http://localhost:5000/schools", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      alert("School Added Successfully!");
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "+91",
        email_id: "",
        image: null,
      });
    } else {
      alert("Error adding school!");
    }
  };

  return (
    <div className="form-container">
      <h2>Add School</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="School Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
        <input type="email" name="email_id" placeholder="Email" value={formData.email_id} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Add School</button>
      </form>
    </div>
  );
}

export default AddSchool;
