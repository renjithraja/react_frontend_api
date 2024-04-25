import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './note.css' // Import Link from React Router

const Note = () => {
  // State to store notes data
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch notes data from the API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let url = "http://127.0.0.1:8000/notes/all/";
        if (searchQuery) {
          url = `http://127.0.0.1:8000/notes/search/?query=${searchQuery}`;
        }
        const response = await axios.get(url);
        setNotes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [searchQuery]); // Fetch data whenever searchQuery changes

  // Function to handle deletion of a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/notes/${id}/delete/`);
      // Update notes state after deletion
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1>All Address List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Sort by name..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>Name:</strong> {note.name}
            <br />
            <strong>Email:</strong> {note.email}
            <br />
            <strong>Phone:</strong> {note.phone}
            <br />
            <strong>Address:</strong> {note.address}
            <br />
            <button onClick={() => deleteNote(note.id)}>Delete</button>
            <Link to={`/update/${note.id}`}>
              {/* Use Link to navigate to update page */}
              <button>Update</button>
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/add">
        <button>Add New Note</button>
      </Link>
    </div>
  );
};

export default Note;
