const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    res.status(500).send("Server error");
  }
});

// UPDATE profile
router.put(
  "/",
  auth,
  [body("name").optional(), body("bio").optional()],
  async (req, res) => {
    const { name, bio } = req.body;

    try {
      const updated = await User.findByIdAndUpdate(
        req.user.id,
        { name, bio },
        { new: true }
      ).select("-password");

      res.json(updated);
    } catch {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
