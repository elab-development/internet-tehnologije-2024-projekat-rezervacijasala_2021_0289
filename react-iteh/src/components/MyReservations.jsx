import React, { useEffect, useState } from "react";
import "./MyReservations.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/my-reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Greška prilikom učitavanja rezervacija:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = async (id) => {
    const confirmCancel = window.confirm("Da li ste sigurni da želite da otkažete ovu rezervaciju?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/rezervacije/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setReservations(reservations.filter((res) => res.id !== id));
        alert("Rezervacija uspešno otkazana!");
      } else {
        alert("Došlo je do greške pri otkazivanju rezervacije.");
      }
    } catch (error) {
      console.error("Greška pri otkazivanju rezervacije:", error);
      alert("Došlo je do greške pri komunikaciji sa serverom.");
    }
  };

  if (loading) return <p className="loading-text">Učitavanje rezervacija...</p>;

  return (
    <div className="reservations-container">
      <h2>Moje rezervacije</h2>
      {reservations.length === 0 ? (
        <p className="no-reservations">Nemate aktivnih rezervacija.</p>
      ) : (
        <div className="reservations-grid">
          {reservations.map((res) => {
            const reservationDate = new Date(res.datum);
            const today = new Date();
            const daysDifference = Math.ceil((reservationDate - today) / (1000 * 60 * 60 * 24));
            const prostorija = res.prostorija || {};

            return (
              <div key={res.id} className="reservation-card">
                <img
                  src={prostorija.slika || "https://via.placeholder.com/400x200"}
                  alt="Slika prostorije"
                  className="reservation-image"
                />
                <div className="reservation-content">
                  <h3>{prostorija.tip || "Nepoznata sala"}</h3>
                  <p><strong>Datum:</strong> {res.datum}</p>
                  <p><strong>Lokacija:</strong> {prostorija.grad}, {prostorija.ulica}</p>
                  <p><strong>Kapacitet:</strong> {prostorija.kapacitet} osoba</p>
                  <p><strong>Cena po satu:</strong> {prostorija.cena_po_satu} €</p>
                  <p><strong>Napomena:</strong> {res.napomena || "Bez dodatnih napomena"}</p>

                  <div className="reservation-footer">
                    {daysDifference > 7 ? (
                      <button className="cancel-btn" onClick={() => handleCancelReservation(res.id)}>
                        Otkaži rezervaciju
                      </button>
                    ) : (
                      <p className="cannot-cancel">Otkazivanje nije moguće (manje od 7 dana do termina).</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
