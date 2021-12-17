const dal = require("../data-access-layer/dal");
const path=require("path");
const uuid=require("uuid");

// Categories
function getAllCategoriesAsync() {
    return dal.executeQueryAsync(`select * from category`);
}


// Products
function getAllProductsAsync() {
    return dal.executeQueryAsync(`select * from products`);    
}

function getProductsByCategoryIdAsync(categoryId) {
    return dal.executeQueryAsync(`select * from products where categoryId = ?`, [categoryId]);
}

function getProductByIdAsync(productId) {
    return dal.executeQueryAsync(`select * from products where productId = ?`, [productId]);
}

function getProductByNameAsync(productName) {
    return dal.executeQueryAsync(`select * from products where productName like ?`, ['%'+ productName +'%']);
}

async function addProductAsync(productToAdd, image) {
    image.name = uuid.v4() +".jpg";
    const absolutePath = path.join(__dirname, "..", "images", image.name);
    await image.mv(absolutePath); 
    return dal.executeQueryAsync(`insert into products values(
        null,
        ?,
        ?,
        ?,
        ?
    )`, [productToAdd.productName, productToAdd.categoryId, productToAdd.price, image.name]);
}

async function editProductAsync(productIdToEdit, productToEdit, image) {
    if(image) {
        image.name = uuid.v4() +".jpg";
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath); 
    }
    else {
        image = {name: productToEdit.image}
    }
 
    return dal.executeQueryAsync(`update products set
        productName = ?,
        categoryId = ?,
        price = ?,
        image = ?
        where productId = ?
    `, [productToEdit.productName, productToEdit.categoryId, productToEdit.price, image.name, productIdToEdit]);
}


module.exports = {
    getAllCategoriesAsync,
    addProductAsync,
    getAllProductsAsync,
    getProductsByCategoryIdAsync,  
    getProductByIdAsync,
    getProductByNameAsync,
    editProductAsync,  
}