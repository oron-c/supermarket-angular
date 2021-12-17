const Joi = require("joi");

class CategoryModel {
    constructor(categoryId, categoryName) {    
    if(arguments.length === 2){      
        this.categoryId = categoryId;      
        this.categoryName = categoryName;      
    }
    else if(arguments.length === 1) {
        const category = arguments[0];
        this.categoryId = category.categoryId;
        this.categoryName = category.categoryName;
    }
    else
        throw "CategoryModel structure error";
    }

    static #validationScheme = Joi.object({   
        categoryId: Joi.optional(),
        categoryName: Joi.string().min(4).max(30).required(),    
    })

    validate() {
        const result = CategoryModel.#validationScheme.validate(this, {abortEarly: false});
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

module.exports = CategoryModel