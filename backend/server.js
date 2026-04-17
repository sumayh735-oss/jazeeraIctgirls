require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require("express-session");

const http = require("http");
const socketIo = require("socket.io"); // ✅ ADD THIS
const socket = require("./src/socket");

const { sequelize } = require("./src/config/database");
const communityRoutes = require("./src/routes/community.routes");

const app = express();
const server = http.createServer(app);

//////////////////////////////////////////////////
// GOOGLE CONFIG
//////////////////////////////////////////////////
require("./src/config/google")(passport);

//////////////////////////////////////////////////
// MIDDLEWARE
//////////////////////////////////////////////////
app.use(cors({
  origin: "https://jazeera-ictgirls.vercel.app",
  credentials: true
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//////////////////////////////////////////////////
// ✅ SOCKET.IO (CLEAN VERSION)
//////////////////////////////////////////////////
const io = socketIo(server, {
  cors: { origin: "*" },
});

socket.init(io); // ✅ correct

io.on("connection", (socketClient) => {
  console.log("🔥 User connected:", socketClient.id);
});

//////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////
app.use("/api/community", communityRoutes);

//////////////////////////////////////////////////
// AUTH ROUTES
//////////////////////////////////////////////////

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await sequelize.query(
      `INSERT INTO users (fullName, email, password, role, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      {
        replacements: [fullName, email, hashedPassword, role || "student"],
      }
    );

    res.json({ success: true });
  } catch (err) {
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
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//////////////////////////////////////////////////
// SERVER START
//////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    console.log("🚀 Server running on", PORT);
  } catch (err) {
    console.error(err);
  }
});