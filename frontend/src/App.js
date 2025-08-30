// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Todo from "./Todo";
import "./index.css";

function App() {
  return (
    <Router>
      <div style={{ padding: 18 }}>
        <nav style={{ marginBottom: 12, textAlign: "center" }}>
          <Link to="/" style={{ color: "#cfe6ff", marginRight: 12, textDecoration:"none", fontWeight:700 }}>Todo</Link>
          <Link to="/signup" style={{ color: "#cfe6ff", marginRight: 12, textDecoration:"none" }}>Signup</Link>
          <Link to="/login" style={{ color: "#cfe6ff", textDecoration:"none" }}>Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
