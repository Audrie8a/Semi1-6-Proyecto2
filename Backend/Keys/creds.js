let aws_keys = {
    s3: {
        region: 'us-east-2',
        accessKeyId: "AKIAS5BMI5IOEUTT6JEK",
        secretAccessKey: "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",
        //apiVersion: '2006-03-01',
    },
    dynamodb: {
        apiVersion: '2012-08-10',
        region: 'us-east-2',
        accessKeyId: "",
        secretAccessKey: ""
    },
    rekognition: {
        region: '',
        accessKeyId: "",
        secretAccessKey: "" 
    },
    translate: {
        region: '',
        accessKeyId: "",
        secretAccessKey: "" 
    },
    cognito4:{
        region:'us-east-2',
        IdentityPoolId: '', 
        UserPoolId: 'us-east-2_J9qA6aVG6',
        ClientId: '2rhip9rm3scu7bflujt2gestci'
    },
    cognito:{
        region:'us-east-2',
        IdentityPoolId: '', 
        UserPoolId: 'us-east-2_INxchq7jz',
        ClientId: '23l1nmqqufefkeitqc122b6irh'
    },
    cognito2:{
        region:'us-east-2',
        IdentityPoolId: '',
        AuthParameters:{
            USERNAME:"adminCognito",
            PASSWORD:"didnlq38bgitm32pte8vmtub2rfkf98jq6h3g5tn1n7rd1e8e4p"
            },       
        UserPoolId: 'us-east-2_ImHx8w5i1',
        ClientId: '1r3o1bgjc4vjrnd2ennrc7smju'
    }
}
module.exports = aws_keys
