const bd = require('../BD/connectionLocal');

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var crypto=require('crypto');
const aws_keys= require('../Keys/creds');
var AWS = require('aws-sdk');
const s3 = new AWS.S3(aws_keys.s3);
const cognito = new AmazonCognitoIdentity.CognitoUserPool(aws_keys.cognito);
const rek = new AWS.Rekognition(aws_keys.rekognition);
const { uuid } = require('uuidv4');