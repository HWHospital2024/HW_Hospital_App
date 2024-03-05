const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.Controller");

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.get("/users/me", userController.getStaff);
router.post("/users/logout", userController.logout);

module.exports = router;
