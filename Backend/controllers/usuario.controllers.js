const bd = require('../BD/connectionLocal');


const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var crypto=require('crypto');
const aws_keys= require('../Keys/creds');
var AWS = require('aws-sdk');
const s3 = new AWS.S3(aws_keys.s3);
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);
const rek = new AWS.Rekognition(aws_keys.rekognition);
const { uuid } = require('uuidv4');

exports.Prueba = async (req, res) => {
    bd.query(`SELECT * FROM usuario`, function(err, result){
        if(err) throw err;
        return res.json(result);
    });
}

 
exports.getUsuario =async(req,res)=>{
    try {
       const {idUser}= req.body
       let sql = `select * from usuario as u where idUser=${idUser}`;
       
       bd.query(sql, function(err, result){
            if(err) throw err;
            if(result.length!=0){
                result[0].foto="https://appweb-6p1.s3.us-east-2.amazonaws.com/"+result[0].foto
                return res.json(result[0]);                   
            }else{
                return res.json("false");
            } 
        }); 
   
       
    } catch (error) {
        console.log("Error al loguearse  => ", error)
        res.json("error")
    }
}

exports.manageFriends =async(req,res)=>{
    try {
       const {user1, user2, tipo}= req.body
       let sql = "";
       if(tipo==1){ //Eliminar o rechazar Amigo
           sql=`delete from amigo where user1 =${user1} and user2=${user2} or user1=${user2} and user2=${user1}`;
       }else if (tipo==0){// Aceptar solicitud
           sql=`update amigo SET estado=0 where user1=${user1} and user2=${user2} or user1=${user2} and user2=${user1}`;
       }else { //Enviar solicitud
           sql=`insert into amigo values(${user1},${user2},2)`;
       }
       
       bd.query(sql, function(err, result){
            if(err) throw err;
            res.json("Acción ejecutada correctamente!");
        });

       
    } catch (error) {
        console.log("Error al ejecutar acción Amigo  => ", error)
        res.json("error")
    }
}

exports.getSugerencias =async(req,res)=>{
    try {
        const {idUser, Usuario, tipo}= req.body
        let sql ="";
        if(tipo==0){//Obtener Sugerencias
            sql= `select idUser, Concat(nombre,' ', apellido)as nombre, usuario, correo, contra, foto from usuario as u
                where idUser not in 
                (select user1 from amigo
                where user2=${idUser})
                and idUser not in 
                (select user2 from amigo
                where user1=${idUser})
                and idUser!=${idUser}
                `;
        }else{//Obtener Sugerencias Filtrado
            sql= `select idUser, Concat(nombre,' ', apellido)as nombre, usuario, correo, contra, foto from usuario as u
                where idUser not in 
                (select user1 from amigo
                where user2=${idUser})
                and idUser not in 
                (select user2 from amigo
                where user1=${idUser})
                and idUser!=${idUser}
                and u.usuario="${Usuario}"
                `;
        }
 
        
        bd.query(sql, function(err, result){
            if (err) throw err;
               
            if(result.length!=0){
                let Amigos = [];
                let Amigo ={
                    "idUser": "",
                    "nombre": "",
                    "usuario": "",
                    "correo": "",
                    "contra": "",
                    "foto": "",
                    "archivos": ""
                }
                Usuarios="(";
                Amigos = result.map(x=> {
                    Amigo={
                        idUser: x.idUser,
                        nombre: x.nombre,
                        usuario: x.usuario,
                        correo: x.correo,
                        contra: x.contra,
                        foto: "https://appweb-6p1.s3.us-east-2.amazonaws.com/"+x.foto,
                        archivos: ""
                    }
                    Usuarios+=x.idUser+",";
                    return Amigo;
                });
                return res.json(Amigos); 
            }else{
                //No hay sugerencias que mostrar
                return res.json("false");
            }    
                    
        });       
       
    } catch (error) {
        console.log("Error al obtener Sugerencias  => ", error)
        res.json("error")
    }
}

exports.getAmigos =async(req,res)=>{
    try {
       const {idUser, Usuario, tipo}= req.body
       console.log(Usuario);
       let sql ="";
       if(tipo==0){//Obtener Amigos
            sql= `select idUser, Concat(nombre,' ', apellido)as nombre, usuario, correo, contra, foto from usuario as u
            where idUser in 
            (select user1 from amigo
            where user2=${idUser}
            and estado=0)
            or idUser in 
            (select user2 from amigo
            where user1=${idUser}
            and estado=0)
            `;
       }else{//Obtener Amigos Filtrado
            sql= `select idUser, Concat(nombre,' ', apellido)as nombre, usuario, correo, contra, foto from usuario as u
            where idUser in 
            (select user1 from amigo
            where user2=${idUser}
            and estado=0)
            and idUser in 
            (select user2 from amigo
            where user1=${idUser}
            and estado=0)
            or usuario="${Usuario}"
            `;
       }
       
       
       
       bd.query(sql, function(err, result){
            if (err) throw err;
            
            if(result.length!=0){
                let Amigos = [];
                let Amigo ={
                    "idUser": "",
                    "nombre": "",
                    "usuario": "",
                    "correo": "",
                    "contra": "",
                    "foto": "",
                    "archivos": ""
                }
                Usuarios="(";
                Amigos = result.map(x=> {
                    Amigo={
                        idUser: x.idUser,
                        nombre: x.nombre,
                        usuario: x.usuario,
                        correo: x.correo,
                        contra: x.contra,
                        foto: "https://appweb-6p1.s3.us-east-2.amazonaws.com/"+x.foto,
                        archivos: ""
                    }
                    Usuarios+=x.idUser+",";
                    return Amigo;
                });
                return res.json(Amigos); 
            }else{
                //No hay sugerencias que mostrar
                return res.json("false");
            }    
                
        });  
       
       
    } catch (error) {
        console.log("Error al obtener Sugerencias  => ", error)
        res.json("error")
    }
}

exports.getSolicitudes =async(req,res)=>{
    try {
        const {idUser, Usuario, tipo}= req.body
        let sql ="";
        if(tipo==0){//Obtener Solicitudes
            sql = `select idUser, nombre, usuario, correo, contra, foto from usuario, amigo
            where user1=idUser
            and user2=${idUser}
            and estado=2
            `;
        }else{
            sql = `select idUser, nombre, usuario, correo, contra, foto from usuario, amigo
            where user1=idUser
            and user2=${idUser}
            and estado=2
            and usuario="${Usuario}"`;
        }

        
        bd.query(sql, function(err, result){
            if (err) throw err;
            
            if(result.length!=0){
                let Amigos = [];
                let Amigo ={
                    "idUser": "",
                    "nombre": "",
                    "usuario": "",
                    "correo": "",
                    "contra": "",
                    "foto": "",
                    "archivos": ""
                }
                Usuarios="(";
                Amigos = result.map(x=> {
                    Amigo={
                        idUser: x.idUser,
                        nombre: x.nombre,
                        usuario: x.usuario,
                        correo: x.correo,
                        contra: x.contra,
                        foto: "https://appweb-6p1.s3.us-east-2.amazonaws.com/"+x.foto,
                        archivos: ""
                    }
                    Usuarios+=x.idUser+",";
                    return Amigo;
                });
                return res.json(Amigos); 
            }else{
                //No hay sugerencias que mostrar
                return res.json("false");
            }    
                
        });  
       
       
    } catch (error) {
        console.log("Error al obtener Sugerencias  => ", error)
        res.json("error")
    }
}

  
//--------------------------------------------------------PROYECTO 2 -----------------------------------------------------------


// Registro
exports.registroCognito = async(req,res)=>{
    try{
        const {Nombre,Apellido,Usuario,Correo,Password,idFoto}= req.body
        let hash=crypto.createHash('md5').update(Password).digest('hex');
        let Foto=SubirFoto(Usuario,idFoto);
        if(Foto!="error"){
            var attributelist = [];

            var datanickname = {
                Name: 'nickname',
                Value: Usuario,
            };
            var attributenickname = new AmazonCognitoIdentity.CognitoUserAttribute(datanickname);
            attributelist.push(attributenickname);

            var dataname = {
                Name: 'name',
                Value: Nombre,
            };
            var attributename = new AmazonCognitoIdentity.CognitoUserAttribute(dataname);
            attributelist.push(attributename);
        
            var dataemail = {
                Name: 'email',
                Value: Correo,
            };
            var attributeemail = new AmazonCognitoIdentity.CognitoUserAttribute(dataemail);
            attributelist.push(attributeemail);
        
            var dataApellido = {
                Name: 'family_name',
                Value: Apellido,
            };
            var attributeApellido = new AmazonCognitoIdentity.CognitoUserAttribute(dataApellido);
            attributelist.push(attributeApellido);
        
            var dataFoto = {
                Name: 'custom:foto',
                Value: Foto,
            };
            var attributefoto = new AmazonCognitoIdentity.CognitoUserAttribute(dataFoto);
            attributelist.push(attributefoto);
        
            var datamodoBot = {
                Name: 'custom:modoBot',
                Value: "0",
            };
            var attributemodoBot = new AmazonCognitoIdentity.CognitoUserAttribute(datamodoBot);
            attributelist.push(attributemodoBot);   

        
        
            cognito.signUp(Usuario,hash, attributelist, null, async (err, data) => {
                
                if (err) {
                    console.log(err);
        
                    res.json(err.message || err);
                    return;
                }

                //Aquí hacemos el query               
                
                if(Foto!="error"){
                    let hash=crypto.createHash('md5').update(Password).digest('hex');
                    let sql = `insert into usuario values(0,"${Nombre}","${Apellido}","${Usuario}","${Correo}","${hash}","${Foto}",0)`
                    
                    bd.query(sql, function(err, result){
                        if(err) throw err;
                        return res.json(result);
                    });
                      
                }else{
                    res.json("error");
                }
                

                console.log(data);
            });
        }else{
            res.json("error");
        }
        
    }catch(error) {
        console.log("Error al crear Usuario  => ", error)
        res.json("error")
    }
}

//Login
exports.IngresarCognito=async(req,res)=>{
    const {Usuario,Password}= req.body
    let hash=crypto.createHash('md5').update(Password).digest('hex');
    var authenticationData = {
        Username: Usuario,
        Password: hash
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );
    var userData = {
        Username: Usuario,
        Pool: cognito,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
    

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            // User authentication was successful
            bd.query(`SELECT * FROM usuario where usuario="${Usuario}"`, function(err, result){
                if(err) throw err;
                return res.json(result[0].idUser);
            });
        },
        onFailure: function (err) {
            // User authentication was not successful
            res.json("false");
        },
    });
}
  
exports.IngresarRekognition=async(req,res)=>{
    try {
        const {id}= req.body
        var imagen1="";
        var base64="";
        let sql = `select foto from usuario where usuario="${id}"`;
        bd.query(sql, function(err, result){
            if(err) throw err;
            if(result.length!=0){            
                imagen1=result[0].foto;
                var getParams = {
                    Bucket: 'appweb-6p1',
                    Key: imagen1
                  }
                  s3.getObject(getParams, function (err, data) {
                    if (err)
                      return "error";
                    //de bytes a base64
                    var dataBase64 = Buffer.from(data.Body).toString('base64');
                    let aux={
                        "foto": String(dataBase64)
                    }
                    return res.send(aux);
                
                  });
            }else{
                return res.json("error");
            } 
        }); 
        
    } catch (error) {
        return res.json("error");
    }
     
}




//Funciones
function SubirFoto(id, foto){
    //carpeta y nombre que quieran darle a la imagen
    try {
        var nombrei = "FotosPerfil/" + id +uuid()+".jpg";
        //se convierte la base64 a bytes
        let buff = new Buffer.from(foto, 'base64');
    
        const params = {
        Bucket: "appweb-6p1",
        Key: nombrei,
        Body: buff,
        ContentType: "image",
        ACL: 'public-read'
        };
        putResult = s3.putObject(params).promise();
        return nombrei;
    } catch (error) {
        return "error";
    }
    
    
}


//obtener foto en s3
function obtenerFoto(id){    
    //direcccion donde esta el archivo a obtener
    
    var getParams = {
      Bucket: 'appweb-6p1',
      Key: id
    }
    s3.getObject(getParams, function (err, data) {
      if (err)
        return "error";
      //de bytes a base64
      var dataBase64 = Buffer.from(data.Body).toString('base64');
      return dataBase64 ;
  
    });
  
  }