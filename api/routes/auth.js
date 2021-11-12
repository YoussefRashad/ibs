const express = require("express");
const router = express.Router();

const {
   login,
   register,
   logout,
   forgetPassword,
   updatePassword,
   resetPassword,
} = require("../controllers/auth");

const { isAuth } = require("../middlewares/auth");

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.post("/forget-password", forgetPassword);

router.post("/reset-password", resetPassword);

router.post("/update-password", isAuth, updatePassword);

module.exports = router;
