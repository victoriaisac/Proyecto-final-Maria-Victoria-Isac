import { useAuth } from "../context/authContext";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import {CartContext} from '../context/CartContext.jsx'
import { ItemCart } from "./cart.jsx";
import imgSeg from '../imagenes/seccion-user.png'


const Users = () => {
    const {user, logout} = useAuth();
    console.log(user);
    
    const {agregarAlCarrito, products,cartItem} = useContext(CartContext);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCart = () => {
        setIsCartVisible((prev) => !prev); 
    };

    const cartQuantity = cartItem.reduce((total, item) => total + item.cantidad, 0);
    return(

        <>
        <header>
        <div className="cart-icon-container" onClick={toggleCart}>
                    <i className="icon-cart"></i>
                    {cartQuantity > 0 && <span className="cart-count">{cartQuantity}</span>}
        </div>

        {isCartVisible && (
                    <div className="cart-container">
                        <h2>Shopping Cart</h2>
                        {cartItem.length > 0 ? (
                            cartItem.map((item) => <ItemCart key={item._id} item={item} />)
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                )}
        </header>

        <div className="seccion-principal-user">
            <h1 className="titulo">ANISSA & TAM</h1>
            <h2 className="seccion-principal-titulo">Your dream in jewelry  form</h2>
            <div className="login-home">
                <Link to="/" onClick={() => logout()} className="link-login-home">LogOut</Link>
            </div>
        </div>


            <div className="contenedor">
                <h1 className="contenedor-titulo">Upcoming Collection</h1>
                <div className="contenedor-product">
                    {products && products.map((product,i) => (
                            <div key={i} className="contenedor-product-cart">
                                <img src={product.img} alt={product.nombre} className="product-img"/>
                                
                                <div className="contenedor-product-item">
                                    <p className="product-p-nombre">{product.nombre}</p>
                                    <p className="product-p-precio">${product.precio}</p>
                                </div>
                                {!product.inCart?(
                                    <button onClick={() =>agregarAlCarrito(product)} className="contenedor-product-btn">ADD</button>
                                ) :(<button className="contenedor-product-btn">In Car</button>)
                                }
                            </div>
                            ))}
                </div>
            </div>

        <div className="seccion-secundaria">
            <div className="contenedor-secundario-texto">
                <h1 className="titulo-secundario">Bringing your vision to life</h1>
                <p className="texto-secundario">We believe that each piece of jewelry has a unique and personal purpose. 
                We work with you to transform your ideas into pieces that reflect your style and essence. 
                With dedication and skill, we shape your vision, creating jewelry that authentically tells your story.</p>
            </div>
            <div className="contenedor-secundario-img">
                <img src={imgSeg} alt="set joyas" />
            </div>
        </div>
        
        </>    
    )
};

export default Users;