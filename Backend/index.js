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

//instanciamos el sdk
var AWS = require('aws-sdk');
const s3 = new AWS.S3(aws_keys.s3);
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);


app.post("/api/login", async (req, res) => {
  var crypto = require('crypto');
  var hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
  var authenticationData = {
      Username: req.body.username,
      Password: hash+"D**"
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
  );
  var userData = {
      Username: req.body.username,
      Pool: cognito,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');

  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          // User authentication was successful
          res.json(result); //
      },
      onFailure: function (err) {
          // User authentication was not successful
          res.json(err);
      },
      mfaRequired: function (codeDeliveryDetails) {
          // MFA is required to complete user authentication.
          // Get the code from user and call
          cognitoUser.sendMFACode(verificationCode, this);
      },
  });
});



app.post("/api/signup", async (req, res) => {
  var attributelist = [];

  var dataname = {
      Name: 'name',
      Value: req.body.name,
  };
  var attributename = new AmazonCognitoIdentity.CognitoUserAttribute(dataname);

  attributelist.push(attributename);

  var dataemail = {
      Name: 'email',
      Value: req.body.email,
  };
  var attributeemail = new AmazonCognitoIdentity.CognitoUserAttribute(dataemail);

  attributelist.push(attributeemail);


 

  cognito.signUp(req.body.username, req.body.password, attributelist, null, async (err, data) => {
      
      if (err) {
          console.log(err);

          res.json(err.message || err);
          return;
      }
      console.log(data);
      res.json(req.body.username+' registrado');
  });
});














app.post('/subirfoto', function (req, res) {

  var id = req.body.id;
  var foto = req.body.foto;
  //carpeta y nombre que quieran darle a la imagen

  var nombrei = "fotos/" + id +uuid()+ ".pdf";
  //se convierte la base64 a bytes
  let buff = new Buffer.from(foto, 'base64');
  const params = {
    Bucket: "appweb-6p1",
    Key: nombrei,
    Body: buff,
    ContentType: "image",
    ACL: 'public-read'
  };
  const putResult = s3.deleteObject(params).promise();
  res.json({ mensaje: putResult })
  //console.log(id,foto)



});
app.post('/eliminar2', function (req, res) {

  var id = req.body.id;
  //carpeta y nombre que quieran darle a la imagen

  var nombrei = id;
  //se convierte la base64 a bytes
  const params = {
    Bucket: "appweb-6p1",
    Key: nombrei
  };
  const putResult = s3.deleteObject(params).promise();
  res.json({ mensaje: putResult })
  //console.log(id,foto)



});



//subir pdf en s3
app.post('/subirfile2', function (req, res) {

  var nombre = req.body.nombre;
  var pdf = req.body.pdf;  //base 64
  //carpeta y nombre que quieran darle al pdf
  var nombrei = "files/" + nombre +uuid()+ ".pdf";
  //se convierte la base64 a bytes
  let buff = new Buffer.from(pdf, 'base64');
  const params = {
    Bucket: "appweb-6p1",
    Key: nombrei,
    Body: buff,
    ACL: 'public-read'
  };

  s3.upload(params, function sync(err, data) {
     if (err) {
       res.status(500).send(err)
     } else {
      console.log(data.Location);  
      res.status(200).send(data);
                        
   }}); 


});




//Rutas
app.get('/', function(req,res){
res.send("Bienvenido!")
});



//app.use("/",usuario);
app.use('/Inicio',usuario)


