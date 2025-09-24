import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Ako je ruta /rezervacija/:id spremi URL, inače null
  const salaUrl = useMemo(() => {
    if (pathnames[0] === "rezervacija" && pathnames.length === 2) {
      const id = pathnames[1];
      return `http://127.0.0.1:8000/api/prostorije/${id}`;
    }
    return null;
  }, [location.pathname]);

  const { data: salaData } = useFetch(salaUrl);
  const salaTip = salaData?.tip ?? null;

  const formatText = (str, index) => {
    // Ako je poslednji segment i ruta je /rezervacija/:id → prikaži tip umesto ID
    if (pathnames[0] === "rezervacija" && index === 1 && salaTip) {
      return salaTip;
    }

    switch (str) {
      case "sale": return "Detalji sale";
      case "rezervacija": return "Rezervacija";
      case "my-reservations": return "Moje rezervacije";
      case "admin": return "Admin panel";
      case "dashboard": return "Kontrolna tabla";
      case "add-room": return "Dodaj salu";
      case "rezervacije": return "Sve rezervacije";
      case "contact": return "Kontakt";
      case "login": return "Prijava";
      default: return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");
    }
  };

  return (
    <nav className="breadcrumb-nav">
      <Link to="/" className="breadcrumb-link">Početna</Link>
      {pathnames.map((segment, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span className="breadcrumb-current" key={index}> / {formatText(segment, index)}</span>
        ) : (
          <Link to={routeTo} key={index} className="breadcrumb-link">
            {" / " + formatText(segment, index)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
