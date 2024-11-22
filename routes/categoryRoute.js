const express = require("express");
const app = express();

const router = express.Router();

const { getCategores, createCategory } = require("../services/categoryService");

// router.get("/", getCategores);
// router.post("/", createCategory);

router.route("").get(getCategores).post(createCategory);

module.exports = router;
