import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      // ✅ SAVE TOKEN
      localStorage.setItem("token", token);

      // ✅ CREATE USER OBJECT (VERY IMPORTANT)
      const user = {
        fullName: name || "Google User",
        email: email || "",
      };

      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 REDIRECT HOME
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <div className="text-center mt-20">Logging in...</div>;
}