const express = require("express");
const app = express();

const router = express.Router();

const { createSubCategory } = require("../services/subCategoryService");

const { createSubCategoryValidator } = require("../utils/validators/subCategoryValidator");


router.route("/").post(createSubCategoryValidator, createSubCategory);

module.exports = router;

