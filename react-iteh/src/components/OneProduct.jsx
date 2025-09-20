import React from "react";
import { Link } from "react-router-dom";
import "./OneProduct.css";

const OneProduct = ({ id, name, location, capacity, price, image }) => {
  return (
    <div className="product-card">
      <img
        src={image.startsWith('http') ? image : `http://127.0.0.1:8000${image}`}
        alt={name}
        className="product-image"
      />
      <h2>{name}</h2>
      <p>{location}</p>
      <p>Kapacitet: {capacity} osoba</p>
      <p className="price">{price}</p>

      <div className="product-buttons single-button">
        <Link to={`/rezervacija/${id}`}>
          <button className="reserve-button">Rezerviši</button>
        </Link>
      </div>
    </div>
  );
};

export default OneProduct;
