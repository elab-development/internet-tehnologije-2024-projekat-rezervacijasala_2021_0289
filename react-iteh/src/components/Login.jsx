import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    password: "",
    password_confirmation: "",
    brTelefona: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsRegistering(location.state?.mode !== "login");
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isRegistering
      ? "http://127.0.0.1:8000/api/register"
      : "http://127.0.0.1:8000/api/login";

    const payload = isRegistering
      ? {
          ime: formData.ime,
          prezime: formData.prezime,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          brTelefona: formData.brTelefona,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          alert("Uspešno ste registrovani, sada se možete prijaviti!");
          setIsRegistering(false);
        } else {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
          window.location.reload();
        }
      } else {
        setError(data.errors ? Object.values(data.errors).join(", ") : "Došlo je do greške!");
      }
    } catch (error) {
      setError("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{isRegistering ? "Registracija" : "Prijava"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="input-group">
                <label htmlFor="ime">Ime:</label>
                <input type="text" id="ime" name="ime" value={formData.ime} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="prezime">Prezime:</label>
                <input type="text" id="prezime" name="prezime" value={formData.prezime} onChange={handleChange} required />
              </div>
            </>
          )}

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Lozinka:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {isRegistering && (
            <>
              <div className="input-group">
                <label htmlFor="password_confirmation">Potvrdi lozinku:</label>
                <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="brTelefona">Broj telefona:</label>
                <input type="text" id="brTelefona" name="brTelefona" value={formData.brTelefona} onChange={handleChange} />
              </div>
            </>
          )}

          <button type="submit">{isRegistering ? "Registruj se" : "Prijavi se"}</button>
        </form>

        <p
          className="toggle-form"
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline", marginTop: "10px" }}
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Već imate nalog? Prijavite se" : "Nemate nalog? Registrujte se"}
        </p>
      </div>
    </div>
  );
};

export default Login;
