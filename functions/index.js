const functions = require('firebase-functions');
const QRCode = require('qrcode');

const REGION = 'asia-northeast1';
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.hello = functions.region(REGION).https.onRequest((request, response) => {
    response.status(200).send("Hello World")
});

exports.createDevice = functions.region(REGION)
    .firestore
    .document('devices/{deviceId}')
    .onCreate((snap, context) => {
        //const newValue = snap.data();
        const deviceId = context.params.deviceId;

        //ここから
        const qrBuff = QRCode.toBuffer(deviceId);
        const file = admin
            .storage()
            .bucket()
            .file(`qr/${deviceId}.png`);

        file.save(qrBuff,  { metadata: { contentType: 'image/png' } });
        const url = file.getSignedUrl({
            action: 'read',
            expires: '01-01-2099',
        });

        //ここまでうまく動いていない・・・

        db.doc('devices/' + deviceId ).set({ imagePath: url});
});