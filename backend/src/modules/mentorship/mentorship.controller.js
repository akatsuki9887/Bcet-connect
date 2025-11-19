const service = require("./mentorship.service");

// 🔍 GET /mentorship  → Mentor list
exports.getMentors = async (req, res, next) => {
  try {
    const data = await service.getMentorList();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// 🔍 GET /mentorship/:id  → Single mentor detail
exports.getMentorDetail = async (req, res, next) => {
  try {
    const data = await service.getMentorDetail(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// 📩 POST /mentorship/request  → Send mentorship request
exports.sendRequest = async (req, res, next) => {
  try {
    const { receiver, message } = req.body;

    const data = await service.sendMentorshipRequest(
      req.user.id, // logged-in user (student)
      receiver, // mentor id
      message
    );

    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// 💬 GET /mentorship/chat/:id  → Chat history with mentor
exports.getChat = async (req, res, next) => {
  try {
    const otherUserId = req.params.id;
    const data = await service.getMessages(req.user.id, otherUserId);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// 💬 POST /mentorship/chat/:id  → Send new message
exports.sendChatMessage = async (req, res, next) => {
  try {
    const otherUserId = req.params.id;
    const { text } = req.body;

    const data = await service.sendMessage(req.user.id, otherUserId, text);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
