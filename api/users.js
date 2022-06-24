import express from "express";
const router = express.Router();
import { getConnection } from "../config/database.js";
import { check, validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  [
    check("lastName", "last name field is required").not().isEmpty(),
    check("firstName", "first name field is required").not().isEmpty(),
    check("email", "email is not in a valid format").isEmail(),
    check("phone", "phone number format incorrect")
      .isMobilePhone()
      .optional({ checkFalsy: true }),
    check("password", "password should be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const db = getConnection();
    const { users } = db.data;
    const {
      age,
      eyeColor,
      firstName,
      lastName,
      company,
      email,
      password,
      phone,
      address,
    } = req.body;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = users.find((u) => u.email == req.body.email);
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const guid = uuidv4();
      const id = (
        Math.random().toString(16).slice(2) + Date.now().toString().slice(-8)
      ).slice(0, 24);
      const balance =
        "$" +
        Math.floor(Math.random() * (100000000 + 1)).toLocaleString("en-US") +
        "." +
        Math.floor(Math.random() * (99 + 1)).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
        });

      const _ = users.push({
        _id: id,
        guid: guid,
        isActive: true,
        balance: balance,
        picture: "https://via.placeholder.com/230x230",
        age: age,
        eyecolor: eyeColor,
        name: {
          first: firstName,
          last: lastName,
        },
        company: company,
        email: email,
        salt: salt,
        password: hashedPass,
        phone: phone,
        address: address || "",
      });

      await db.write();

      const payload = {
        user: {
          id: id,
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

// @route  POST api/users/update
// @desc   Update user info
// @access Public
router.post(
  "/update",
  [
    check("lastName", "last name field is required").not().isEmpty(),
    check("firstName", "first name field is required").not().isEmpty(),
    check("email", "email is not in a valid format").isEmail(),
    check("phone", "phone number format incorrect")
      .isMobilePhone()
      .optional({ checkFalsy: true }),
  ],
  async (req, res) => {
    const db = getConnection();
    const { users } = db.data;
    const {
      age,
      eyeColor,
      firstName,
      lastName,
      company,
      email,
      phone,
      address,
      id,
    } = req.body;

    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userFound = users.find((u) => u.email == req.body.email);
      if (userFound && req.body.id !== userFound._id) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      let uFound = db.data.users.find((u) => u._id === id);
      uFound.age = age;
      uFound.eyeColor = eyeColor;
      uFound.name.first = firstName;
      uFound.name.last = lastName;
      uFound.company = company;
      uFound.email = email;
      uFound.phone = phone;
      uFound.address = address;

      db.data.users.map((user) => (user._id === id ? uFound : user));
      await db.write();
      const payload = {
        user: {
          id: id,
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
