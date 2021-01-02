const fs = require('fs');

const vapid = require('./vapid.json');
const URLSafeBase64 = require('urlsafe-base64');
const webpush = require('web-push');


webpush.setVapidDetails(
  'mailto:marianolop22@yahoo.com.ar',
  vapid.publicKey,
  vapid.privateKey
);


const suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return URLSafeBase64.decode( vapid.publicKey );
};

module.exports.addSubscription = (subscripcion) => {
    suscripciones.push(subscripcion);
    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones) );
};

module.exports.sendPush = (post) => {

    suscripciones.forEach((suscripcion,i) => {
        

        webpush.sendNotification(suscripcion, JSON.stringify(post));

    });


}