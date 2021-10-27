const express = require("express");
const router = express.Router();
const chat = require("../controllers/chat.controller");

router.get("/Probando", chat.Prueba);
router.post("/ident",chat.identi);

//-------------------------------------------------PROYECTO2------------------------------------------------------

module.exports = router