const bd = require('../BD/connectionLocal');

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var crypto=require('crypto');
const aws_keys= require('../Keys/creds');
var AWS = require('aws-sdk');
const s3 = new AWS.S3(aws_keys.s3);
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);
const rek = new AWS.Rekognition(aws_keys.rekognition);
const { uuid } = require('uuidv4');

exports.crearPublicacion =async(req,res)=>{
    const {Texto,Usuario,idFoto}=req.body;
    let lstTags="";
    imagen=idFoto;
    let Foto =SubirFoto(Usuario,idFoto);   

    if(Foto!="error"){
        let sql =`insert into archivo values (0,"${Texto}", "${Foto}", (select now()),${Usuario})`;
        bd.query(sql, function(err, result){
            if(err){
                consele.log(err) ;
                return res.json("false");
            }
            var params = {
                Image: { 
                  Bytes: Buffer.from(imagen, 'base64')
                }, 
                MaxLabels: 123
              };
            rek.detectLabels(params, function(err, data) {
                if (err) {res.json("error")} 
                else {   
                       data.Labels.forEach(element => {
                           
                            sql=`CALL PUBLICAR("${element.Name}")`;
                            bd.query(sql, function(err, result){
                                if (err) {return res.json("error")}
                            });
                       });;  
                       return res.json("Publicación Creada Correctamente!");    
                }
              });
             
        });
    }else{
        return res.json("error");
    }
    
}

exports.getPublicaciones =async(req,res)=>{
  try {
      var idUser = req.body.iduser;
      let sql = `SELECT b.texto,b.Arch, b.fecha, a.usuario, a.foto FROM archivo as b, usuario as a
      WHERE a.idUser=b.idUsu 
      AND idUsu IN (
      select idUser from usuario
      where idUser in 
      (select user1 from amigo
      where user2=${idUser}
      and estado=0)
      or idUser in 
      (select user2 from amigo
      where user1=${idUser}
      and estado=0)
      or idUsu=${idUser}
      );`;


      bd.query(sql, function(err, result){
        if (err) {return res.json("error")}

        if(result.length!=0){
          for(let n = 0; n<result.length; n++){
              result[n].Arch="https://appweb-6p1.s3.us-east-2.amazonaws.com/"+result[n].Arch
          }
          return res.json(result);                   
        }else{
            return res.json("false");
        }
      });
      
  } catch (error) {
      console.log("Error al obtener archivos => ", error)
      res.json("error")
  }
}

exports.getPublicacionesFiltradas =async(req,res)=>{
  try {
      var idUser = req.body.iduser;
      let sql = `SELECT b.texto,b.Arch, b.fecha, a.usuario, a.foto FROM archivo as b, usuario as a, publicar as p, tag as t
      WHERE a.idUser=b.idUsu 
      AND p.idArchivo=b.idArchivo
      AND p.idTag=t.idTag
      AND tag='${req.body.tag}'
      AND idUsu IN (
      select idUser from usuario
      where idUser in 
      (select user1 from amigo
      where user2=${idUser}
      and estado=0)
      or idUser in 
      (select user2 from amigo
      where user1=${idUser}
      and estado=0)
      or idUsu=${idUser}
      );`;


      bd.query(sql, function(err, result){
        if (err) {return res.json("error")}

        if(result.length!=0){
          for(let n = 0; n<result.length; n++){
              result[n].Arch="https://appweb-6p1.s3.us-east-2.amazonaws.com/"+result[n].Arch
          }
          return res.json(result);                   
        }else{
            return res.json("false");
        }
      });
      
  } catch (error) {
      console.log("Error al obtener archivos => ", error)
      res.json("error")
  }
}

exports.getTags =async(req,res)=>{
  try {
      let sql = `SELECT * FROM tag;`;


      bd.query(sql, function(err, result){
        if (err) {return res.json("error")}

        if(result.length!=0){          
          return res.json(result);                   
        }else{
            return res.json("false");
        }
      });
      
  } catch (error) {
      console.log("Error al obtener tags => ", error)
      res.json("error")
  }
}


exports.DetectarLabels= async (req, res)=> { 
    var imagen = req.body.Foto;
    var params = {
      Image: { 
        Bytes: Buffer.from(imagen, 'base64')
      }, 
      MaxLabels: 123
    };
    rek.detectLabels(params, function(err, data) {
      if (err) {res.json({mensaje: "Error"})} 
      else {   
             return  data.Labels;      
      }
    });
  }

  function SubirFoto(id, foto){
    //carpeta y nombre que quieran darle a la imagen
    try {
        var nombrei = "FotosPublicacion/" + id +uuid()+".jpg";
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
  