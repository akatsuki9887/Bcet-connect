const Event = require("./event.model");

exports.createEvent = async (data, userId) => {
  data.createdBy = userId;
  return await Event.create(data);
};

exports.getEvents = async () => {
  return await Event.find()
    .populate("createdBy", "name avatar role")
    .sort({ date: 1 });
};

exports.getEventDetails = async (eventId) => {
  return await Event.findById(eventId)
    .populate("createdBy", "name avatar role");
};

exports.registerEvent = async (eventId, userId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    {
      $addToSet: { registeredUsers: userId },
    },
    { new: true }
  );
};
