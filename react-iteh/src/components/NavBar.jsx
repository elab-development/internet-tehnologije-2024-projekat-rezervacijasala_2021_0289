import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";


const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isAdmin = user?.tipKorisnik === "admin";

  return (
    <nav className="navbar-modern">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
        PronađiSalu.rs
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Sale</Link></li>
          <li><Link to="/contact" className="nav-link">Kontakt</Link></li>
          {user && !isAdmin && (
            <li><Link to="/my-reservations" className="nav-link">Moje rezervacije</Link></li>
          )}
          {user && isAdmin && (
            <>
              <li><Link to="/admin/dashboard" className="nav-link">Upravljanje</Link></li>
              <li><Link to="/admin/add-room" className="nav-link">Dodaj salu</Link></li>
              <li><Link to="/admin/rezervacije" className="nav-link">Rezervacije</Link></li>
            </>
          )}
        </ul>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">Zdravo, {user.ime}</span>
            <button className="btn-logout" onClick={handleLogout}>Odjavi se</button>
          </>
        ) : (
          <button className="btn-login" onClick={() => navigate("/login", { state: { mode: "login" } })}>
          Prijava
        </button>
        
        )}
      </div>
    </nav>
  );
};

export default NavBar;
