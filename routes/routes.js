import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getMyProfile,
  register,
  login,
  home,
  logout,
} from "../controllers/apiControllers.js";
import { isAuthennicated } from "../middlewares/auth.js";
//creatin a get request
router.get("/", home);

//get all users

router.get("/all", isAuthennicated, getAllUsers);
router.get("/all/:_id", getMyProfile);

///creating a new user

router.post("/new", register);

//login user
router.post("/login", login);
//logout
router.get("/logout", logout);
export default router;
