const Joi = require("joi");

class NewUser {
    constructor(userId, username, password, fName, lName, city, street) {    
    if(arguments.length === 7){      
        this.userId = userId;    
        this.username = username;    
        this.password = password;       
        this.fName = fName;    
        this.lName = lName;    
        this.city = city;    
        this.street = street;    
    }
    else if(arguments.length === 1) {
        const user = arguments[0];       
        this.userId = user.userId;          
        this.username = user.username;          
        this.password = user.password;         
        this.fName = user.fName;
        this.lName = user.lName;          
        this.city = user.city;          
        this.street = user.street;          
    }
    else
        throw "NewUser structure error";
    }

    static #validationScheme = Joi.object({  
        userId: Joi.number().min(1).required(), 
        fName: Joi.string().min(2).max(30).required(),    
        lName: Joi.string().min(2).max(30).required(),         
        username: Joi.string().min(4).max(30).required(),
        password: Joi.string().min(4).max(30).required(),
        city: Joi.string().min(4).max(30).required(),
        street: Joi.string().min(4).max(30).required()


    })

    validate() {
        const result = NewUser.#validationScheme.validate(this, {abortEarly: false});
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

module.exports = NewUser