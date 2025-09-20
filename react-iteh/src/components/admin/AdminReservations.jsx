import React, { useEffect, useState } from "react";
import "./AdminReservations.css";
import Modal from "../Model";

const AdminReservations = () => {
  const [rezervacije, setRezervacije] = useState([]);
  const [modalData, setModalData] = useState({ show: false, action: null, payload: null });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/admin/rezervacije")
      .then((res) => res.json())
      .then((data) => {
        const sortirane = data.sort((a, b) => new Date(b.datum) - new Date(a.datum));
        setRezervacije(sortirane);
      })
      .catch((err) => console.error("Greška pri dohvatanju rezervacija:", err));
  }, []);

  const otkaziRezervaciju = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/admin/rezervacije/${id}`, {
      method: "DELETE",
    });
    setRezervacije((prev) => prev.filter((r) => r.id !== id));
    setModalData({ show: false, action: null, payload: null });
  };

  const banujKorisnika = async (userId) => {
    await fetch(`http://127.0.0.1:8000/api/admin/banuj-korisnika/${userId}`, {
      method: "DELETE",
    });
    setRezervacije((prev) => prev.filter((r) => r.user_id !== userId));
    setModalData({ show: false, action: null, payload: null });
  };

  const handleAction = () => {
    if (modalData.action === "otkazi") {
      otkaziRezervaciju(modalData.payload);
    } else if (modalData.action === "banuj") {
      banujKorisnika(modalData.payload);
    }
  };

  return (
    <div className="admin-reservations-container">
      <h2>Sve rezervacije</h2>

      {rezervacije.length === 0 ? (
        <p>Nema rezervacija.</p>
      ) : (
        <div className="reservation-grid">
          {rezervacije.map((rez) => (
            <div key={rez.id} className="reservation-card">
              {rez.prostorija?.slika && (
                <img
                  src={
                    rez.prostorija.slika.startsWith("http")
                      ? rez.prostorija.slika
                      : `http://127.0.0.1:8000${rez.prostorija.slika}`
                  }
                  alt={rez.prostorija.tip}
                  className="reservation-image"
                />
              )}

              <p><strong>Datum:</strong> {rez.datum}</p>
              <p><strong>Korisnik:</strong> {rez.user?.ime} {rez.user?.prezime}</p>
              <p><strong>Sala:</strong> {rez.prostorija?.tip}</p>
              <p><strong>Grad:</strong> {rez.prostorija?.grad}</p>
              <p><strong>Napomena:</strong> {rez.napomena || "Nema"}</p>

              <div className="admin-buttons">
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setModalData({
                      show: true,
                      action: "otkazi",
                      payload: rez.id,
                      message: "Da li ste sigurni da želite da otkažete ovu rezervaciju?"
                    })
                  }
                >
                  Otkaži
                </button>
                <button
                  className="ban-btn"
                  onClick={() =>
                    setModalData({
                      show: true,
                      action: "banuj",
                      payload: rez.user_id,
                      message: "Da li ste sigurni da želite da banujete korisnika i izbrišete sve njegove rezervacije?"
                    })
                  }
                >
                  Banuj korisnika
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalData.show && (
        <Modal
          title="Potvrda akcije"
          message={modalData.message}
          onConfirm={handleAction}
          onCancel={() => setModalData({ show: false, action: null, payload: null })}
        />
      )}
    </div>
  );
};

export default AdminReservations;
