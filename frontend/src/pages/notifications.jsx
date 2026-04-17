import React from "react";

const Notifications = () => {
  const data = [
    "Someone liked your post ❤️",
    "New comment 💬",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {data.map((n, i) => (
        <div
          key={i}
          className="bg-white p-3 rounded shadow mb-2"
        >
          {n}
        </div>
      ))}
    </div>
  );
};

export default Notifications;