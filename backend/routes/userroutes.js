const express = require("express");
const router  = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/usercontroller");
const { protect, restrictTo } = require("../library/authMiddleware");

// All routes below require login
router.use(protect);

router.get("/",      restrictTo("admin"), getAllUsers);   // admin only
router.get("/:id",   getUserById);                        // any logged-in user
router.put("/:id",   restrictTo("admin"), updateUser);    // admin only
router.delete("/:id",restrictTo("admin"), deleteUser);    // admin only

module.exports = router;
