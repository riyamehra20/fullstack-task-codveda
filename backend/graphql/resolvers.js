const jwt     = require("jsonwebtoken");
const User    = require("../models/userModel");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const resolvers = {
  Query: {
    // ── Login ──
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
        return { success: false, message: "Invalid email or password", token: null, user: null };
      }
      return {
        success: true,
        message: "Login successful!",
        token: generateToken(user._id),
        user,
      };
    },

    // ── Get logged-in user (protected) ──
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },

    // ── Get single user (protected) ──
    getUser: async (_, { id }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const found = await User.findById(id);
      if (!found) return { success: false, message: "User not found", user: null };
      return { success: true, message: "User found", user: found };
    },

    // ── Get all users (admin only) ──
    getAllUsers: async (_, __, { user }) => {
      if (!user)              throw new Error("Not authenticated");
      if (user.role !== "admin") throw new Error("Access denied. Admins only.");
      const users = await User.find();
      return { success: true, count: users.length, users };
    },
  },

  Mutation: {
    // ── Signup ──
    signup: async (_, { name, email, password, age }) => {
      const exists = await User.findOne({ email });
      if (exists) return { success: false, message: "Email already registered", token: null, user: null };
      const user = await User.create({ name, email, password, age });
      return {
        success: true,
        message: "Account created!",
        token: generateToken(user._id),
        user,
      };
    },

    // ── Update user (admin only) ──
    updateUser: async (_, { id, ...updates }, { user }) => {
      if (!user)              throw new Error("Not authenticated");
      if (user.role !== "admin") throw new Error("Access denied. Admins only.");
      const updated = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!updated) return { success: false, message: "User not found", user: null };
      return { success: true, message: "User updated", user: updated };
    },

    // ── Delete user (admin only) ──
    deleteUser: async (_, { id }, { user }) => {
      if (!user)              throw new Error("Not authenticated");
      if (user.role !== "admin") throw new Error("Access denied. Admins only.");
      const deleted = await User.findByIdAndDelete(id);
      if (!deleted) return { success: false, message: "User not found", user: null };
      return { success: true, message: "User deleted", user: deleted };
    },
  },
};

module.exports = resolvers;
