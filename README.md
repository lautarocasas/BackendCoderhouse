# API E-Commerce
Para ejecutar el proyecto, es necesario instalar las dependencias necesarias
`npm install`
Una vez instalado, iniciar el servidor:
`node server.js`
## Endpoints para manejo de productos
- GET /api/products
- GET /api/products/:pid
- POST /api/products
- PUT /api/products/:pid
- DELETE /api/products/:pid
## Endpoints para manejo de carritos
- POST /api/carts
- GET /api/carts/:cid
- POST /api/carts/:cid/product/:pid
