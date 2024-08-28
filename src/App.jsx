import { useState } from "react";
import "./App.css";
import Home from "./components/HomePage/Home";
import Board from "./components/BoardPage/Board";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board/:boardName/:boardId" element={<Board />} />
    </Routes>
  );
}

export default App;
