import { Router } from "express";
import { getProducts,addProductsCart,getProductsCart,putProducts,deleteProducts } from "../controles/productos.controlers.js";


const rutasProd = Router();

rutasProd.get('/products', getProducts);
rutasProd.get('/products-cart',getProductsCart)

rutasProd.post('/products-cart', addProductsCart);

rutasProd.put('/products-cart/:productId',putProducts);

rutasProd.delete('/products-cart/:productId',deleteProducts);


export default rutasProd