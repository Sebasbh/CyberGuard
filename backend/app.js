import express from 'express';
import db from "./database/db.js"
import FormRouter from './routers/FormRouter.js';
import cors from 'cors';
import UserRouter from './routers/UserRouter.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/form', FormRouter);
app.use('/user', UserRouter);

const PORT = process.env.PORT || 8000;

// Manejo de errores
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
