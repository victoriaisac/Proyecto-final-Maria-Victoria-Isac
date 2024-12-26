import Product from '../models/producto.models.js';
import Cart from '../models/cart.models.js';

export const getProducts = async (req,res) => {

    try {
        const products = await Product.find();
        if (products.length > 0) {
            return res.json({ products });
        } else {
            return res.status(404).json({ message: "No hay productos en el carrito" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener los productos" });
    }
};

export const getProductsCart = async (req,res) => {
    try {
        const productCart = await Cart.find();
        if (productCart.length > 0) {
            return res.json({ productCart });
        } else {
            return res.status(404).json({ message: "No hay productos en el carrito" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el carrito" });
    }   
};

export const addProductsCart = async (req,res) => {
    try {
        const { nombre, img, precio } = req.body;

        if (!nombre || !img || !precio) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const inProduct = await Product.findOne({ nombre });
        if (!inProduct) {
            return res.status(404).json({ message: "Producto inexistente" });
        }

        const enCarrito = await Cart.findOne({ nombre });
        if (enCarrito) {
            return res.status(400).json({ message: "El producto ya está en el carrito" });
        }

        const nuevoEnCarrito = new Cart({ nombre, img, precio, cantidad: 1 });
        await nuevoEnCarrito.save();

        await Product.findByIdAndUpdate(
            inProduct._id,
            { inCart: true },
            { new: true }
        );

        return res.status(201).json({ message: "Producto agregado al carrito" });
    } catch (error) {
        return res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
};

export const putProducts = async (req,res) => {
    try {
        const { productId } = req.params;
        const { query } = req.query;

        if (!query || !["add", "del"].includes(query)) {
            return res.status(400).json({ message: "Consulta inválida" });
        }

        const buscarProducto = await Cart.findById(productId);
        if (!buscarProducto) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        const nuevaCantidad = query === "add" ? buscarProducto.cantidad + 1 : buscarProducto.cantidad - 1;
        if (nuevaCantidad < 1) {
            return res.status(400).json({ message: "La cantidad no puede ser menor a 1" });
        }

        const productoActualizado = await Cart.findByIdAndUpdate(
            productId,
            { cantidad: nuevaCantidad },
            { new: true }
        );

        return res.json({
            message: `Producto ${productoActualizado.nombre} actualizado`,
            producto: productoActualizado,
        });
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

export const deleteProducts = async (req,res) => {
    try {
        const { productId } = req.params;

        const productoEnCarrito = await Cart.findById(productId);
        if (!productoEnCarrito) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        await Cart.findByIdAndDelete(productId);

        await Product.findOneAndUpdate(
            { nombre: productoEnCarrito.nombre },
            { inCart: false },
            { new: true }
        );

        return res.json({ message: `El producto ${productoEnCarrito.nombre} fue eliminado del carrito` });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el producto del carrito" });
    }
}