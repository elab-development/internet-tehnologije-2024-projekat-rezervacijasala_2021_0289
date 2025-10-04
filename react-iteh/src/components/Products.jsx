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


  const [currency, setCurrency] = useState("EUR");
  const [rates, setRates] = useState({ EUR: 1 });
  const [rateError, setRateError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadRates = async () => {
      setRateError("");
      try {
        const r1 = await fetch("https://api.exchangerate.host/latest?base=EUR&symbols=EUR,RSD,USD,GBP");
        const d1 = await r1.json();
        if (!cancelled && d1 && d1.rates && Object.keys(d1.rates).length) {
          setRates({ EUR: 1, ...d1.rates }); 
          return;
        }
        throw new Error("exchangerate.host bez rates");
      } catch (_e1) {
        try {
          const r2 = await fetch("https://open.er-api.com/v6/latest/EUR");
          const d2 = await r2.json();
          if (!cancelled && d2 && (d2.result === "success" || d2.result === "Success") && d2.rates) {

            const pick = ((rs) => ({
              EUR: 1,
              RSD: rs.RSD,
              USD: rs.USD,
              GBP: rs.GBP,
            }))(d2.rates || {});
            setRates(pick);
            return;
          }
          throw new Error("open.er-api.com bez rates");
        } catch (_e2) {
          if (!cancelled) setRateError("Kurs nije učitan (prikaz u EUR).");
        }
      }
    };

    loadRates();
    return () => { cancelled = true; };
  }, []);

  const toCurrency = (eurValue) => {
    const num = Number(eurValue);
    if (Number.isNaN(num)) return `${eurValue} ${currency}/h`;
    const rate = rates?.[currency] ?? 1;
    const value = num * rate;
    const formatted =
      currency === "RSD"
        ? Math.round(value).toLocaleString("sr-RS")
        : value.toFixed(2);
    return `${formatted} ${currency}/h`;
  };

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
            <select
              className="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              title="Valuta prikaza"
            >
              <option value="EUR">EUR</option>
              <option value="RSD">RSD</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>

            {rateError && <small className="rate-error">{rateError}</small>}

            {}
            <button className="search-button" onClick={() => {}}>
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
               
                price={toCurrency(sala.cena_po_satu)}
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
