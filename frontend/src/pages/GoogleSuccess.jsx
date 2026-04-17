import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      // save login
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: name,
          email: email,
        })
      );

      // redirect
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Signing you in with Google...</h2>
    </div>
  );
};

export default GoogleSuccess;