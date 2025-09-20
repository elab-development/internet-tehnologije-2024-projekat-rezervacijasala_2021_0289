import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRoom.css";

const AddRoom = ({ setSalas }) => {
  const [form, setForm] = useState({
    tip: "",
    ulica: "",
    grad: "",
    kapacitet: "",
    cena_po_satu: "",
    opis: "",
    slika: null,
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "slika") {
      setForm({ ...form, slika: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/prostorije", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Sala uspešno dodata!");

        // Dodajemo novu salu u listu sala
        setSalas((prev) => ({
          ...prev,
          data: [data.prostorija, ...prev.data],
        }));

        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Došlo je do greške.");
      }
    } catch (err) {
      console.error(err);
      setError("Server greška.");
    }
  };

  return (
    <div className="add-room-container">
      <h2>Dodaj novu salu</h2>
      {error && <p className="error-text">{error}</p>}
      <form
        className="add-room-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="tip"
          placeholder="Tip sale"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ulica"
          placeholder="Ulica"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grad"
          placeholder="Grad"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="kapacitet"
          placeholder="Kapacitet"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cena_po_satu"
          placeholder="Cena po satu (€)"
          onChange={handleChange}
          required
        />
        <textarea
          name="opis"
          placeholder="Opis"
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          name="slika"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit">Dodaj salu</button>
      </form>
    </div>
  );
};

export default AddRoom;
