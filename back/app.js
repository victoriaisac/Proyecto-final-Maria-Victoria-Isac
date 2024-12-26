import express, { json } from 'express'
import morgan from 'morgan'
import cookie from 'cookie-parser';
import cors from 'cors';

import authRoutes from "./rutas/auth.routes.js";
import productRutas from "./rutas/productos.routes.js";

const app = express();
app.use(express.json())

app.use(morgan('dev'))
app.use(cookie())
app.use(cors(
    {origin: 'http://localhost:3000',
    credentials: true
    }
));

app.use('/mdb',authRoutes)
app.use('/mdb', productRutas)


export default app
