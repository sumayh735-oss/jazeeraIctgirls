const Event = require("../models/event.model");

// GET EVENTS
exports.getEvents = async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
};

// ADD EVENT (ADMIN)
exports.createEvent = async (req, res) => {
  const { title, description, date, image } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    year: new Date(date).getFullYear(),
    image,
  });

  res.json(event);
};