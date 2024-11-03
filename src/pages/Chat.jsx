import { useState } from 'react';
import './Chat.css';

export const Chat = () => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    '¿Qué autos tenés disponibles?',
    '¿Cuál es el auto más antiguo que tenés disponible?',
    '¿Qué color de auto es el más común?',
    '¿De qué marca tenés más autos?'
  ];

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Lo que podía malir sal, malió sal. Hacé una pregunta.");
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response = await fetch('http://localhost:5000/api/gemini', options);
      const data = await response.json();

      if (data.success) {
        // Actualiza el historial con el usuario ("Vos") y la IA ("Harry Wormwood")
        setChatHistory(oldChatHistory => [
          ...oldChatHistory,
          {
            role: 'user', // Este es el rol del usuario
            content: value // Pregunta del usuario
          },
          {
            role: 'model', // Cambia 'assistant' a 'model'
            content: data.text // Respuesta de la IA
          }
        ]);
      } else {
        setError("Error al obtener respuesta del modelo.");
      }

      setValue("");
    } catch (error) {
      console.log(error);
      setError("Se rompió algo, intenta de nuevo más tarde.");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <>
      <div className='app'>
        {/* <section className='app search-section'> */}
        {/* <section className='app'> */}
        <p>Bienvenido a Harry Wormwood Autos
          {/* <button className='surprise' onClick={surprise}>
              Sorpréndeme
            </button> */}
        </p>
        <div className='input-container'>
          <input
            value={value}
            placeholder='¿Qué autos tenés disponibles?'
            onChange={(e) => setValue(e.target.value)}
          />
          {!error && <button onClick={getResponse}>Enviar</button>}
          {error && <button onClick={clear}>Limpiar</button>}
        </div>
        {error && <p>{error}</p>}
        <div className='search-result'>
          {chatHistory.map((chatItem, _index) => (
            <div key={_index}>
              <p className='answer'><strong>{chatItem.role === 'user' ? 'Vos' : 'Harry Wormwood'}</strong>: {chatItem.content}</p>
            </div>
          ))}
        </div>
        {/* </section> */}
      </div>
    </>
  );
};