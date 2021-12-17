const dal = require("../data-access-layer/dal");

function getAllOrdersAsync() {
    return dal.executeQueryAsync(`select * from orders`);
}

function getAllOrdersByUserIdAsync(userId) {
    return dal.executeQueryAsync(`select * from orders where userId = ?`, [userId]);
}

function getLastOrderByUserIdAsync(userId) {
    return dal.executeQueryAsync(`select * from orders where userId = ? order by orderId DESC limit 1 `, [userId]);
}

function placeNewOrderAsync(order) {
    return dal.executeQueryAsync(`insert into orders values(
        null,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )`, [order.userId, order.cartId, order.cartPrice, order.shippingCity, order.shippingStreet, order.shippingDate, order.orderDate, order.creditCardLast4]);
}

function getAllOrdersByShippingDateAsync() {
    return dal.executeQueryAsync(`select DATE_FORMAT(shippingDate, "%Y-%m-%d") as shippingDate, count(shippingDate) as numberOfOrders from orders GROUP by shippingDate`);
}

module.exports = {
    getAllOrdersAsync,
    getAllOrdersByUserIdAsync,
    getLastOrderByUserIdAsync,
    placeNewOrderAsync,
    getAllOrdersByShippingDateAsync
}