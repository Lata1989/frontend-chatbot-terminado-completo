import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../index.js";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);

  async function fetchResponse() {
    if (prompt === "") return alert("Escribe un mensaje");
    setNewRequestLoading(true);
    setPrompt(""); // Limpiar el campo del mensaje

    try {
      // Realizar solicitud al backend
      const { data } = await axios.post(
        `${server}/api/gemini`,  // Ruta que apunta a tu backend
        { message: prompt }, // Enviar el mensaje del usuario
        {
          headers: {
            token: localStorage.getItem("token"), // Si necesitas autenticación
          },
        }
      );

      // Guardar la respuesta del backend (respuesta de Gemini)
      const message = {
        question: prompt,
        answer: data.text,  // Usar el texto devuelto por tu backend
      };

      setMessages((prev) => [...prev, message]); // Actualizar los mensajes
      setNewRequestLoading(false);
    } catch (error) {
      alert("Algo salió mal");
      console.log(error);
      setNewRequestLoading(false);
    }
  }

  const [chats, setChats] = useState([]);

  const [selected, setSelected] = useState(null);

  async function fetchChats() {
    try {
      const { data } = await axios.get(`${server}/api/chat/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setChats(data);
      setSelected(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  const [createLod, setCreateLod] = useState(false);

  async function createChat() {
    setCreateLod(true);
    try {
      const { data } = await axios.post(
        `${server}/api/chat/new`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      fetchChats();
      setCreateLod(false);
    } catch (error) {
      toast.error("Algo salio mal");
      setCreateLod(false);
    }
  }

  const [loading, setLoading] = useState(false);

  async function fetchMessages() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/chat/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(`${server}/api/chat/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      fetchChats();
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Algo salio mal");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);
  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);

  /*
  async function fetchResponse() {
    if (prompt === "") return alert("Write prompt");
    setNewRequestLoading(true);
    setPrompt("");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB7AYQghVvpWb5bbilLDA1_DAe_PVi4U4M",
        method: "post",
        data: {
          contents: [{ parts: [{ text: prompt }] }],
        },
      });

      const message = {
        question: prompt,
        answer:
          response["data"]["candidates"][0]["content"]["parts"][0]["text"],
      };

      setMessages((prev) => [...prev, message]);
      setNewRequestLoading(false);

      const { data } = await axios.post(
        `${server}/api/chat/${selected}`,
        {
          question: prompt,
          answer:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      alert("Algo salio mal");
      console.log(error);
      setNewRequestLoading(false);
    }
  }
  */

  /*
  const basePrompt = `Eres un vendedor de autos tu nombre es Harry Wormwood. 
        Aquí hay una lista de autos disponibles en stock: ${carsList}. 
        El cliente pregunta: "${userMessage}". ¿Qué le recomendarías?
        Recuerda en todo momento que no tienes que salirte del papel de Harry Wormwood el vendedor de autos.
        No respondas nunca una pregunta si no tiene que ver con autos.
        No hagas respuestas tan largas dando todo el stock a la primera pregunta.
        Trata de no dar tantas vueltas con las respuestas. No ser muy directo pero tampoco que te tengas que preguntar dos o tres veces sobre lo mismo.`;

  async function fetchResponse() {
    if (prompt === "") return alert("Write prompt");
    setNewRequestLoading(true);
    setPrompt("");
    try {
      // Combina el prompt base con el prompt del usuario
      const combinedPrompt = `${basePrompt} ${prompt}`;

      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB7AYQghVvpWb5bbilLDA1_DAe_PVi4U4M",
        method: "post",
        data: {
          contents: [{ parts: [{ text: combinedPrompt }] }],
        },
      });

      const message = {
        question: prompt,
        answer:
          response["data"]["candidates"][0]["content"]["parts"][0]["text"],
      };

      setMessages((prev) => [...prev, message]);
      setNewRequestLoading(false);

      const { data } = await axios.post(
        `${server}/api/chat/${selected}`,
        {
          question: prompt,
          answer:
            response["data"]["candidates"][0]["content"]["parts"][0]["text"],
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      alert("Algo salio mal");
      console.log(error);
      setNewRequestLoading(false);
    }
  }
  */
