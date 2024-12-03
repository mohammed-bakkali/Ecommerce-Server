const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  // 1- Rules: Validate the 'id' parameter from the request
  // - isMongoId():  Checks if id is a valid MongoDB identifier (24 decimal characters).
  // - withMessage("Invalid category id"):  If the id is not valid, an "Invalid category id" error message will be returned.
  check("id").isMongoId().withMessage("Invalid category id format"),
  // 2- middleware ==> catch errors from rules if exist
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format"),
  validatorMiddleware,
];
