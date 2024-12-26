import { useContext } from "react";
import {CartContext} from '../context/CartContext.jsx';

export const ItemCart = ({item}) => {
    const {actualizarCarrito} = useContext(CartContext);
    const {cantidad, _id} = item;

    const handleAdd = () => {
        actualizarCarrito(_id, "add", cantidad + 1);
    };

    const handleDel = () => {
        if (cantidad > 1) {
            actualizarCarrito(_id, "del", cantidad - 1);
        }
    };

    return(
        <div className="cart-item">
            <img src={item.img} alt={item.nombre} />
            <div>
                <p>{item.nombre}</p>
                <div>
                    <button onClick={handleAdd} className="add-btn">add</button>
                    <button onClick={handleDel} className="del-btn">del</button>
                </div>
                <div>
                    <div>{cantidad}</div>
                    <p>Total: ${cantidad * item.precio}</p>
                </div>
            </div>
        </div>
    )
}