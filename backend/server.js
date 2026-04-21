// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer");

const { sequelize } = require("./src/config/database");
const communityRoutes = require("./src/routes/community.routes");

const app = express();
const server = http.createServer(app);

//////////////////////////////////////////////////
// ✅ MIDDLEWARE (MOVED UP - IMPORTANT)
//////////////////////////////////////////////////
app.use(cors());
app.use(express.json());

//////////////////////////////////////////////////
// 📧 CONTACT EMAIL (FIXED)
//////////////////////////////////////////////////
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`, // ✅ FIX
      to: process.env.EMAIL_USER, // 📩 YOU receive message
      replyTo: email, // ✅ user email
      subject: `📩 New Message from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true });

  } catch (err) {
    console.error("EMAIL ERROR:", err);
    res.status(500).json({ message: err.message }); // 🔥 show real error
  }
});

//////////////////////////////////////////////////
// 🔌 SOCKET.IO
//////////////////////////////////////////////////
const io = socketIo(server, {
  cors: { origin: "*" },
});

// 🔥 make io accessible in controllers
app.set("io", io);

const onlineUsers = new Map(); // socketId -> user

io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  // 🟢 USER ONLINE
  socket.on("userOnline", (user) => {
    onlineUsers.set(socket.id, user);
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
  });

  // 🔔 NEW NOTIFICATION
  socket.on("sendNotification", (data) => {
    io.emit("newNotification", data);
  });

  // 🆕 NEW POST EVENT (ADDED)
  socket.on("newPost", () => {
    io.emit("newPost");
  });

  // ❌ DISCONNECT
  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.values()));
    console.log("❌ User disconnected:", socket.id);
  });
});

//////////////////////////////////////////////////
// 📡 ROUTES
//////////////////////////////////////////////////
app.use("/api/community", communityRoutes);

//////////////////////////////////////////////////
// 🔐 AUTH
//////////////////////////////////////////////////

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await sequelize.query(
      `INSERT INTO users (fullName, email, password, role, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      {
        replacements: [fullName, email, hashed, role || "student"],
      }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await sequelize.query(
      "SELECT * FROM users WHERE email = ?",
      { replacements: [email] }
    );

    const user = users[0];
    if (!user) return res.json({ success: false });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

//////////////////////////////////////////////////
// 🚀 START SERVER
//////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
    console.log("🚀 Server running on", PORT);
  } catch (err) {
    console.error(err);
  }
});