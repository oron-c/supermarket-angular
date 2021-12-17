const Joi = require("joi");

class CartModel {
    constructor(userId, createDate, isActive) {    
    if(arguments.length === 3){      
        this.userId = userId;    
        this.createDate = createDate;       
        this.isActive = isActive;           
    }
    else if(arguments.length === 1) {
        const cart = arguments[0];       
        this.userId = cart.userId;          
        this.createDate = cart.createDate;         
        this.isActive = cart.isActive;              
    }
    else
        throw "CartModel structure error";
    }

    static #validationScheme = Joi.object({   
        userId: Joi.number().min(1).required(),    
        createDate: Joi.date().required(),         
        isActive: Joi.number().min(0).max(1).required(),
    })

    validate() {
        const result = CartModel.#validationScheme.validate(this, {abortEarly: false});
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

module.exports = CartModel