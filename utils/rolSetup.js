const express = require('express');
const { db } = require('../models/rol');
const api = express.Router();
const rol = require('../models/rol');
const usuario = require('../models/usuario');

/*#####################################
Roles creados:
   name   | id
   admin    638e8c823fdb04c7747adbe8
   user     638d75db5792a7fe98e9cb9e

Admin creados:
rut: 19.896.942-7
nombre: Gabriel Norambuena Muñoz
######################################*/


/*Crea los roles de user y admin
una sola vez en la bdd*/
const createRoles = async (req, res) => {
    const{ name } = req.body
    const newRol = new rol({name})

    const number = await rol.countDocuments({name});
    //si no existe -> se crea
    if(number == 0){
      newRol.save((error, rol)=>{
      if(error){
        return res.status(400).send({ message: "No se pudo crear el rol" })
      }
    return res.status(201).send(rol)})}

    //si existe:
    if(number != 0){
    return res.status(200).send({ message: "roles ya creados" })}
}


const getRolFromUser = async (req, res) => {

  //recibe id del usuario
  const {id} = req.body

  const User = await usuario.findById(id);
  const Rol = await rol.find({_id: { $in: User.rol}});

  //Devuelve el rol (id del rol y nombre)
  return res.status(200).send(Rol)
}


const getALLRoles = (req, res) => {
  rol.find({}, (error, roles) => {
    if(error){
        return res.status(400).send({message: "No se realizó la busqueda"})
    }
    if(!roles){
        return res.status(204).send({message: "No se han encontrado roles"})
    }
   return res.status(200).send(roles)})
}

api.post('/rol', createRoles);
api.get('/rol/user', getRolFromUser);
api.get('/rol/all', getALLRoles);

module.exports = api
