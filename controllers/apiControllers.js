import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utilities/features.js";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res) => {
  res.send("home");
};

export const getMyProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPass,
        confirmPassword: password,
      });
      setCookie(newUser, res, "Registered Successfuly", 201);
    } else {
      return res.status(400).send("User already exists");
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    console.log(user.password);

    if (user && (await bcrypt.compare(password, user.password))) {
      setCookie(user, res, "login successful", 200);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).send("internal server error");
  }
};

export const home = async (req, res) => {
  res.send("Hello World!");
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(400).send(error);
  }
};
