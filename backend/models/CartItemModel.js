const Joi = require("joi");

class CartItemModel {
    constructor(cartItemId, productId, quantity, totalPrice, cartId) {    
    if(arguments.length === 5){      
        this.cartItemId = cartItemId;    
        this.productId = productId;       
        this.quantity = quantity;           
        this.totalPrice = totalPrice;           
        this.cartId = cartId;           
    }
    else if(arguments.length === 1) {
        const cartItem = arguments[0];       
        this.cartItemId = cartItem.cartItemId;          
        this.productId = cartItem.productId;         
        this.quantity = cartItem.quantity;              
        this.totalPrice = cartItem.totalPrice;              
        this.cartId = cartItem.cartId;              
    }
    else
        throw "CartItemModel structure error";
    }

    static #validationScheme = Joi.object({   
        cartItemId: Joi.number(),    
        productId: Joi.number().min(1).required(),       
        quantity: Joi.number().min(1).required(),
        totalPrice: Joi.number().min(0).required(),
        cartId: Joi.number().min(0).required(),
    })

    validate() {
        const result = CartItemModel.#validationScheme.validate(this, {abortEarly: false});
        if (result.error) {
            const errObj = {};
            for (const err of result.error.details) {
                errObj[err.context.key] = err.message;
            }
            return errObj
        }
        return null;
    }
}

module.exports = CartItemModel