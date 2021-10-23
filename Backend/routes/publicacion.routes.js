const express = require("express");
const router = express.Router();
const publicacion= require("../controllers/publicacion.controller");


router.post("/Publicar",publicacion.crearPublicacion);
router.post("/getPublicaciones", publicacion.getPublicaciones);
router.post("/getPublicacionesFiltradas",publicacion.getPublicacionesFiltradas);
router.get("/getTags",publicacion.getTags);
module.exports = router