import { useState, useRef } from "react";
import Comments from "./Comments";

const API = import.meta.env.VITE_API_URL || "/api";

export default function PostCard({ post, onReact, refresh }) {
  const [expandedPost, setExpandedPost] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.content || "");

  const [showPicker, setShowPicker] = useState(false);
  const [myReact, setMyReact] = useState(null);

  const [showUsers, setShowUsers] = useState(false);

  const hideTimeout = useRef(null);

  //////////////////////////////////////////////////
  // REACTION
  //////////////////////////////////////////////////
  const handleReaction = async (type) => {
    setMyReact(type);
    await onReact(post.id, type);
    refresh();
  };

  //////////////////////////////////////////////////
  // DELETE POST
  //////////////////////////////////////////////////
  const deletePost = async () => {
    if (!window.confirm("Delete post?")) return;

    await fetch(`${API}/community/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    refresh();
  };

  //////////////////////////////////////////////////
  // UPDATE POST
  //////////////////////////////////////////////////
  const updatePost = async () => {
    await fetch(`${API}/community/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ content: editText }),
    });

    setEditing(false);
    refresh();
  };

  //////////////////////////////////////////////////
  // REACTION SUMMARY
  //////////////////////////////////////////////////
  const totalReactions = post.reactions?.reduce((a, b) => a + b.count, 0);

  const reactionText =
    post.reactions && post.reactions.length > 0
      ? `${post.reactions[0].users?.split(",")[0]} and ${totalReactions - 1} others reacted`
      : null;

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border hover:shadow-xl transition w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
            {post.fullName?.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.fullName}</p>
            <p className="text-xs text-gray-400">Community Post</p>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <button onClick={() => setEditing(!editing)} className="text-blue-600 font-medium">
            Edit
          </button>
          <button onClick={deletePost} className="text-red-500 font-medium">
            Delete
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {editing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={updatePost}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {expandedPost ? post.content : (post.content || "").slice(0, 150)}
          </p>

          {(post.content || "").length > 150 && (
            <span
              onClick={() => setExpandedPost(!expandedPost)}
              className="text-blue-600 text-sm cursor-pointer font-medium"
            >
              {expandedPost ? " See less" : " View more"}
            </span>
          )}
        </div>
      )}

      {/* MEDIA */}
      {post.image && (
        <img src={post.image} className="rounded-xl w-full object-cover max-h-[400px]" />
      )}
      {post.video && (
        <video src={post.video} controls className="rounded-xl w-full max-h-[400px]" />
      )}

      {/* REACTION BAR */}
      {reactionText && (
        <div
          onClick={() => setShowUsers(!showUsers)}
          className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
        >
          👍 {reactionText}
        </div>
      )}

      {/* USERS POPUP */}
      {showUsers && (
        <div className="bg-white border shadow-lg rounded-lg p-3 text-sm">
          {post.reactions.map((r, i) => (
            <div key={i}>
              <b>{r.type}</b>: {r.users}
            </div>
          ))}
        </div>
      )}

      {/* REACTION PICKER */}
      <div className="relative inline-block">
        <button
          onMouseEnter={() => {
            clearTimeout(hideTimeout.current);
            setShowPicker(true);
          }}
          onMouseLeave={() => {
            hideTimeout.current = setTimeout(() => setShowPicker(false), 200);
          }}
          className="px-4 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          {myReact || "👍 React"}
        </button>

        {showPicker && (
          <div
            onMouseEnter={() => clearTimeout(hideTimeout.current)}
            onMouseLeave={() => setShowPicker(false)}
            className="absolute bottom-full mb-3 left-0 bg-white shadow-xl px-4 py-2 rounded-full flex gap-3 border"
          >
            {["👍", "❤️", "😂", "😮", "😢"].map((e) => (
              <span
                key={e}
                className="cursor-pointer text-2xl hover:scale-125 transition"
                onClick={() => handleReaction(e)}
              >
                {e}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* COMMENTS */}
      <Comments postId={post.id} comments={post.comments} refresh={refresh} />
    </div>
  );
}