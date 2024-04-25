import React, { useState } from "react";
import axios from "axios";

const AddNote = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { name, email, phone, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/notes/",
        formData
      );
      console.log(response.data); // Log the response for debugging
      history.push("/"); // Redirect to the home page after successful addition
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div>
      <h1>Add Note</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNote;
