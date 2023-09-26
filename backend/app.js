import express from 'express';
import db from "./database/db.js";
import cors from 'cors';
import {createSecurityLogMiddleware} from "./middleware/securityMiddlewares.js"
import FormRouter from './routers/FormRouter.js';
import UserRouter from "./routers/UserRouter.js"
import SecurityRouter from "./routers/SecurityRouter.js"
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
/* app.set('trust proxy', true); */ 

app.use('/form', /* checkIPBlocked, ¡*/createSecurityLogMiddleware, FormRouter);
app.use('/user', createSecurityLogMiddleware, UserRouter);
app.use('/security', SecurityRouter)

const PORT = process.env.PORT || 8000;

// Manejo de errores
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
