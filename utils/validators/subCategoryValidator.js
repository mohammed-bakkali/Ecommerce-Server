const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// exports.getSubCategoryValidator = [
//   // 1- Rules: Validate the 'id' parameter from the request
//   // - isMongoId():  Checks if id is a valid MongoDB identifier (24 decimal characters).
//   // - withMessage("Invalid category id"):  If the id is not valid, an "Invalid category id" error message will be returned.
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   // 2- middleware ==> catch errors from rules if exist
//   validatorMiddleware,
// ];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name"),
  check("category")
    .notEmpty()
    .withMessage("category must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];

// exports.updateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("Invalid Subcategory id format"),
//   validatorMiddleware,
// ];
