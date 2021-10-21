const usuario=require ('./routes/usuario.routes')
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
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
var port = 3000;
app.listen(port);
console.log('Listening on port', port);


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


