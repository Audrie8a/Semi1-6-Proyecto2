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
        region: 'us-east-2',
        accessKeyId: "AKIAS5BMI5IOCGU5KZM7",
        secretAccessKey: "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" 
    },
    translate: {
        region: 'us-east-2',
        accessKeyId: "AKIA32PDN4JAVHJNCMOG",
        secretAccessKey: "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" 
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
    }
}
module.exports = aws_keys
