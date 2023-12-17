const { Product } = require("../models")



/**
 * @param {object} reqBody
 * @returns {Promise<Product>}
 */

const createProduct = async (reqBody) => {
    return Product.create(reqBody)
}

const getProductByEmail = async (email) => {
    return Product.findOne({email});
}
const listProduct = async (reqBody) => {
    return Product.find({ $or: [{is_active : "true"}] })
}
const deleteProduct = async (id) => {
    return Product.findByIdAndDelete(id)
}
const getProductById = async (categoryid) => {
    return Product.findById(categoryid)
}
const updateDetail = async (id, updateBody) => {
    return Product.findByIdAndUpdate(id, { $set: updateBody })
}

module.exports = {
    createProduct,
    listProduct,
    deleteProduct,
    getProductById,
    updateDetail,
    getProductByEmail
}