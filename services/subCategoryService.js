const slugif = require("slugify");
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const subCategoryModel = require("../models/sucCategoryModel");

// @ desc   Create subCategory
// @ desc   POST /api/V1/subCategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = req.body.name;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: category });
});
