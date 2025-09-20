import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [salas, setSalas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ grad: '', tip: '', minCena: '', maxCena: '', slobodanDatum: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const navigate = useNavigate();

  const fetchSalas = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.grad) queryParams.append("grad", filters.grad);
      if (filters.tip) queryParams.append("tip", filters.tip);
      if (filters.minCena) queryParams.append("minCena", filters.minCena);
      if (filters.maxCena) queryParams.append("maxCena", filters.maxCena);
      if (filters.slobodanDatum) queryParams.append("slobodanDatum", filters.slobodanDatum);

      queryParams.append("page", currentPage);
      queryParams.append("perPage", itemsPerPage);

      const url = `http://127.0.0.1:8000/api/prostorije?${queryParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Greška u odgovoru sa servera! Status: ${response.status}`);
      }

      const data = await response.json();
      setSalas(data);
    } catch (error) {
      console.error("Greška pri učitavanju podataka:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalas();
  }, [filters, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ grad: '', tip: '', minCena: '', maxCena: '', slobodanDatum: '' });
  };

  return (
    <div className="products-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Pronađi savršenu salu za svoj događaj</h1>
          <p>Pretraži dostupne sale širom Srbije za seminare, proslave i događaje</p>

          <div className="hero-filters">
            <input type="text" name="grad" placeholder="Grad" value={filters.grad} onChange={handleFilterChange} />
            <input type="text" name="tip" placeholder="Tip sale" value={filters.tip} onChange={handleFilterChange} />
            <input type="number" name="minCena" placeholder="Min cena (€)" value={filters.minCena} onChange={handleFilterChange} />
            <input type="number" name="maxCena" placeholder="Max cena (€)" value={filters.maxCena} onChange={handleFilterChange} />
            <input type="date" name="slobodanDatum" placeholder="Slobodan datum" value={filters.slobodanDatum} onChange={handleFilterChange} />
            <button className="search-button" onClick={fetchSalas}>Pretraži</button>
          </div>
        </div>
      </div>

      <h2 className="section-title">Sale za rezervaciju</h2>

      {loading ? (
        <p className="loading-text">Učitavanje sala...</p>
      ) : salas?.data?.length > 0 ? (
        <>
          <div className="products-grid">
            {salas.data.map((sala) => (
              <OneProduct
                key={sala.idProstorija}
                id={sala.idProstorija}
                name={sala.tip}
                location={`${sala.ulica}, ${sala.grad}`}
                capacity={sala.kapacitet}
                price={`${sala.cena_po_satu}€/h`}
                image={`${sala.slika}`}
                onDetailsClick={() => navigate(`/reservation/${sala.idProstorija}`)}
              />
            ))}
          </div>

          {salas.last_page > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                Prethodna
              </button>
              <span>Stranica {salas.current_page} od {salas.last_page}</span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, salas.last_page))} disabled={currentPage === salas.last_page}>
                Sledeća
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="no-results">Nema pronađenih sala za zadate filtere.</p>
      )}
    </div>
  );
};

export default Products;
