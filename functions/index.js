const functions = require('firebase-functions');

const REGION = 'asia-northeast1';

exports.hello = functions.region(REGION).https.onRequest((request, response) => {
    response.status(200).send("Hello World")
});

exports.createDevice = functions.region(REGION)
    .firestore
    .document('devices/{deviceId}')
    .onCreate((snap, context) => {
        const newValue = snap.data();
        const name = newValue.name;
});