const Usuario = require('../models/usuario');
const express = require('express');
import ChileanRutify from 'chilean-rutify';
const app = express();
app.use(express.json());

app.post((req, res) => {
    const {rut,nombre, direccion, fechaCumpleanio, correo, telefono, } = req.body
    User.create({
    rut: req.body.rut,
    correo: req.body.correo,
    }).then(user => res.json(user));
});

const createUsuario = (req,res) => {
    let errores = [""]
    var x = JSON.stringify(errores)
    const {rut,nombre, direccion, fechaCumpleanio, correo, telefono, } = req.body
    const newUsuario = new Usuario({
        rut,
        nombre,
        direccion,
        fechaCumpleanio,
        correo,
        telefono,
    })

    const validarCorreo = (correo)=>{
        let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let verificar = expReg.test(correo)
        if(!verificar){
            errores.push("El correo no es valido")
        }
    }

    validarCorreo(correo)

    const validarRut= (rut)=>{
        if(!(ChileanRutify.validRut(rut) && ChileanRutify.validRutVerifier(rut))){
            errores.push("El rut no es valido")
        }

    }

    if(!errores){
        newUsuario.save((x, usuario) => {
            if(!x){
                return res.status(400).send({x})
            }
            return res.status(201).send(usuario)
            })
    }else{
        return console.log(JSON.stringify({errores}));
    }


}

const getUsuarios = (req,res) => {
    Usuario.find({}, (error, usuarios) => {
        if(error){
            return res.status(400).send({message: "No se realizó la busqueda"})
        }
        if(usuarios.length == 0){
            return res.status(404).send({message: "No se han encontrado publicaciones"})
        }
            return res.status(200).send(usuarios)
        }
        )
    }
const updateUsuario = (req,res) => {
    const { id } = req.params
    Usuario.findByIdAndUpdate(id, req.body, (error, usuario) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo actualizar el usuario" })
        }
        if (!usuario) {
            return res.status(404).send({ message: "No se encontro el usuario" })
        }
        return res.status(200).send({ message: "Usuario modificado" })
    })

}

const deleteUsuario = (req, res) => {
    const { id } = req.params
    Usuario.findByIdAndDelete(id, req.body , (error, usuario) => {
      if(error){
        return res.status(400).send({ message: "No se pudo eliminar la publicacion"})
      }
      if(!usuario){ // no existe "!"
        return res.status(404).send({ message: "No se encontro la publicacion"})
      }
      return res.status(200).send({ message : "Se elimino correctamente la publicacion"})
    }
    )
}
module.exports = {
    createUsuario,
    getUsuarios,
    updateUsuario,
    deleteUsuario,
}