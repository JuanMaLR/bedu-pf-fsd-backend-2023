const express = require("express");
const router = express.Router();
const { createUser, updateUser, deleteUser } = require("../controllers/user");

router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
