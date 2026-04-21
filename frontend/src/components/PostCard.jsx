import { useState, useRef } from "react";
import Comments from "./Comments";

const API = import.meta.env.VITE_API_URL || "/api";

export default function PostCard({ post, onReact, refresh }) {
  //////////////////////////////////////////////////
  // ✅ FIX: INITIAL (CORRECT)
  //////////////////////////////////////////////////
 const initial =
  post.user?.fullName?.charAt(0) ||
  post.fullName?.charAt(0) ||
  post.user?.email?.charAt(0) ||
  "U";

  const [expandedPost, setExpandedPost] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.content || "");

  const [showPicker, setShowPicker] = useState(false);
  const [myReact, setMyReact] = useState(null);

  const [showUsers, setShowUsers] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    await fetch(`${API}/community/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setConfirmDelete(false);
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
  const totalReactions =
    post.reactions?.reduce((a, b) => a + (b.count || 0), 0) || 0;

  const reactionIcons = post.reactions?.map((r) => r.type) || [];

  const reactionText =
    totalReactions > 0 ? `${totalReactions} reactions` : null;

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border hover:shadow-xl transition w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">

          {/* ✅ AVATAR FIXED */}
          <div className="w-11 h-11 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold text-lg">
            {initial.toUpperCase()}
          </div>

          <div>
           <p className="font-semibold text-gray-800">
  {post.user?.fullName || post.fullName || "Unknown User"}
</p>
            <p className="text-xs text-gray-400">Community Post</p>
          </div>
        </div>

        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setEditing(!editing)}
            className="text-blue-600 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-red-500 font-medium"
          >
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
            {expandedPost
              ? post.content
              : (post.content || "").slice(0, 150)}
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

      {/* REACTION BAR */}
      {reactionText && (
        <div
          onClick={() => setShowUsers(!showUsers)}
          className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-xl text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              {reactionIcons.slice(0, 3).map((icon, i) => (
                <span
                  key={i}
                  className="bg-white rounded-full px-1 text-sm shadow"
                >
                  {icon}
                </span>
              ))}
            </div>

            <span className="font-medium">{reactionText}</span>
          </div>

          <span className="text-gray-400 text-xs">View</span>
        </div>
      )}

      {/* USERS POPUP */}
      {showUsers && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-5 relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">
                Reactions
              </h3>
              <button
                onClick={() => setShowUsers(false)}
                className="text-gray-500 hover:text-black text-lg"
              >
                ✕
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-3">
              {post.reactions?.map((r, i) =>
               (r.users || "").split(",").map((user, idx) => (
                  <div
                    key={i + "-" + idx}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">
                        {user.trim().charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {user.trim()}
                      </span>
                    </div>

                    <span className="text-xl">{r.type}</span>
                  </div>
                ))
              )}
            </div>
          </div>
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

      {/* DELETE MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl text-center">
            <p className="text-gray-800 font-semibold mb-4">
              Delete this post?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={deletePost}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}