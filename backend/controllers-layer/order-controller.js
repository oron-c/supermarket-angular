const express = require("express");
const logic = require("../business-logic-layer/order-logic"); 
const OrderModel = require("../models/OrderModel");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

// Get amount of orders
router.get("/amount-of-orders", async (request, response) => {
    try {
        const allOrders = await logic.getAllOrdersAsync();
        response.send({amountOfOrders: allOrders.length}); 
    } catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }
});


// Get all orders by userId
router.get("/:userId/all", [verifyLoggedIn], async (request, response) => {
    try {
        const allOrders = await logic.getAllOrdersByUserIdAsync(+request.params.userId);
        if (allOrders.length != 0)
            response.send(allOrders);
        else
            response.status(404).send({message: `You do not have any orders!`});
    } catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }
});



// Get recent order
router.get("/:userId/recent", [verifyLoggedIn], async (request, response) => {
    try {
        const recentOrder = await logic.getLastOrderByUserIdAsync(+request.params.userId);
        if (recentOrder.length != 0)
            response.send(recentOrder[0]);
        else
            response.status(404).send({message: `You do not have any orders!`});
    } catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }
});

// New order
router.post("/new-order", [verifyLoggedIn], async (request, response) => { 
    const newOrder = new OrderModel(request.body);
    const errors = newOrder.validate();
    if (errors) {
        response.status(400).send(errors);
    }
    else {
        try {
            await logic.placeNewOrderAsync(newOrder);
            response.send({message: `A new order was placed for user ${newOrder.userId}!`})
        } catch (error) {
            console.log(error)
            response.status(500).send({message: "Server error, please try again later"});
        }
    }
})

// Get orders by date
router.get("/orders-by-shipping-date", [verifyLoggedIn], async (request, response) => {
    try {
        const shippingDate = await logic.getAllOrdersByShippingDateAsync();
            response.send(shippingDate); 
    } catch (error) {
        console.log(error)
        response.status(500).send({message: "Server error, please try again later"});
    }
});


module.exports = router;