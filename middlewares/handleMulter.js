const multer = require('multer');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const Publicacion = require('../models/publicacion');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const { id } = req.params;
        const route = `./uploads/${id}`;

     //   const route = './uploads/' + req.params.archivo;
        if (!fs.existsSync(route)) {
            fs.mkdirSync(route, { recursive: true });
        }
        cb(null, route);
    },
    filename: function (req, file, cb) {
        let fecha = new Date();
        fecha = fecha.getFullYear() + '_' + (fecha.getMonth() + 1) + '_' + fecha.getDate() + '_' + fecha.getHours() + '_' + fecha.getMinutes() + '_' + fecha.getSeconds()
        const nameFile = fecha + ' ' + file.originalname
        cb(null, nameFile);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        let valido = true
        try{
            let objId = new ObjectId(""+req.params.id);
            Publicacion.findById(objId, (error, publicacion) => {
                if (error) {
                    valido = false
                }
                if (!publicacion) {
                    valido = false
                }
            })
        } catch(err) {
            if (err.name === 'BSONTypeError'){
                valido = false
            }
        }
        const formatosValidos = ['image/jpeg', 'image/png', 'image/jpg']
        if (formatosValidos.indexOf(file.mimetype) === -1)//no existe
        {
            valido = false
        }
        cb(null, valido)
    },
    limits: {
        fileSize: 1024 * 1024 * 30//30mb,
        
    }
})

module.exports = upload;