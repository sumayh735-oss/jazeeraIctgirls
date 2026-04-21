const express = require("express");
const router = express.Router();

const eventCtrl = require("../controllers/event.controller");
const regCtrl = require("../controllers/registration.controller");

// EVENTS
const upload = require("../config/upload");

router.post("/events", upload.single("image"), async (req, res) => {
  const { title, description, date } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    year: new Date(date).getFullYear(),
    image: req.file.path,
  });

  res.json(event);
});
// REGISTER
router.post("/register", regCtrl.register);

module.exports = router;