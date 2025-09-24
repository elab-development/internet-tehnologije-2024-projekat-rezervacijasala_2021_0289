import React, { useEffect, useMemo, useState } from "react";
import OneProduct from "./OneProduct";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Products.css";

const Products = () => {
  const [filters, setFilters] = useState({ grad: "", tip: "", minCena: "", maxCena: "", slobodanDatum: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  
  const url = useMemo(() => {
    const qp = new URLSearchParams();
    if (filters.grad) qp.append("grad", filters.grad);
    if (filters.tip) qp.append("tip", filters.tip);
    if (filters.minCena) qp.append("minCena", filters.minCena);
    if (filters.maxCena) qp.append("maxCena", filters.maxCena);
    if (filters.slobodanDatum) qp.append("slobodanDatum", filters.slobodanDatum);
    qp.append("page", currentPage);
    qp.append("perPage", itemsPerPage);
    return `http://127.0.0.1:8000/api/prostorije?${qp.toString()}`;
  }, [filters, currentPage]);

  const { data: salas, loading, error } = useFetch(url);

  // Resetuj na prvu stranicu kad se promene filteri
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ grad: "", tip: "", minCena: "", maxCena: "", slobodanDatum: "" });
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
            <input type="date" name="slobodanDatum" value={filters.slobodanDatum} onChange={handleFilterChange} />
            {}
            <button className="search-button" onClick={() => {  }}>
              Pretraži
            </button>
            <button className="search-button" onClick={resetFilters}>Reset</button>
          </div>
        </div>
      </div>

      <h2 className="section-title">Sale za rezervaciju</h2>

      {loading && <p className="loading-text">Učitavanje sala...</p>}
      {error && <p className="error-text">Greška: {error}</p>}

      {!loading && !error && (salas?.data?.length > 0 ? (
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
                onDetailsClick={() => navigate(`/rezervacija/${sala.idProstorija}`)}
              />
            ))}
          </div>

          {salas.last_page > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                Prethodna
              </button>
              <span>Stranica {salas.current_page} od {salas.last_page}</span>
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, salas.last_page))} disabled={currentPage === salas.last_page}>
                Sledeća
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="no-results">Nema pronađenih sala za zadate filtere.</p>
      ))}
    </div>
  );
};

export default Products;
