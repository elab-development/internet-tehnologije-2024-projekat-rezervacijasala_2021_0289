import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReservationForm.css";

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sala, setSala] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ date: "", time: "", note: "" });
  const [errors, setErrors] = useState({});
  const [zauzetiDatumi, setZauzetiDatumi] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Učitaj salu
    fetch(`http://127.0.0.1:8000/api/prostorije/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Prostorija nije pronađena") {
          setSala(null);
        } else {
          setSala(data);
        }
      })
      .catch((err) => {
        console.error("Greška prilikom učitavanja prostorije:", err);
        setSala(null);
      });

    // Učitaj zauzete datume
    fetch(`http://127.0.0.1:8000/api/prostorije/${id}/zauzeti-datumi`)
      .then((res) => res.json())
      .then((data) => setZauzetiDatumi(data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    const today = new Date().toISOString().split("T")[0];

    if (name === "date") {
      if (value < today) {
        newErrors.date = "Datum ne može biti u prošlosti.";
      } else if (zauzetiDatumi.includes(value)) {
        newErrors.date = "Ovaj datum je već zauzet.";
      } else {
        delete newErrors.date;
      }
    }

    if (name === "time") {
      const [hours] = value.split(":").map(Number);
      if (hours < 8 || hours > 20) {
        newErrors.time = "Vreme mora biti između 08:00 i 20:00.";
      } else {
        delete newErrors.time;
      }
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return formData.date && formData.time && Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Molimo popunite ispravno sva polja.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/rezervacije", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          datum: formData.date,
          napomena: formData.note,
          prostorija_id: parseInt(id),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Uspešno ste rezervisali salu!");
        navigate("/");
      } else {
        setErrors({ submit: data.message || "Greška pri rezervaciji." });
      }
    } catch (error) {
      console.error("Greška:", error);
      setErrors({ submit: "Greška na serveru." });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in">
        <h2>Niste prijavljeni!</h2>
        <p>Morate biti prijavljeni da biste izvršili rezervaciju.</p>
        <button className="login-redirect-btn" onClick={() => navigate("/login")}>Prijavi se</button>
      </div>
    );
  }

  if (loading) return <p>Učitavanje...</p>;

  if (!sala) {
    return <h2 className="error-message">Prostorija nije pronađena</h2>;
  }

  return (
    <div className="reservation-container">
      <div className="reservation-card">
        <h2>Rezervacija - {sala.tip}</h2>
        <p><strong>Lokacija:</strong> {sala.grad}, {sala.ulica}</p>
        <p><strong>Kapacitet:</strong> {sala.kapacitet} osoba</p>
        <p><strong>Cena:</strong> {sala.cena_po_satu} €</p>
        { sala.opis && (
  <p><strong>Opis:</strong> {sala.opis}</p>
)}


        <form onSubmit={handleSubmit} className="reservation-form">
          <label>Datum rezervacije:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          {errors.date && <p className="error-text">{errors.date}</p>}

          <label>Vreme:</label>
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          {errors.time && <p className="error-text">{errors.time}</p>}

          <label>Napomena (opciono):</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />

          {errors.submit && <p className="error-text">{errors.submit}</p>}

          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={!isFormValid()}>Potvrdi rezervaciju</button>
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Nazad</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
