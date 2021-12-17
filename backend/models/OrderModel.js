const Joi = require("joi");

class OrderModel {
    constructor(userId, cartId, cartPrice, shippingCity, shippingStreet, shippingDate, orderDate, creditCardLast4) {    
    if(arguments.length === 8){         
        this.userId = userId;       
        this.cartId = cartId;           
        this.cartPrice = cartPrice;           
        this.shippingCity = shippingCity;           
        this.shippingStreet = shippingStreet;       
        this.shippingDate = shippingDate;           
        this.orderDate = orderDate;           
        this.creditCardLast4 = creditCardLast4;           
    }
    else if(arguments.length === 1) {
        const order = arguments[0];       
        this.userId = order.userId;          
        this.cartId = order.cartId;         
        this.cartPrice = order.cartPrice;              
        this.shippingCity = order.shippingCity;              
        this.shippingStreet = order.shippingStreet;              
        this.shippingDate = order.shippingDate;         
        this.orderDate = order.orderDate;              
        this.creditCardLast4 = order.creditCardLast4;                         
    }
    else
        throw "OrderModel structure error";
    }

    static #validationScheme = Joi.object({   
        userId: Joi.number().min(1).required(),    
        cartId: Joi.number().min(1).required(),       
        cartPrice: Joi.number().min(0.1).required(),
        shippingCity: Joi.string().min(4).max(30).required(),
        shippingStreet: Joi.string().min(4).max(30).required(),       
        shippingDate: Joi.date().min(new Date()).required(),
        orderDate: Joi.date().required(),
        creditCardLast4: Joi.number().min(0).max(9999).required(),
    })

    validate() {
        const result = OrderModel.#validationScheme.validate(this, {abortEarly: false});
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

module.exports = OrderModel