const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const publicacionRoutes = require('./routes/publicacionRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const mailerController = require ('./routes/mailerRoutes');
const fileRoutes = require('./routes/fileRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/api', publicacionRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', mailerController);
app.use('/api', fileRoutes);
app.use('/api', reporteRoutes);

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

app.listen(process.env.PORT, () => {
    console.log('Conexion establecida');
})