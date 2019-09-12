const functions = require('firebase-functions');

exports.hello = functions.https.onRequest((request, response) => {
    response.status(200).send("Hello World")
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
