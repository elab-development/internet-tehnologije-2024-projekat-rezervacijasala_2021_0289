import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ReservationForm from "./components/ReservationForm";
import Contact from "./components/Contact";
import Login from "./components/Login";
import MyReservations from "./components/MyReservations";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddRoom from "./components/admin/AddRoom";
import AdminReservations from "./components/admin/AdminReservations";
import Breadcrumbs from "./components/Breadcrumbs";
import AdminPanelWrapper from "./components/admin/AdminPanelWrapper";

import "./App.css";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <Breadcrumbs location={location} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sale/:id" element={<ProductDetails />} />
        <Route path="/rezervacija/:id" element={<ReservationForm />} />
        <Route path="/my-reservations" element={<MyReservations />} />

        {/* Admin rute */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/*" element={<AdminPanelWrapper />} />

        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/rezervacije" element={<AdminReservations />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
