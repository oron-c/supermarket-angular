const Joi = require("joi");

class ProductModel {
    constructor(productName, categoryId, price, image) {    
    if(arguments.length === 4){      
        this.productName = productName;    
        this.categoryId = categoryId;       
        this.price = price;    
        this.image = image;       
    }
    else if(arguments.length === 1) {
        const product = arguments[0];       
        this.productName = product.productName;          
        this.categoryId = product.categoryId;         
        this.price = product.price;
        this.image = product.image;                  
    }
    else
        throw "NewUser structure error";
    }

    static #validationScheme = Joi.object({   
        productName: Joi.string().min(2).max(30).required(),    
        categoryId: Joi.number().min(1).required(),         
        price: Joi.number().min(0.1).required(),
        image: Joi.allow(),
    })

    validate() {
        const result = ProductModel.#validationScheme.validate(this, {abortEarly: false});
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

module.exports = ProductModel