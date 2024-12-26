//Estructura de usuario
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nombre: {
        type : String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true, 
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    }
})

export default mongoose.model('User', UserSchema)