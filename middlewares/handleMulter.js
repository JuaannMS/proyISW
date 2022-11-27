const multer = require('multer');
const fs = require('fs');
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