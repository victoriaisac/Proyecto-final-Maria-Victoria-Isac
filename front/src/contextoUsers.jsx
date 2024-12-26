import { useAuth } from "./context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ContextoUsers = () =>{
    const {loading,autenticado} = useAuth();
    console.log(loading,autenticado);

    if(loading) {return <h1>Cargando pagina...</h1>}
    
    if(!autenticado) return <Navigate to= "/login" replace/>
    return(
        <Outlet  /> 
    )
};
export default ContextoUsers;