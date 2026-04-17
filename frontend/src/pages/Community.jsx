import { useEffect, useState } from "react";
import { socket } from "../socket";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL || "/api";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const navigate = useNavigate();

  //////////////////////////////////////////////////
  // CHECK LOGIN
  //////////////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
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
  // REACT POST
  //////////////////////////////////////////////////
  const react = async (id, type) => {
    await fetch(`${API}/community/posts/${id}/react`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ type }),
    });
  };

  //////////////////////////////////////////////////
  // CREATE POST
  //////////////////////////////////////////////////
  const handlePost = async (formData) => {
    await fetch(`${API}/community/posts`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });

    fetchPosts();
  };

  //////////////////////////////////////////////////
  // NOTIFICATIONS
  //////////////////////////////////////////////////
  const loadNotifications = async () => {
    const res = await fetch(`${API}/community/notifications`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setNotifications(data);
  };

  //////////////////////////////////////////////////
  // SOCKET
  //////////////////////////////////////////////////
  useEffect(() => {
    fetchPosts();

    socket.on("newPost", fetchPosts);
    socket.on("newComment", fetchPosts);
    socket.on("reactionPopup", fetchPosts);
    socket.on("commentReaction", fetchPosts);
    socket.on("editComment", fetchPosts);
    socket.on("deleteComment", fetchPosts);

    return () => {
      socket.off("newPost");
      socket.off("newComment");
      socket.off("reactionPopup");
      socket.off("commentReaction");
      socket.off("editComment");
      socket.off("deleteComment");
    };
  }, []);

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////
  return (
    <div className={dark ? "bg-black text-white min-h-screen" : "bg-gray-100 min-h-screen"}>

      {/* DARK MODE */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-5 right-5 px-3 py-1 rounded bg-black text-white z-50"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* NOTIFICATIONS */}
      <div className="fixed top-5 left-5">
        <button
          onClick={() => {
            setShowNotif(!showNotif);
            loadNotifications();
          }}
        >
          🔔
        </button>

        {showNotif && (
          <div className="bg-white text-black shadow p-3 rounded mt-2 w-64">
            {notifications.map((n) => (
              <div key={n.id} className="border-b py-1">
                {n.message}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HEADER */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-blue-800">
          Welcome to the Community
        </h1>
        <p className="text-gray-500 mt-1">
          Share your thoughts, ideas and connect 🚀
        </p>
      </div>

      {/* CONTENT FULL WIDTH CENTERED */}
      <div className="w-full max-w-3xl mx-auto px-4 space-y-5">

        <CreatePost onPost={handlePost} />

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onReact={react}
            refresh={fetchPosts}
          />
        ))}
      </div>
    </div>
  );
}