const express = require('express');
const api = express.Router();
const rol = require('../models/rol');

/*Crea los roles de user y admin
una sola vez en la bdd*/

/*#####################################

Roles creados:
 name  | id
 admin   638d815d66c83a4f9e0f2e20
 user    638d75db5792a7fe98e9cb9e

######################################*/



const createRoles = async (req, res) => {
    const{ name } = req.body
    const newRol = new rol({name})

    newRol.save((error, rol)=>{
        if(error){return res.status(400).send({ message: "No se pudo crear el rol" })}
    return res.status(201).send(rol)
    })
}

const usuario = require('../models/usuario');
const getRoles = async (req, res) => {
    const {id} = req.body
   /*  usuario.findById(id, (error, usuario) => {
        if (error) {
          return res.status(204).send({ message: "error al buscar al usuario" })
        }
        if (!usuario) {
          return res.status(404).send({ message: "No se ha encontrado el usuario" })
        }
        return res.status(200).send(usuario.rol)
      }) */

  const userfound = usuario.findById(id);

  rol.findById({id: userfound.rol}, (error, rol) => {
    return res.status(201).send(rol.name)
  })
}

api.post('/rol/', createRoles);
api.get('/roles', getRoles);
module.exports = api
