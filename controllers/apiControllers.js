import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utilities/features.js";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res, next) => {
  res.send("home");
};

export const getMyProfile = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login First", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPass,
        confirmPassword: hashedPass,
      });
      setCookie(newUser, res, "Registered Successfuly", 201);
    } else {
      return next(new ErrorHandler("User Already exists", 404));
    }
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (user && (await bcrypt.compare(password, user.password))) {
      setCookie(user, res, "login successful", 200);
    } else {
      return next(new ErrorHandler("Invalid Credentials", 404));
    }
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
};

export const home = async (req, res, next) => {
  res.send("Hello World!");
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
