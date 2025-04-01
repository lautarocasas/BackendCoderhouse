const PORT = 8080;
const PATH_PRODUCTS = './products.json';
const PATH_CARTS = './carts.json';

const fm = require('./FilesManager.js');
const pm = require('./ProductManager.js');
const cm = require('./CartManager.js');

const products = new pm.ProductManager(fm.openJsonFile(PATH_PRODUCTS));
const carts = cm.Cart.convertArrayToCarts(fm.openJsonFile(PATH_CARTS));

const express = require('express');
const app = express();


app.use(express.json());


// Listar todos los productos
app.get('/api/products',(req,res)=>{
    res.status(200).send(products.getProducts());
});


//Listar el producto con el id proporcionado
app.get('/api/products/:pid',(req,res)=>{
    const {pid} = req.params;
    const foundProduct = products.getProductById(pid);

    if(foundProduct != undefined)
        res.status(200).send(foundProduct)
    else
        res.status(404).send(`El producto con id: ${pid} no existe.`);
})

//Agregar un nuevo producto
app.post('/api/products',(req,res)=>{
    const {title,description,price,thumbnails,code,stock,status,category} = req.body;
    try{
        products.addProduct(title,description,price,thumbnails,code,stock,status,category);
        fm.writeJsonFile(PATH_PRODUCTS,products.getProducts());
        res.status(201).send(`Product with code ${code} created`);        
    }catch(error){
        res.status(400).send(error.message);
    }
})


app.put('/api/products/:pid',(req,res)=>{
    const pid = Number(req.params.pid);
    const updates = req.body;
    
    try{
        products.updateProductById(pid,updates);
        fm.writeJsonFile(PATH_PRODUCTS,products.getProducts());
        res.status(200).send(`Producto con id ${pid} actualizado exitosamente`);
    }catch(error){
        res.status(400).send(error.message);
    }    
})

app.delete('/api/products/:pid',(req,res)=>{
    const pid = Number(req.params.pid);
    
    try{
        products.deleteProductById(pid);
        fm.writeJsonFile(PATH_PRODUCTS,products.getProducts());
        res.status(200).send(`Producto con id ${pid} eliminado exitosamente`);
    }catch(error){
        res.status(400).send(error.message);
    }    
});


//Rutas para Manejo de Carritos (/api/carts/)
app.post('/api/carts',(req,res)=>{
    try{
        carts.push(new cm.Cart());
        fm.writeJsonFile(PATH_CARTS,carts);
        res.status(200).send(`New cart created succesfully`);
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.get('/api/carts/:cid',(req,res)=>{
    const cid = Number(req.params.cid);

    if(cid>carts.length || cid<1)
        return res.status(404).send('Error: Id out of range');
    if(isNaN(cid))
        return res.status(400).send('Error: Id is not a number');

    res.status(200).send(carts[cid-1]);
})

app.post('/api/carts/:cid/product/:pid',(req,res)=>{
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);

    if(cid>carts.length || cid<1)
        return res.status(404).send('Error: cid out of range');
    if(isNaN(cid))
        return res.status(400).send('Error: cid is not a number');

    try{
        carts[cid-1].addProduct(pid,1);
        fm.writeJsonFile(PATH_CARTS,carts);
        res.status(200).send(`Product with id ${pid} added succesfully to cart with id ${cid}`);
    }catch(error){
        res.status(500).send(error.message);
    }
})

app.listen(PORT,()=>{
    console.log(`Funcionando en http://localhost:${PORT}`);
})