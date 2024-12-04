const express = require("express");
const app = express();

const router = express.Router();

const { createSubCategory } = require("../services/subCategoryService");

const { createsubCategoryValidator } = require("../utils/validators/subCategoryValidator");


router.route("./").post(createsubCategoryValidator, createSubCategory);

module.exports = router;

