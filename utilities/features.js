import jwt from "jsonwebtoken";

export const setCookie = async (user, res, message, statusCode = 200) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 1000 * 15 * 60,
      httpOnly: true,
    })
    .json({ success: true, message: message });
};