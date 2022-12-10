const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyBafiY0r-3cs887mtGmgVVEg0hyjXV5cbc",
    authDomain: "crud-nodejs-ce4b3.firebaseapp.com",
    projectId: "crud-nodejs-ce4b3",
    storageBucket: "crud-nodejs-ce4b3.appspot.com",
    messagingSenderId: "929976072507",
    appId: "1:929976072507:web:c526f425a28f12324c5f1e"
};

firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app
