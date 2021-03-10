const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const validations = require('../validations/sms_schema');

router.post('/sendSms',validations.sms_schema_validation, (req,res) => {
    let number = req.body.receiver.countryCode + req.body.receiver.number;

    console.log("Message: " + req.body.message);
    console.log("To: " + number);

    let params = {
        Message: req.body.message,
        PhoneNumber: '+' + number,
        MessageAttributes: {
            'AWS.SNS.SMS.SenderID': {
                'DataType': 'String',
                'StringValue': process.env.SENDER_ID
            }
        }
    };

    let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    publishTextPromise.then(
        function (data) {
            res.end(JSON.stringify({ MessageID: data.MessageId }));
        }).catch(
            function (err) {
                res.end(JSON.stringify({ Error: err }));
            });
});

module.exports = router;