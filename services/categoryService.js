const slugif = require("slugify");
const { default: slugify } = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const CategoryModel = require("../models/categoryModel");

// @ desc   Get list of categores
// @ desc   GET /api/V1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @ desc   Get specific category by id
// @ desc   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  // 1- then() catch(err)
  // 2- try{}  catch(err)
  // asyncHandler(async) Send error to express error handler and express return error
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    // res.status(404).json({ msg: `No category found for this ID: ${id}` });
    return next(new ApiError(`No category found for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @ desc   Create category
// @ desc   POST /api/V1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @ desc   Update specific category
// @ desc   PUT /api/V1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return next(new ApiError(`No category found for this ID: ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @ desc   Delete specific category
// @ desc   DELETE /api/V1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No category found for this ID: ${id}`, 404));
  }
  res.status(204).send();
});
