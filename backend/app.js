const express = require("express");
const cors = require("cors");

const productsController=require("./controllers-layer/products-controller");
const usersController=require("./controllers-layer/users-controller");
const cartController=require("./controllers-layer/cart-controller");
const orderController=require("./controllers-layer/order-controller");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/users", usersController);
server.use("/api/products", productsController);
server.use("/api/cart", cartController);
server.use("/api/order", orderController);

server.use("*", (req, res) => {
    res.status(404).send( {message: `Route not found ${req.originalUrl}` });
});

server.listen(4000, () => {
    console.log("Listening on 4000");
});