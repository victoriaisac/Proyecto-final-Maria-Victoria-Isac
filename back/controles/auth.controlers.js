import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registro = async (req,res) => {
    
    const {nombre,email,contraseña} = req.body;
    
    try {

        const buscarUsuario = await User.findOne({email})
        if(buscarUsuario) return res.status(400).json( ["El email ya ha sido utilizado"])

        const hash = await bcrypt.hash(contraseña, 10)

        const newUser = new User({
            nombre,
            email,
            contraseña: hash,
        })
        const Usuario = await newUser.save();

        jwt.sign({id:Usuario._id,},
            "secret",{expiresIn: "1d",},
            (err, token) => {
                if(err) return res.status(500).json({ message: "Error al generar token" });
                res.cookie('token', token);
                res.json({id:Usuario._id,
                    nombre:Usuario.nombre,
                    email:Usuario.email,
                }) 
                
            }
        )
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
} 

export const login = async (req,res) => {
    
    const {email,contraseña} = req.body;
    
    try {

        const encontrarUsuario = await User.findOne({email});
        if (!encontrarUsuario) return res.status(400).json({message:"Usuario no encontrado"}) 

        const compare = await bcrypt.compare(contraseña, encontrarUsuario.contraseña)
        if(!compare) return res.status(400).json({message:"Contraseña incorrecta"})

        jwt.sign({id:encontrarUsuario._id,},
            "secret",{expiresIn: "1d",},
            (err, token) => {
                if(err) return res.status(500).json({ message: "Error al generar token" });
                console.log("Token generado:", token);
                res.cookie('token', token, {
                    httpOnly: true, 
                    sameSite: "strict",
                    secure: "secret",});
                res.json({id:encontrarUsuario._id,
                    nombre:encontrarUsuario.nombre,
                    email:encontrarUsuario.email,
                }) 
                
            }
        )
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
} 

export const logout = (req,res) =>{
    res.cookie("token", "",
        {}  
    );
    return res.sendStatus(200);
};

export const perfil = async (req,res) =>{
try {
    const usuarioEncontrado = await User.findById(req.user.id)
    if (!usuarioEncontrado) return res.status(400).json({message: "usuario no encontrado"});

    return res.json({
        id:usuarioEncontrado._id,
        nombre:usuarioEncontrado.nombre,
        email:usuarioEncontrado.email,
    });
} catch (error) {
    res.status(500).json({ message: error.message });
}

};

export const verificar = async (req,res) => {
    const token = req.cookies.token; 
    if(!token) return res.status(401).json({message: "Sin autorizacion para ingresar"});
        
    jwt.verify(token, "secret", async (err,user) =>{
        if(err) return res.status(401).json({message:"Sin autorizacion"});

        const EncontrarUser = await User.findById(user.id) 
        if(!EncontrarUser) return res.status(401).json({message:"Sin autorizacion"});
        
            return res.json({
                id:EncontrarUser._id,
                nombre:EncontrarUser.nombre,
                email:EncontrarUser.email,
            });
    })
    
}
