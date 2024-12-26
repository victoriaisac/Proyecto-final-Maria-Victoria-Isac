import { createContext, useContext, useEffect} from "react";
import { useState } from "react";
import { registroForm, loginForm,verificarToken } from '../api/auth.js';
import Cookie from 'js-cookie';

export const authContext = createContext();

export const useAuth = () =>{
    const contexto = useContext(authContext);
    if(!contexto){
        throw new Error('useAuth fuera del authprovider')
    } else return contexto
}

export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null);
    const [autenticado,setAutenticado] = useState(false);
    const [errores, setErrores] = useState([]);
    const [loading, setLoading] = useState(true)
    

    const registerOn = async (user) =>{
        try {
            const res = await registroForm(user);
            console.log(res.data);
            setUser(res.data)
            setAutenticado(true)
        } catch (error) {
            if (error.response?.data) {
                setErrores(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message]);
            } else {
                setErrores(["Error desconocido al registrar usuario"]);
            }
            
        }
    }

    const registerIn = async (user) =>{
        try {
            const res = await loginForm(user)
            console.log(res);
            setAutenticado(true)
            setUser(res.data)
            
        } catch (error) {
            if (error.response?.data) {
                setErrores(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message]);
            } else {
                setErrores(["Error desconocido al iniciar sesión"]);
            }
        }
    }

    const logout = () =>{
        Cookie.remove('token');
        setAutenticado(false);
        setUser(null)
    }

    useEffect(() => {
        if(errores.length > 0){
            const timer= setTimeout(() =>{
                setErrores([])
            },5000)
            return () => clearTimeout(timer)
        }
    },[errores])

    useEffect(() => {   
        const IngresaLogin = async () => {
            const token = Cookie.get("token");
            if (!token) {
                setAutenticado(false);
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                const res = await verificarToken(token);
                if (res.data) {
                    setUser(res.data);
                    setAutenticado(true);
                    setLoading(true);
                    
                } else {
                    setAutenticado(false);
                    setUser(null);
                }
            } catch (error) {
                setAutenticado(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        IngresaLogin();
    }, []);

    return (
        <authContext.Provider value={{
            registerOn,
            registerIn,
            logout,
            loading,
            user,
            autenticado,
            errores
        }}>
            {children}
        </authContext.Provider>
    )
}
