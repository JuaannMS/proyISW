const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const publicacionRoutes = require('./routes/publicacionRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use('/api', publicacionRoutes);
app.use('/api', usuarioRoutes);

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB ,options, (error) => {

    if (error) {
        console.log(error);
    } else {
        console.log("Conectado con la base de datos");
    }
})

app.listen(3000, () => {
    console.log('Conexion establecida');
})