//Estructura de productos
import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({ 
    nombre: {
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    inCart:{
        type:Boolean,
        default:false
    },
});

export default mongoose.model('Product', ProductoSchema)