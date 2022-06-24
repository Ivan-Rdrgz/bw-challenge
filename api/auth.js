import express from "express";
import auth from "../middleware/auth.js";
import { getConnection } from "../config/database.js";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// @route  GET api/users
// @desc   Get User
// @access Public
router.get("/", auth, async (req, res) => {
  const db = getConnection();
  const { users } = db.data;

  try {
    const data = users.find((p) => p._id === req.user.id);
    const { password, ...user } = data;
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public
router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const db = getConnection();
    const { users } = db.data;
    const { email, password } = req.body;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = users.find((u) => u.email == req.body.email);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, "thisIsSecret", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

export default router;
