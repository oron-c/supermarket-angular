const express = require("express");
const logic = require("../business-logic-layer/cart-logic");
const CartModel = require("../models/CartModel");
const CartItemModel = require("../models/CartItemModel");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

// Get active cart
router.get("/:id/my-cart", [verifyLoggedIn], async (request, response) => {
    try {
        const activeCart = await logic.getActiveCartByUserIdAsync(+request.params.id);
        if (activeCart.length != 0)
            response.send(activeCart[0]);
        else
            response.status(404).send({ message: `You do not have an active cart!` });
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

// New cart
router.post("/new-cart", [verifyLoggedIn], async (request, response) => {
    const newCart = new CartModel(request.body);
    const errors = newCart.validate();
    if (errors) {
        response.status(400).send(errors);
    }
    else {
        try {
            await logic.addCartByUserIdAsync(newCart);
            response.send(newCart);
        } catch (error) {
            console.log(error)
            response.status(500).send({ message: "Server error, please try again later" });
        }
    }
})

// View cart items
router.get("/:cartId/my-cart-items", [verifyLoggedIn], async (request, response) => {
    try {
        const cartItems = await logic.getAllCartItemsByCartId(request.params.cartId);
        response.send(cartItems);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error, please try again later" });
    }
});


// Add item to cart
router.post("/:cartId/add-to-cart", [verifyLoggedIn], async (request, response) => {
    const cartItemToAdd = new CartItemModel(request.body);
    const errors = cartItemToAdd.validate();
    if (errors) {
        response.status(400).send(errors);
    }
    else {
        try {
            await logic.addItemToCartAsync(cartItemToAdd);
            response.send({ message: `Product "${cartItemToAdd.cartItemId}" was added` })
        } catch (error) {
            console.log(error)
            response.status(500).send({ message: "Server error, please try again later" });
        }
    }
})

// Remove item from cart
router.delete("/:cartItemId/remove-from-cart", [verifyLoggedIn], async (request, response) => {
    const cartItemToRemove = request.params.cartItemId;
    try {
        await logic.removeItemFromCartAsync(cartItemToRemove);
        response.send({ message: `Product "${cartItemToRemove}" has been removed` })
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
})

// Remove all items from cart
router.delete("/:cartId/remove-all-items-from-cart", [verifyLoggedIn], async (request, response) => {
    const cartId = request.params.cartId;
    try {
        await logic.removeAllCartItemsAsync(cartId);
        response.send({ message: `All items from cart "${cartId}" has been removed` })
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
})

//Set isActive = 0 
router.patch("/:cartId/order-complete", [verifyLoggedIn], async (request, response) => {
    try {
        const cart = await logic.getCartByCartIdAsync(+request.params.cartId);
        if (cart.length === 1) {
            try {
                await logic.setIsActiveToZeroByCartIdAsync(+request.params.cartId);
                response.send({ message: `Cart "${request.params.cartId}" is no longer active` })
            } catch (error) {
                console.log(error)
                response.status(500).send({ message: "Server error, please try again later" });
            }
        } else {
            response.status(404).send({ message: `Cart "${request.params.cartId}" not found!` })
        }
    } catch (error) {
            console.log(error)
            response.status(500).send({ message: "Server error, please try again later" });
        }
})


// Get cart by cartId
router.get("/:cartId", [verifyLoggedIn], async (request, response) => {
    try {
        const cart = await logic.getCartByCartIdAsync(+request.params.cartId);
        if (cart.length === 1) {
            response.send(cart)
        }
        else {
            response.status(404).send({ message: `Can not find cart nummber ${request.params.id}` });
        }
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Server error, please try again later" });
    }
});

module.exports = router;