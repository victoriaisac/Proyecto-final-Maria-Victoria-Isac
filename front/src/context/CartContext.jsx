import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const CartContext =  createContext();

export const CartProvider = ({children}) => {
    const [cartItem, setcartItem] = useState([]);
    const [products,setProducts] = useState([]);

    const getProduct = async () => {
        try {
            const {data} = await axios.get("http://localhost:4000/mdb/products");
            setProducts(data.products);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    };

    const getProductCart = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/mdb/products-cart");
            setcartItem(data.productCart);
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    };
    useEffect(()=>{
        getProduct();
        getProductCart();
    },[]);

    const agregarAlCarrito = async (product)=> {
        const { nombre, img, precio } = product;
        console.log({nombre, img,precio});
        
        try {
            await axios.post("http://localhost:4000/mdb/products-cart", { nombre, img: img.replace(/\\/g, "/"), precio });
            setcartItem((prev) => [...prev, { nombre, img, precio, cantidad: 1 }]);
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    }

    const actualizarCarrito = async (id, query, cantidad) => {
        try {
            if (query === "del" && cantidad === 1) {
                await axios.delete(`http://localhost:4000/mdb/products-cart/${id}`);
                setcartItem((prev) => prev.filter((item) => item._id !== id));
            } else {
                const updatedItem = { cantidad };
                await axios.put(
                    `http://localhost:4000/mdb/products-cart/${id}?query=${query}`,updatedItem);
                setcartItem((prev) =>
                        prev.map((item) =>
                            item._id === id ? { ...item, cantidad: updatedItem.cantidad } : item
                        )
                    );
            } ;
        }catch (error) {
                    console.error("Error al actualizar el carrito:", error);
                }
        
                
        } 
        const addProductsCart = async (req, res) => {
            try {
                console.log("Cuerpo recibido:", req.body);
        
                const { nombre, img, precio } = req.body;
        
                if (!nombre || !img || !precio) {
                    return res.status(400).json({ message: "Todos los campos son obligatorios" });
                }
            } catch (error) {
                console.error("Error en el servidor:", error);
                res.status(500).json({ error: "Error al agregar producto al carrito" });
            }
        };
    return(
        <CartContext.Provider
        value={{cartItem,
            products,
            agregarAlCarrito,
            actualizarCarrito,
            addProductsCart
        }}
        >
            {children}
        </CartContext.Provider>
    )


}