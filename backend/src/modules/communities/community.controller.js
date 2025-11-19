const communityService = require("./community.service");

exports.createCommunity = async (req, res, next) => {
  try {
    const community = await communityService.createCommunity(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: "Community created successfully",
      data: community
    });
  } catch (err) {
    next(err);
  }
};

exports.getCommunities = async (req, res, next) => {
  try {
    const communities = await communityService.getCommunities();
    res.json({
      success: true,
      data: communities
    });
  } catch (err) {
    next(err);
  }
};

exports.getCommunityDetails = async (req, res, next) => {
  try {
    const community = await communityService.getCommunityDetails(req.params.id);

    if (!community) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    res.json({
      success: true,
      data: community
    });
  } catch (err) {
    next(err);
  }
};

exports.joinCommunity = async (req, res, next) => {
  try {
    const updated = await communityService.joinCommunity(
      req.params.id,
      req.user.id
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    res.json({
      success: true,
      message: "Joined community",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.postInCommunity = async (req, res, next) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({
        success: false,
        message: "Post text is required"
      });
    }

    const updated = await communityService.postInCommunity(
      req.params.id,
      req.user.id,
      req.body
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Community not found"
      });
    }

    res.json({
      success: true,
      message: "Post created",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};
