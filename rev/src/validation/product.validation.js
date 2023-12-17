const Joi = require("joi")

const createProduct = {
    body: Joi.object().keys({
        image: Joi.string().allow(),
        product_name: Joi.string().required().trim(),
        product_desc: Joi.string().required().trim(),
        product_count: Joi.number().integer(),
        email: Joi.string().required().trim(),
    })
}

const listProduct = {
    query: Joi.object().keys({
        product_name: Joi.string().allow("").trim(),
        product_desc: Joi.string().allow("").trim(),
        product_count: Joi.number().integer(),
        email: Joi.string().allow("").trim(),
    })
}

const sendMail = {
    body:Joi.object().keys({
        email:Joi.string().required().email(),
        subject:Joi.string().required().trim(),
        text:Joi.string().required().trim()
    })
}


module.exports = { createProduct,listProduct,sendMail }