const dal = require("../data-access-layer/dal");

function getActiveCartByUserIdAsync(userId) {
    return dal.executeQueryAsync(`select * from cart where userId = ? and isActive = 1`, [userId]);
}

function addCartByUserIdAsync(newCart) {
    return dal.executeQueryAsync(`insert into cart values(
        null,
        ?,
        ?,
        ?
    )`, [newCart.userId, newCart.createDate, newCart.isActive]);
}

function getAllCartItemsByCartId(cartId) {
    return dal.executeQueryAsync(`select ci.*, p.productName, p.image from cartitem ci join products p on ci.productId=p.productId where ci.cartId = ? order by ci.cartItemId`, [cartId]);
}

function addItemToCartAsync(cartItem) {
    return dal.executeQueryAsync(`insert into cartitem values(
        null,
        ?,
        ?,
        ?,
        ?
    )`, [cartItem.productId, cartItem.quantity, cartItem.totalPrice, cartItem.cartId]);
}

function removeItemFromCartAsync(cartItemId) {
    return dal.executeQueryAsync(`delete from cartitem where cartItemId = ?`, [cartItemId]);
}

function removeAllCartItemsAsync(cartId) {
    return dal.executeQueryAsync(`delete from cartitem where cartId = ?`, [cartId]);
}

function getCartByCartIdAsync(cartId) {
    return dal.executeQueryAsync(`select * from cart where cartId = ?`, [cartId]);
}

function setIsActiveToZeroByCartIdAsync(cartId) {
    return dal.executeQueryAsync(`update cart set isActive = 0 where cartId = ?`, [cartId]);
}


module.exports = {
    getActiveCartByUserIdAsync,
    addCartByUserIdAsync,
    getAllCartItemsByCartId,
    addItemToCartAsync,
    removeItemFromCartAsync,
    removeAllCartItemsAsync,
    getCartByCartIdAsync,
    setIsActiveToZeroByCartIdAsync
}