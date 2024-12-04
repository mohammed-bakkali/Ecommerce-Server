const slugif = require("slugify");
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const subCategoryModel = require("../models/sucCategoryModel");

// @ desc   Create subCategory
// @ desc   POST /api/V1/subCategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});


// @ desc   Get list of subCategory
// @ desc   GET /api/V1/subCategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await subCategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: subCategories.length, page, data: subCategories });
});

// @ desc   Get specific subCategory by id
// @ desc   GET /api/v1/subCategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findById(id);
  if (!subCategory) {
    // res.status(404).json({ msg: `No category found for this ID: ${id}` });
    return next(new ApiError(`No category found for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});
