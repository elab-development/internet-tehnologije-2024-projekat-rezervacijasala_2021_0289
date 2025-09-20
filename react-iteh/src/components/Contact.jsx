import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-hero">
        <h1>O nama</h1>
        <p>
          Mi smo tim mladih entuzijasta koji želi da ti olakša pronalazak idealnog
          prostora za tvoj događaj – bilo da organizuješ seminar, proslavu,
          sastanak ili trening. Naša platforma povezuje korisnike sa slobodnim
          salama u samo nekoliko klikova.
        </p>
      </div>

      <div className="contact-cards">
        <div className="contact-card">
          <h2>Kontaktiraj nas</h2>
          <p><strong>Email:</strong> kontakt@sale.rs</p>
          <p><strong>Telefon:</strong> +381 64 123 4567</p>
          <p><strong>Adresa:</strong> Bulevar kralja Aleksandra 73, Beograd</p>
          <p><strong>Radno vreme:</strong> Pon–Pet: 09–17h</p>
        </div>

        <div className="contact-card">
          <h2>Postani partner</h2>
          <p>
            Iznajmljuješ sale? Pridruži se mreži i omogući drugima da ih pronađu
            i rezervišu online. Kontaktiraj nas i postani deo naše zajednice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
