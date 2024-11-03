import React from "react";
import { ChatData } from "../context/ChatContext";

export const Header = () => {
  const { chats } = ChatData();
  return (
    <div>
      <p className="text-lg mb-6">Hola! Como te puedo ayudar hoy?</p>
      {chats && chats.length === 0 && (
        <p className="text-lg mb-6">Crea un chat nuevo.</p>
      )}
    </div>
  );
};

// export default Header;