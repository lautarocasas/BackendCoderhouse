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
}

class ProductManager
{
    constructor(productsData)
    {
        if(productsData)
            this.products = productsData;
        else
            this.products = [];
    }

    addProduct(title,description,price,thumbnails,code,stock,status,category){
        
        if(!(title&&description&&price&&thumbnails&&code&&stock&&status&&category))
            throw new Error("Missing fields on new product"); //Missing fields
        
        if(this.products.findIndex((prod)=>{return prod.code==code}) != -1)
            throw new Error("Already exists a product with that code");
        

        let newId = this.products.length+1;
        let newProd = new Product(newId,title,description,price,thumbnails,code,stock,status,category);
        this.products.push(newProd);
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
