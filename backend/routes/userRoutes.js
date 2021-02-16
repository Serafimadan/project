import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  subscribeUser,
  unSubscribeUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import passport from "passport";
import generateToken from "../utils/generateToken.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
/* GET Google Authentication API. */
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

router.get("/current_user", (req, res) => {
  const user = req.user;
  if (user) {
    res.status(201).json({
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/subscribe", subscribeUser);
router.post("/unsubscribe", unSubscribeUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
