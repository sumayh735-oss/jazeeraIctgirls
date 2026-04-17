import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const authService = {
  login: async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return res.data;
  },

  register: async (data) => {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  },
};

export default authService;