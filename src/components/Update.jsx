import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateNote = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  // State to store note data
  const [note, setNote] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // Fetch note data for the specified id
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/notes/${id}/`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]); // Fetch data whenever id changes

  // Function to handle changes in input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/notes/${id}/update/`, note);
      // Redirect or display a success message upon successful update
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div>
      <h1>Update Note</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={note.name} onChange={handleInputChange} />
        </label><br />
        <label>
          Email:
          <input type="email" name="email" value={note.email} onChange={handleInputChange} />
        </label><br />
        <label>
          Phone:
          <input type="text" name="phone" value={note.phone} onChange={handleInputChange} />
        </label><br />
        <label>
          Address:
          <textarea name="address" value={note.address} onChange={handleInputChange} />
        </label><br />
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default UpdateNote;
