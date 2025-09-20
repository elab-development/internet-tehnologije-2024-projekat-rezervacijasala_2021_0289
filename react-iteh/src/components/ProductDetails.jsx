import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Dodajemo useNavigate
import "./ProductDetails.css";

// Dummy podaci (za sada)
const salas = [
  {
    id: 1,
    name: "Konferencijska sala Beograd",
    location: "Beograd, Srbija",
    capacity: 20,
    price: "50€/h",
    image: "https://viewfromthewing.com/wp-content/uploads/2016/07/meetings.jpg",
    description: "Savremena sala sa svim potrebnim sadržajima za vaše poslovne sastanke.",
  },
  {
    id: 2,
    name: "Sastanak Prostor Novi Sad",
    location: "Novi Sad, Srbija",
    capacity: 15,
    price: "40€/h",
    image: "https://www.mhalink.org/wp-content/uploads/2023/03/MHA-115-4by3-1440x960.jpg",
    description: "Odličan prostor za manje timske sastanke i prezentacije.",
  },
  {
    id: 3,
    name: "Premium Poslovna Sala",
    location: "Niš, Srbija",
    capacity: 30,
    price: "60€/h",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/1/TS/CE/NT/2413411/business-conference-hall-1000x1000.jpg",
    description: "Luksuzna poslovna sala sa modernom tehnologijom i prijatnim ambijentom.",
  },
];

const ProductDetails = () => {
  const { id } = useParams(); // Uzimamo ID iz URL-a
  const navigate = useNavigate(); // Omogućava navigaciju ka drugim stranicama

  const sala = salas.find((s) => s.id === parseInt(id)); // Pronalazimo salu po ID-u

  if (!sala) {
    return <h2>Prostorija nije pronađena!</h2>; // Ako ne postoji, prikazujemo poruku
  }

  return (
    <div className="product-details">
      <img src={sala.image} alt={sala.name} className="details-image" />
      <h2>{sala.name}</h2>
      <p>{sala.location}</p>
      <p>Kapacitet: {sala.capacity} osoba</p>
      <p className="price">{sala.price}</p>
      <p>{sala.description}</p>
      
      {/* Dugme koje vodi na formu za rezervaciju */}
      <Link to={`/rezervacija/${id}`}>
        <button className="reserve-button">Rezerviši</button>
      </Link>

      {/* Alternativa: ako ne želiš Link, možeš koristiti navigate */}
      {/* <button className="reserve-button" onClick={() => navigate(`/rezervacija/${id}`)}>Rezerviši</button> */}
    </div>
  );
};

export default ProductDetails;
