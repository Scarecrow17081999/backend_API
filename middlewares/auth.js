import { User } from "../models/models.js";
import jwt from "jsonwebtoken";
export const isAuthennicated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    req.user = await User.findById(id);

    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};
