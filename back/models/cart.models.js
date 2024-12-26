//Estructura de carrito
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({ 
    nombre: {
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,
        required:true
    },
    cantidad:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
});

export default mongoose.model('Cart', CartSchema)