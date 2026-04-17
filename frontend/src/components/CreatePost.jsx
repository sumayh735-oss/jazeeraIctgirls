import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function CreatePost({ onPost }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState(null);

  //////////////////////////////////////////////////
  // 🔔 REAL-TIME POPUP
  //////////////////////////////////////////////////
  

  //////////////////////////////////////////////////
  // 📤 SUBMIT POST
  //////////////////////////////////////////////////
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);

    if (file) {
      formData.append("file", file);
    }

    await onPost(formData);

    setContent("");
    setFile(null);
  };

  //////////////////////////////////////////////////
  // 🎨 UI
  //////////////////////////////////////////////////
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">

     

      <form onSubmit={submit} className="space-y-2">
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
}