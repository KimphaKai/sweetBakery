let admin = require('firebase-admin');
let serviceAccount = require('./sweetbakeryimg-firebase-adminsdk-4i2ot-d21b8fc5df.json');

const defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "sweetbakeryimg.appspot.com",
});
const bucket = defaultApp.storage().bucket();
module.exports=bucket;