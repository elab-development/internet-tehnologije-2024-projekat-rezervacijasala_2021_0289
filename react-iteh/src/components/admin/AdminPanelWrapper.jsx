import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AddRoom from "./AddRoom";

const AdminPanelWrapper = () => {
  const [salas, setSalas] = useState(null);

  const fetchSalas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/prostorije?perPage=1000");
      const data = await res.json();
      setSalas(data);
    } catch (err) {
      console.error("Greška prilikom učitavanja sala:", err);
    }
  };

  useEffect(() => {
    fetchSalas();
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard salas={salas} setSalas={setSalas} />} />
      <Route path="/add-room" element={<AddRoom setSalas={setSalas} />} />
    </Routes>
  );
};

export default AdminPanelWrapper;
