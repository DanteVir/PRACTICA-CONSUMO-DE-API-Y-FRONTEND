import { useState } from "react";

export default function Chatbot() {
  const [mensaje, setMensaje] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    if (!mensaje) return;

    const nuevoChat = [...chat, { tipo: "user", texto: mensaje }];
    setChat(nuevoChat);
    setMensaje("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pregunta: mensaje }),
      });

      const data = await res.json();

      setChat([
        ...nuevoChat,
        { tipo: "bot", texto: data.respuesta },
      ]);
    } catch (error) {
      setChat([
        ...nuevoChat,
        { tipo: "bot", texto: "Error conectando con el servidor" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot">
      <div className="chat-header">Chat Avanzar IA</div>

      <div className="chat-body">
        {chat.map((m, i) => (
          <div key={i} className={`msg ${m.tipo}`}>
            {m.texto}
          </div>
        ))}

        {loading && <div className="msg bot">Escribiendo...</div>}
      </div>

      <div className="chat-input">
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe tu pregunta..."
        />
        <button onClick={enviar}>Enviar</button>
      </div>
    </div>
  );
}