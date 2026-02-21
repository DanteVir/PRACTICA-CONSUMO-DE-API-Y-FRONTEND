import { useState, useEffect, useRef } from "react";
import "../App.css";
import Chatbot from "./Chatbot";

export default function Principal() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      
      {}
      {menuAbierto && <div className="backdrop"></div>}

      {}
      <nav
        ref={menuRef}
        className={`navbar ${scrolled ? "navbar-scroll" : ""}`}
      >
        <div className="logo">
            <img src="https://avanzarsoluciones.com/wp-content/uploads/2024/12/logo-avanzar-color.svg" alt="" />
        </div>

        {/* HAMBURGUESA */}
        <button
          className={`menu-toggle ${menuAbierto ? "active" : ""}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`menu ${menuAbierto ? "activo" : ""}`}>
          <li><a href="https://avanzarsoluciones.com/" target="_blank" rel="noopener noreferrer">Home</a></li>
          <li><a href="https://avanzarsoluciones.com/" target="_blank" rel="noopener noreferrer">Nosotros</a></li>
          <li><a href="https://avanzarsoluciones.com/" target="_blank" rel="noopener noreferrer">Servicios</a></li>
          <li><a href="https://avanzarsoluciones.com/" target="_blank" rel="noopener noreferrer">Blog</a></li>
          <li><a href="https://avanzarsoluciones.com/" target="_blank" rel="noopener noreferrer">Testimonios</a></li>
          <li><a href="./Chatbot.jsx" target="_blank" rel="noopener noreferrer">ChatBot</a></li>
          <li className="mobile-btn">
            <button className="btn-servicio">
              Servicio al cliente
            </button>
          </li>
        </ul>

        <button className="btn-servicio desktop-btn">
          Servicio al cliente
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <Chatbot />
        <div className="overlay"></div>

        <button className="arrow left">❮</button>
        <button className="arrow right">❯</button>

        <div className="hero-content">
          <h1>
            ¿Sientes la presión de las <br />
            <strong>deudas</strong> y no sabes cómo <br />
            salir de ellas?
          </h1>

          <p>
            <strong>¡La Ley de Insolvencia</strong> es la respuesta a tus
            problemas!
          </p>
        </div>
      </section>
    </div>
  );
}
      
