const slugif = require("slugify");
const CategoryModel = require("../models/categoryModel");
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");

// @ desc   Get list of categores
// @ desc   GET /api/V1/categories
// @access  Public
exports.getCategores = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});
// @ desc   Get specific category bu id
// @ desc   POST /api/V1/categories
// @access  Private

// @ desc   Create category
// @ desc   POST /api/V1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
