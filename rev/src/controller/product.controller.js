const { productService, emailService } = require("../services")
const fs = require("fs")

//create product
const createProduct = async (req, res) => {
    try {
        const reqBody = req.body;

        // if (req.file) {
        //     reqBody.image = req.file.filename;
        // } else {
        //     throw new Error("category image is required!");
        // }
        const productEx = await productService.getProductByEmail(reqBody,email);
        if (productEx){
            throw new Error ("User already created by this email!")
        }

        const product = await productService.createProduct(reqBody);
        if (!product) {
            throw new Error("product not found!");
        }

        res.status(200).json({
            success: true,
            message: ("product create successfully!"),
            data: { product }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message

        })

    }
}

const listProduct = async (req, res) => {
    try {
        const reqBody = req.body;

        const product = await productService.listProduct(reqBody);
        if (!product) {
            throw new Error("product not found!");
        }

        res.status(200).json({
            success: true,
            message: ("product list successfully!"),
            data: { product }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message

        })

    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.Id;
        const product = await productService.listProduct(id);
        if (!product) {
            throw new Error("product not found!");
        }
        await productService.deleteProduct(id);

        res.status(200).json({
            success: true,
            message: ("product delete successfully!"),
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message

        })

    }
}

const updateProduct = async (req, res) => {
    try {
        const reqBody = req.body;
        const id = req.params.productId;
        const product = await productService.getProductById(id);
        if (!product) {
            throw new Error("product not found!");
        }

        if (req.file) {
            reqBody.image = req.file.filename;
        }


        const updateproduct = await productService.updateDetail(id, req.body);
        if (updateproduct) {
            const filePath = `./public/image/${product.image}`
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } else {
            throw new Error("Somthing want to wrong, please try again or leter!")
        }

        res.status(200).json({
            success: true,
            message: ("product details update successfully!"),
            data: updateproduct,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message

        })

    }
}

const sendMail = async (req, res) => {
    try {
        const reqBody = req.body;
        const sendEmail = await emailService.sendMail(
            reqBody.email,
            reqBody.subject,
            reqBody.text
        );
        if (!sendEmail) {
            throw new Error("Something went wrong, please try again or later.");
        }

        res
            .status(200)
            .json({ success: true, message: "Email send successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    createProduct,
    listProduct,
    deleteProduct,
    updateProduct,
    sendMail
}