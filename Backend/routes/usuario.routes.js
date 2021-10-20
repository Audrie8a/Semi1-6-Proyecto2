const express = require("express");
const router = express.Router();
const usuario= require("../controllers/usuario.controllers");

router.post("/getUser",usuario.getUsuario);
router.post("/Sugerencias",usuario.getSugerencias)
router.post("/Amigos",usuario.getAmigos)
router.post("/Solicitudes",usuario.getSolicitudes)
router.post("/adminFriends",usuario.manageFriends)
router.get("/Prueba",usuario.Prueba)




//-------------------------------------------------PROYECTO2------------------------------------------------------

router.post("/RegistroCognito", usuario.registroCognito)
router.post("/LoginCognito", usuario.IngresarCognito)

module.exports = router