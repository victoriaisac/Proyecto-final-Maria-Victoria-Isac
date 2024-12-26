import {z} from 'zod';

export const registroValidacion = z.object({
    nombre : z.string({
        required_error: 'El nombre es obligatorio'
    }),
    email: z.string({
        required_error:'El email es obligatorio'
    }).email({
        message: 'Email invalido'
    }),
    contraseña: z.string({
        required_error:'La contraseña es obligatoria'
    }).min(6,{
        message:'La contraseña debe tener al menos 6 caracteres'
    }),
})

export const loginValidacion = z.object({
    email: z.string({
        required_error:'Este campo es obligatorio'
    }).email({
        message: 'Email invalido'
    }),
    contraseña: z.string({
        required_error:'Este campo es obligatorio'
    }).min(6,{
        message:'La contraseña debe tener al menos 6 caracteres'
    }),
})