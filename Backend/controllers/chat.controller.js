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

exports.identi = async (req, res) => {
    try {
        const {idUser}= req.body
        let sql = `select usuario from usuario as u where idUser=${idUser}`;
        
        bd.query(sql, function(err, result){
            if(err) throw err;
            return res.json(result);
         }); 
    
        
     } catch (error) {
         console.log("Error al obtener usuario  => ", error)
         res.json("error")
     }
}

