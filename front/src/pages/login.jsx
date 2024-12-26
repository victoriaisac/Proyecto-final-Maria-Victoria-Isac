import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {

    const {register,handleSubmit,formState:{errors},} = useForm();
    const {registerIn, errores,autenticado}= useAuth();
    const navigate = useNavigate()
    
    const onSubmit = handleSubmit( (data) =>{
        console.log("Enviando datos al backend:", data);
        registerIn(data);
        
    });

    useEffect(()=>{
        if(autenticado) {
            navigate('/perfil');}
    },[autenticado,navigate]);

    return(
        <div className="login">
            {errores.map((error, i)=>(
                <div className="advertencia" key={i}>{error}</div>
            ))}
        
            <form onSubmit={ onSubmit} className="login-box"> 
                <div className="login-header">
                    <header>Login</header>
                </div>

                <div className="input-box">
                    <input type="email" 
                    className="input-item"
                    {...register('email', {required:true})}
                    placeholder="Email"/>
                    {errors.email &&(
                        <p className="advertencia">El email es obligatorio</p>
                    )}
                </div>

                <div className="input-box">
                    <input type="password" className="input-item"
                    {...register('contraseña', {required:true})}
                    placeholder="Contraseña"/>
                    {errors.contraseña &&(
                        <p className="advertencia">La contraseña es obligatoria</p>
                    )}
                </div>

                <div className="input-submit">
                    <button type="submit" className="submit-btn">Login</button>
                </div>

                <div className="register-link">
                    <p className="text-link">¿No tienes una cuenta?
                        <Link to="/register" className="register">Registrate</Link>
                    </p>
                </div>
            </form>
        </div>
    )
};

export default Login;