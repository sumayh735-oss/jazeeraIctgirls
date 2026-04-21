import { useState } from "react";

export default function CreatePost({ onPost }) {
  const [content, setContent] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!content) return;

    await onPost({ content }); // ✅ JSON only

    setContent("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">

      <form onSubmit={submit} className="space-y-2">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
}