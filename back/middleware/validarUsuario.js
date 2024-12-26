import jwt from 'jsonwebtoken';

export const authRequire = (req,res,next) => {
    const {token} = req.cookies 
    if (!token) return res.status(401).json({message:"no autorizado"})

    jwt.verify(token,"secret", (err,user) =>{
        if(err) return res.status(401).json({message: "invalido"});

        req.user = user
        
    })
    next();
}