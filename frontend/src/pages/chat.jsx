import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text) return;

    setMessages([...messages, { text, mine: true }]);
    setText("");
  };

  return (
    <div className="flex h-screen">

      {/* USERS */}
      <div className="w-72 bg-gray-100 p-3">
        <p className="font-bold mb-3">Chats</p>
        <div className="p-2 bg-white rounded shadow">User 1</div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 my-2 rounded max-w-xs ${
                m.mine
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-3 flex gap-2 border-t">
          <input
            className="flex-1 p-2 border rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={send}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;