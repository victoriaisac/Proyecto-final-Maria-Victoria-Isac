import {useForm} from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Register = () => {

    const {register,handleSubmit, formState:{errors},} = useForm();
    const {registerOn, autenticado, errores} = useAuth()
    const navegacion = useNavigate()

    useEffect(() =>{
        if(autenticado) {navegacion("/login")}
    }, [autenticado,navegacion] )

    const onSubmit = handleSubmit(async (values) =>{registerOn(values)})

    return(
        <div className="login">
            {errores.map((error, i)=>(
                <div className="advertencia" key={i}>{error}</div>
            ))}
            <form onSubmit={ onSubmit} className="login-box">
                <div className="login-header">
                    <header>Registro</header>
                </div>

                <div className="input-box">
                    <input type="text"
                    className="input-item"
                    {...register('nombre', {required:true})}
                    placeholder="Nombre"/>
                    {errors.nombre &&(
                        <p className="advertencia">El nombre es obligatorio</p>
                    )}
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
                <input type="password" 
                className="input-item"
                {...register('contraseña', {required:true})}
                placeholder="Contraseña"/>
                {errors.contraseña &&(
                    <p className="advertencia">La contraseña es obligatoria</p>
                )}
                </div>

                <div className="input-submit">
                    <button type="submit" className="submit-btn">Registrarme</button>
                </div>

                <div className="register-link">
                <p className="text-link">¿Ya tienes una cuenta?
                <Link to="/login" className="register">Logueate</Link>
            </p>
            </div>
            </form>
        </div>
    )
};

export default Register;