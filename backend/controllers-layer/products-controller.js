const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/ProductModel");
const path = require("path");
const fileUpload = require("express-fileupload");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");

const router = express.Router();
router.use(fileUpload());

//Get all categories
router.get("/categories/all", [verifyLoggedIn], async (request, response) => {
    try {
        const categories = await logic.getAllCategoriesAsync();
        if (categories.length != 0)
            response.send(categories);
        else
            response.status(404).send({ message: `Can not find categories` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

// Get all products
router.get("/all", [verifyLoggedIn], async (request, response) => {
    try {
        const products = await logic.getAllProductsAsync();
        if (products.length != 0)
            response.send(products);
        else
            response.status(404).send({ message: `Can not find products` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

// Get amount of products
router.get("/amount-of-products", async (request, response) => {
    try {
        const products = await logic.getAllProductsAsync();
        response.send({amountOfProducts: products.length}); 
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

// Get products by category ID
router.get("/category-id/:id", [verifyLoggedIn], async (request, response) => {
    try {
        const productsByCategoryById = await logic.getProductsByCategoryIdAsync(+request.params.id);
        if (productsByCategoryById.length >= 1) {
            response.send(productsByCategoryById)
        }
        else {
            response.status(404).send({message: `Can not find products for category ${request.params.id}`});
        }
    } catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }
})

// Get product by product ID
router.get("/product-by-id/:productId", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        const product = await logic.getProductByIdAsync(request.params.productId);
        if (product.length != 0)
            response.send(product[0]);
        else
            response.status(404).send({ message: `Can not find product ${request.params.productId}` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

// Get product by product name
router.get("/by-product-name/:productName", [verifyLoggedIn], async (request, response) => {
    try {
        const product = await logic.getProductByNameAsync(request.params.productName);
        if (product.length != 0)
            response.send(product);
        else
            response.status(404).send({ message: `Can not find product ${request.params.productName}` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

// Edit product
router.put("/:id", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    const productIdToEdit = request.params.id;
    try {
        const product = await logic.getProductByIdAsync(productIdToEdit);
        if (product.length == 1) {
            const editedProduct = new ProductModel(request.body);
            const errors = editedProduct.validate();
            if (errors) {
                response.status(400).send(errors);
            }
            else {
                try {
                    await logic.editProductAsync(productIdToEdit, editedProduct, request.files ? request.files.image : null);
                    response.send({ message: `Product "${editedProduct.productName}" was succesfuly changed` })
                } catch (error) {
                    console.log(error)
                    response.status(500).send({ message: "Server error, please try again later" });
                }
            }
        }
        else {
            response.status(404).send(`Vacation ${request.params.id} not found`);
        }
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }

});

// Add product
router.post("/new", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    const newProduct = new ProductModel(request.body);
    const errors = newProduct.validate();
    if (errors) {
        response.status(400).send(errors);
    }
    else {
        try {
            await logic.addProductAsync(newProduct, request.files ? request.files.image : null);
            response.send({ message: `Product "${newProduct.productName}" was added` })
        } catch (error) {
            console.log(error)
            response.status(500).send({ message: "Server error, please try again later" });
        }
    }
})

//Get product image by image name
router.get("/images/:imageName", async (request, response) => {
    try {
        const imageName = request.params.imageName;
        let imageFile = path.join(__dirname, "../images", imageName);
        response.sendFile(imageFile);
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

module.exports = router;