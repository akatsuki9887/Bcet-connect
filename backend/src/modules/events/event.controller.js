const eventService = require("./event.service");

exports.createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body, req.user.id);
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const events = await eventService.getEvents();
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

exports.getEventDetails = async (req, res, next) => {
  try {
    const event = await eventService.getEventDetails(req.params.id);
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

exports.registerEvent = async (req, res, next) => {
  try {
    const updated = await eventService.registerEvent(req.params.id, req.user.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};
