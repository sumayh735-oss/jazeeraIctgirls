import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (n) => {
      setNotifications((prev) => [n, ...prev]);
    });
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>🔔</button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-3 animate-slideDown">
          {notifications.length === 0 && <p>No notifications</p>}
          {notifications.map((n, i) => (
            <p key={i} className="border-b py-2">{n.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}