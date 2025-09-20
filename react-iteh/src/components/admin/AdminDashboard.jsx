import React from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({ salas, setSalas }) => {
  if (!salas) return <p>Učitavanje sala...</p>;

  const obrisiSalu = async (id) => {
    const potvrda = window.confirm("Da li ste sigurni da želite da obrišete ovu salu?");
    if (!potvrda) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://127.0.0.1:8000/api/prostorije/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSalas((prev) => ({
          ...prev,
          data: prev.data.filter((sala) => sala.idProstorija !== id),
        }));
      } else {
        alert("Greška pri brisanju sale.");
      }
    } catch (err) {
      console.error("Greška:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Panel – Upravljanje salama</h2>

      <div className="sala-grid">
        {salas.data.map((sala) => (
          <div className="sala-card" key={sala.idProstorija}>
            <img
              src={
                sala.slika.startsWith("http")
                  ? sala.slika
                  : `http://127.0.0.1:8000${sala.slika}`
              }
              alt={sala.tip}
              className="sala-image"
            />
            <div className="sala-info">
              <h3>{sala.tip}</h3>
              <p>
                <strong>Lokacija:</strong> {sala.ulica}, {sala.grad}
              </p>
              <p>
                <strong>Kapacitet:</strong> {sala.kapacitet} osoba
              </p>
              <p>
                <strong>Cena po satu:</strong> {sala.cena_po_satu}€
              </p>
              <p>
                <strong>Opis:</strong> {sala.opis}
              </p>
              <button
                className="delete-btn"
                onClick={() => obrisiSalu(sala.idProstorija)}
              >
                 Obriši
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
