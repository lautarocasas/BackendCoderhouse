const PORT = 8080;
const PATH_PRODUCTS = './products.json';
const PATH_CARTS = './carts.json';

const fm = require('./FilesManager.js');
const pm = require('./ProductManager.js');

const products = new pm.ProductManager(fm.openJsonFile(PATH_PRODUCTS));
const express = require('express');
const app = express();


const carts = fm.openJsonFile(PATH_CARTS);

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

app.listen(PORT,()=>{
    console.log(`Funcionando en http://localhost:${PORT}`);
})