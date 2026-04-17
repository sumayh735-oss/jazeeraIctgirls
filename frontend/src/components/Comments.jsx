import { useState, useEffect } from "react";

export default function Comments({ postId, comments = [], refresh }) {
  //////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState({});

  const [expandedComments, setExpandedComments] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [editText, setEditText] = useState("");

  const [toast, setToast] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);

  //////////////////////////////////////////////////
  // TOAST AUTO HIDE
  //////////////////////////////////////////////////
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  //////////////////////////////////////////////////
  // ADD COMMENT
  //////////////////////////////////////////////////
  const addComment = async () => {
    if (!text.trim()) return;

    await fetch(`http://localhost:5000/api/community/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ content: text }),
    });

    setText("");
    refresh();
  };

  //////////////////////////////////////////////////
  // ADD REPLY
  //////////////////////////////////////////////////
  const addReply = async (commentId) => {
    if (!replyText[commentId]?.trim()) return;

    await fetch(
      `http://localhost:5000/api/community/posts/${postId}/comments/${commentId}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ content: replyText[commentId] }),
      }
    );

    setReplyText({ ...replyText, [commentId]: "" });
    setToast("Reply added 💬");
    refresh();
  };

  //////////////////////////////////////////////////
  // DELETE (WITH UNDO)
  //////////////////////////////////////////////////
  const deleteComment = async (id, type, data) => {
    setDeletedItem({ id, type, data });

    await fetch(`http://localhost:5000/api/community/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    setToast("Deleted ❌ (Undo available)");
    refresh();
  };

  //////////////////////////////////////////////////
  // UNDO DELETE
  //////////////////////////////////////////////////
  const undoDelete = async () => {
    if (!deletedItem) return;

    await fetch(`http://localhost:5000/api/community/comments/restore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(deletedItem.data),
    });

    setToast("Restored ✅");
    setDeletedItem(null);
    refresh();
  };

  //////////////////////////////////////////////////
  // UPDATE
  //////////////////////////////////////////////////
  const updateComment = async (id) => {
    await fetch(`http://localhost:5000/api/community/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ content: editText }),
    });

    setEditingComment(null);
    setEditingReply(null);
    setEditText("");
    refresh();
  };

  //////////////////////////////////////////////////
  // LIKE / REACT
  //////////////////////////////////////////////////
  const likeComment = async (id) => {
    await fetch(`http://localhost:5000/api/community/comments/${id}/react`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    refresh();
  };

  //////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////
  const visibleComments =
    comments.length > 3
      ? expandedComments["all"]
        ? comments
        : comments.slice(0, 3)
      : comments;

  //////////////////////////////////////////////////
  // COLLAPSE ALL
  //////////////////////////////////////////////////
  const collapseAll = () => {
    setExpandedComments({});
    setExpandedReplies({});
  };

  //////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////
  return (
    <div className="mt-4 space-y-3 relative">

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg">
          {toast}
          {deletedItem && (
            <button onClick={undoDelete} className="ml-3 underline">
              Undo
            </button>
          )}
        </div>
      )}

      {/* ADD COMMENT */}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Write a comment..."
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Send
        </button>
      </div>

      {/* COLLAPSE ALL */}
      <button onClick={collapseAll} className="text-xs text-gray-500">
        Collapse all
      </button>

      {/* COMMENTS */}
      {visibleComments.map((c) => {
        const replies = c.replies || [];

        const visibleReplies = expandedReplies[c.id]
          ? replies
          : replies.slice(0, 2);

        return (
          <div key={c.id} className="bg-gray-100 p-3 rounded">

            {/* HEADER */}
            <div className="flex justify-between">
              <b>{c.fullName}</b>

              <div className="flex gap-2 text-xs">
                <span
                  onClick={() => {
                    setEditingComment(c.id);
                    setEditText(c.content);
                  }}
                  className="text-blue-500 cursor-pointer"
                >
                  Edit
                </span>

                <span
                  onClick={() => deleteComment(c.id, "comment", c)}
                  className="text-red-500 cursor-pointer"
                >
                  Delete
                </span>
              </div>
            </div>

            {/* CONTENT */}
            {editingComment === c.id ? (
              <div className="flex gap-2 mt-1">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border flex-1"
                />
                <button onClick={() => updateComment(c.id)}>Save</button>
              </div>
            ) : (
              <p>{c.content}</p>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 text-xs mt-1">
              <span
                onClick={() => likeComment(c.id)}
                className="cursor-pointer"
              >
                👍 {c.reactionCount || 0}
              </span>

              <span className="text-gray-500">
                💬 {replies.length} replies
              </span>
            </div>

            {/* REPLIES */}
            <div className="ml-5 mt-2">
              {visibleReplies.map((r) => (
                <div key={r.id} className="bg-blue-100 p-2 rounded mt-1">

                  <div className="flex justify-between">
                    <b>{r.fullName}</b>

                    <div className="flex gap-2 text-xs">
                      <span
                        onClick={() => {
                          setEditingReply(r.id);
                          setEditText(r.content);
                        }}
                        className="text-blue-500 cursor-pointer"
                      >
                        Edit
                      </span>

                      <span
                        onClick={() => deleteComment(r.id, "reply", r)}
                        className="text-red-500 cursor-pointer"
                      >
                        Delete
                      </span>

                      <span
                        onClick={() => likeComment(r.id)}
                        className="cursor-pointer"
                      >
                        👍 {r.reactionCount || 0}
                      </span>
                    </div>
                  </div>

                  {editingReply === r.id ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="border flex-1"
                      />
                      <button onClick={() => updateComment(r.id)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <p>{r.content}</p>
                  )}
                </div>
              ))}

              {/* VIEW MORE REPLIES */}
              {replies.length > 2 && (
                <span
                  onClick={() =>
                    setExpandedReplies({
                      ...expandedReplies,
                      [c.id]: !expandedReplies[c.id],
                    })
                  }
                  className="text-blue-500 text-xs cursor-pointer"
                >
                  {expandedReplies[c.id]
                    ? "Hide replies"
                    : `View more replies (${replies.length - 2})`}
                </span>
              )}
            </div>

            {/* ADD REPLY */}
            <div className="flex gap-2 mt-2">
              <input
                value={replyText[c.id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [c.id]: e.target.value,
                  })
                }
                className="border flex-1 p-1 rounded"
                placeholder="Reply..."
              />
              <button onClick={() => addReply(c.id)}>Reply</button>
            </div>

          </div>
        );
      })}

      {/* VIEW MORE COMMENTS */}
      {comments.length > 3 && (
        <span
          onClick={() =>
            setExpandedComments({
              ...expandedComments,
              all: !expandedComments["all"],
            })
          }
          className="text-blue-500 cursor-pointer text-sm"
        >
          {expandedComments["all"]
            ? "Hide comments"
            : `View more comments (${comments.length - 3})`}
        </span>
      )}
    </div>
  );
}