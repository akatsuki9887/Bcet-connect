// backend/src/modules/auth/auth.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model"); // path dhyaan se

// REGISTER LOGIC
exports.register = async (data) => {
  const { name, email, password, role } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error("User already exists with this email");
    err.statusCode = 409;
    throw err;
  }

  // Password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in DB
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // NEVER return password
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

// LOGIN LOGIC
exports.login = async (data) => {
  const { email, password } = data;

  // Check user by email
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};
