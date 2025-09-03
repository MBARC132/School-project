import React from "react";
import { useForm } from "react-hook-form";
import "./AddSchool.css";
function AddSchool() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      contact: "+91",
      email_id: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();


    for (let key in data) {
      if (key === "image" && data.image.length > 0) {
        formData.append("image", data.image[0]); // file
      } else {
        formData.append(key, data[key]);
      }
    }

    const API_URL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/schools`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("School Added Successfully!");
      reset({
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
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input
          type="text"
          placeholder="School Name"
          {...register("name", { required: "School name is required" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}

        <input
          type="text"
          placeholder="City"
          {...register("city", { required: "City is required" })}
        />
        {errors.city && <p className="error">{errors.city.message}</p>}

        <input
          type="text"
          placeholder="State"
          {...register("state", { required: "State is required" })}
        />
        {errors.state && <p className="error">{errors.state.message}</p>}

        <input
          type="text"
          placeholder="Contact Number"
          {...register("contact", {
            required: "Contact is required",
            pattern: {
              value: /^\+91[0-9]{10}$/,
              message: "Must be a valid +91 number",
            },
          })}
        />
        {errors.contact && <p className="error">{errors.contact.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email_id", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email_id && <p className="error">{errors.email_id.message}</p>}

        <input type="file" accept="image/*" {...register("image")} />

        <button type="submit">Add School</button>
      </form>
    </div>
  );
}

export default AddSchool;
