// src/pages/Community.jsx

import { useEffect, useState } from "react";
import { socket } from "../socket";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [popupNotif, setPopupNotif] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();


useEffect(() => {
  if (user) {
    socket.emit("userOnline", user);

    socket.on("onlineUsers", (users) => {
      console.log("ONLINE USERS:", users);
    });

    socket.on("newNotification", (data) => {
      console.log("NOTIFICATION:", data);
    });
  }

  return () => {
    socket.off("onlineUsers");
    socket.off("newNotification");
  };
}, [user]);
  //////////////////////////////////////////////////
  // AUTH CHECK
  //////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Login first");
      navigate("/login");
    }
  }, []);

  //////////////////////////////////////////////////
  // FETCH POSTS
  //////////////////////////////////////////////////
  const fetchPosts = async () => {
    const res = await fetch(`${API}/community/posts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setPosts(data.posts || []);
  };

  //////////////////////////////////////////////////
  // CREATE POST
  //////////////////////////////////////////////////
  const handlePost = async (data) => {
    await fetch(`${API}/community/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    fetchPosts();

    // 🔔 REAL NOTIFICATION
    socket.emit("sendNotification", {
      message: `${user.fullName} created a post`,
    });
  };
  const handleReact = async (postId, type) => {
  await fetch(`${API}/community/posts/${postId}/react`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ type }),
  });
};

  //////////////////////////////////////////////////
  // LOAD NOTIFICATIONS
  //////////////////////////////////////////////////
  const loadNotifications = async () => {
    const res = await fetch(`${API}/community/notifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setNotifications(data || []);
  };

  //////////////////////////////////////////////////
  // SOCKET
  //////////////////////////////////////////////////
  useEffect(() => {
    fetchPosts();
    loadNotifications();

    socket.emit("userOnline", user);

    socket.on("onlineUsers", setOnlineUsers);

    socket.on("newNotification", (data) => {
      setPopupNotif(data);
      setNotifications((prev) => [data, ...prev]);

      setTimeout(() => setPopupNotif(null), 4000);
    });

    socket.on("newPost", fetchPosts);
    socket.on("newComment", (data) => {
      socket.emit("sendNotification", {
        message: `${data.user} commented on a post`,
      });
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("newNotification");
      socket.off("newPost");
      socket.off("newComment");
    };
  }, [user]);

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////
  return (
    <div className="bg-[#f0f2f5] min-h-screen">

      {/* 🔵 HEADER (BLOG STYLE) */}
      <div className="w-full bg-[#e7f0ff] border-b border-gray-200 py-10 mb-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Community
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Connect, share ideas and grow together 🚀
          </p>
        </div>
      </div>

      {/* 🔔 POPUP */}
      {popupNotif && (
        <div className="fixed top-20 right-5 bg-white shadow-md px-4 py-3 rounded-2xl z-50 border">
          🔔 {popupNotif.message}
        </div>
      )}

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">

        {/* LEFT SIDEBAR */}
        <div className="hidden lg:block space-y-4">

          {/* PROFILE */}
          <div className="bg-white p-5 rounded-2xl shadow-sm text-center sticky top-24">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto text-lg font-bold">
              {user?.fullName?.charAt(0)}
            </div>

            <p className="mt-3 font-semibold text-gray-800">
              {user?.fullName}
            </p>

            <p className="text-sm text-gray-500">
              {user?.role}
            </p>
          </div>

          {/* ONLINE USERS */}
          <div className="bg-white p-5 rounded-2xl shadow-sm sticky top-[180px]">
            <p className="font-semibold mb-3 text-gray-700">
              🔥 Online Users
            </p>

            {onlineUsers.length === 0 ? (
              <p className="text-sm text-gray-400">
                No users online
              </p>
            ) : (
             onlineUsers.filter(Boolean).map((u, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">
                    {u.fullName?.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">
                    {u.fullName}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* CENTER */}
        <div className="lg:col-span-2 space-y-6">
          <CreatePost onPost={handlePost} />

          {posts.map((post) => (
            <PostCard
  key={post.id}
  post={post}
  refresh={fetchPosts}
  onReact={handleReact}
/>
            
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden lg:block">

          <div className="bg-white p-5 rounded-2xl shadow-sm sticky top-24">
            <p className="font-semibold mb-3 text-gray-700">
              🔔 Notifications
            </p>

            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400">
                No notifications
              </p>
            ) : (
              notifications.map((n, i) => (
                <p
                  key={i}
                  className="text-sm border-b py-2 text-gray-700"
                >
                  {n.message}
                </p>
              ))
            )}
          </div>

        </div>

      </div>

      <ToastContainer />
    </div>
  );
}