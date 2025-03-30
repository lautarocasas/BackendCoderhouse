class Product
{   
    constructor(id,title,description,price,thumbnails,code,stock,status,category)
    {
        this.id =id;
        this.title=title;
        this.description=description;
        this.price=price;
        this.thumbnails=thumbnails;
        this.code=code;
        this.stock=stock;
        this.status = status;
        this.category = category;
    }

    update(updates){
        for (let key in updates) {
            if (updates[key] !== undefined && key !== 'id' && this.hasOwnProperty(key)) 
                this[key] = updates[key];
        }
    }

    static convertArrayToProducts(productsData) {
        return productsData.map(productData => new Product(
            productData.id,
            productData.title,
            productData.description,
            productData.price,
            productData.thumbnails,
            productData.code,
            productData.stock,
            productData.status,
            productData.category
        ));
    }
}

class ProductManager
{
    constructor(productsData)
    {
        if(productsData)
            this.products = Product.convertArrayToProducts(productsData);
        else
            this.products = [];
    }

    addProduct(title,description,price,thumbnails,code,stock,status,category)
    {
        
        if(!(title&&description&&price&&thumbnails&&code&&stock&&status&&category))
            throw new Error("Missing fields on new product"); //Missing fields
        
        if(this.products.findIndex((prod)=>{return prod.code==code}) != -1)
            throw new Error("Already exists a product with that code");
        

        let newId = this.products.length+1;
        let newProd = new Product(newId,title,description,price,thumbnails,code,stock,status,category);
        this.products.push(newProd);
    }

    updateProductById(id,updates){
        if(isNaN(id))
            throw new Error('Id is not a number');
        if(id>this.products.length || id<1)
            throw new Error('Id out of range');

        this.products[id-1].update(updates);
    }

    deleteProductById(id){
        if(isNaN(id))
            throw new Error('Id is not a number');
        if(id>this.products.length || id<1)
            throw new Error('Id out of range');

        this.products.splice(id-1,1);
    }


    getProducts()
    {
        return this.products;
    }

    getProductById(id)
    {
        return this.products.find((prod)=>{return prod.id==id});
    }
}

module.exports = {ProductManager}
