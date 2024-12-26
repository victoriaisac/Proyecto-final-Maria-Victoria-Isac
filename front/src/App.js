
import Register from './pages/registro.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {AuthProvider} from './context/authContext.js';
import Login from './pages/login.jsx';
import Home from './pages/home.jsx';
import Users from './pages/users.jsx';
import Error from './pages/error.jsx';
import ContextoUsers from './contextoUsers.jsx';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  return (
    <>
    <CartProvider>
    <AuthProvider>
    <Routes>
      <Route path='/Login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<Error/>} />
      <Route path='/perfil' element={<Users/>} />

      <Route element={ <ContextoUsers/> }>
      
      </Route> 
    </Routes>
    </AuthProvider>
    </CartProvider>
    </>
  );
}

export default App;
