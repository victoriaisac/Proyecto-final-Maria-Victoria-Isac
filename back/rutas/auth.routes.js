import {Router} from 'express';
import { registro, login, logout, perfil } from '../controles/auth.controlers.js';
import { authRequire } from '../middleware/validarUsuario.js';
import { schemaValidador } from '../middleware/validarCampos.js';
import { registroValidacion, loginValidacion } from '../validacion/auth.validacion.js';
import { verificar } from '../controles/auth.controlers.js';

const rutas = Router()

rutas.post('/registro', schemaValidador(registroValidacion), registro);
rutas.post('/login',schemaValidador(loginValidacion), login);
rutas.post('/logout', logout);
rutas.get('/perfil',authRequire,perfil)

rutas.get('/verificando', verificar)



export default rutas
