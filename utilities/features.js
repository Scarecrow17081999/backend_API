import jwt from "jsonwebtoken";

export const setCookie = async (user, res, message, statusCode = 200) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 30 * 24 * 3600000),
      httpOnly: true,
      // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      // secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message: message });
};
