const mongoose = require("mongoose");
const config = require("../config/config");

const productSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            trim: true,
        },
        product_name: {
            type: String,
            trim: true,
        },
        product_desc: {
            type: String,
            trim: true,
        },
        product_count: {
            type: Number,
            default: 0
        },
        email: {
            type: String,
            trim: true
        },
        is_active: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: function (doc, data) {
                data.image = `${config.base_url}images/${data.image}`;
            }
        }
    }
)

const product = mongoose.model("product", productSchema)
module.exports = product
