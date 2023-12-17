const express = require("express")
const productValidation = require("../../validation/product.validation")
const productController  = require("../../controller/product.controller")
const validate = require("../../middlewares/validate");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

//create product
router.post(
    "/create-product",
    upload.single("image"),
    validate(productValidation.createProduct),
    productController.createProduct
);

//list product
router.get(
    "/list-product",
    validate(productValidation.listProduct),
    productController.listProduct
);

//delete product
router.delete(
    "/delete-product/:Id",
    productController.deleteProduct
);

//update product
router.put(
    "/update-product/:productId",
    upload.single("image"),
    productController.updateProduct
);

router.post(
    "/send-mail",
    validate(productValidation.sendMail),
    productController.sendMail
);

module.exports=router;