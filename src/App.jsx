import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Note from "./components/Note";
import Update from "./components/Update";
import AddNote from "./components/AddNote";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/add" element={<AddNote />} />
        <Route exact path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
