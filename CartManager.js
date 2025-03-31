const product = require('./ProductManager.js');

class Cart
{
    static totalCarts = 0;

    constructor(id = ++Cart.totalCarts, products = [])
    {
        this.id = id;
        this.products = products;
    }

    getProducts()
    {
        return this.products;
    }

    addProduct(productId,quantity){
        this.products.push({productId,quantity});
    }

    static convertArrayToCarts(cartsData){
        let carts = [];
        if(cartsData){
            Cart.totalCarts+=cartsData.length;
            carts = cartsData.map(cart=>new Cart(cart.id,cart.products))
        }
        return carts;
    }
}

module.exports = {Cart};