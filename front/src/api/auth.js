import axios from './axios.js';

export const registroForm = user => axios.post(`/registro`, user); 

export const loginForm = user => axios.post(`/login`, user);

export const verificarToken = () => axios.get('/verificando')

