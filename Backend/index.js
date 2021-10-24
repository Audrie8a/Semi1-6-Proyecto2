const usuario=require ('./routes/usuario.routes')
<<<<<<< Updated upstream
const Publicacion= require('./routes/publicacion.routes')
=======
const chat = require ('./routes/chat.routes')
>>>>>>> Stashed changes
const aws_keys= require('./Keys/creds');
const SubirImagen=require('./routes/upload.routes');

var express = require('express');
const ejs=require('ejs');
const morgan=require('morgan');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');



var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
const { uuid } = require('uuidv4');
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
var http = require('http').Server(app);
var io   = require('socket.io')(http);
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
var port = 3000;

app.use(morgan('dev'))

// //instanciamos el sdk
// var AWS = require('aws-sdk');
// const s3 = new AWS.S3(aws_keys.s3);
// const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);

//Rutas
app.get('/', function(req,res){
res.send("Bienvenido!")
});


//app.use("/",usuario);
app.use('/Inicio',usuario)
<<<<<<< Updated upstream
app.use('/Publicacion',Publicacion)
=======
app.use('/Chat', chat)

app.get("/ElChat", function(req, res){
    const {user} =req.body;
    console.log(user);
    res.sendFile(__dirname + '/views/chat.html');
})

io.on('connection', function(socket) {
    console.log('New user connected');
    socket.on('nuevo mensaje', function(msj) {
      io.emit('nuevo mensaje', msj);
    });

    socket.on('disconnect', function() {
      console.log('Usuario desconectado');
    });
     
});
>>>>>>> Stashed changes

http.listen(port, function() {
    console.log('listening on *:3000');
});

