var express = require('express');
var app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./crud-nodejs-ce4b3-firebase-adminsdk-xj79n-8078baf425.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded( { extended:true } ));

const PORT = process.env.PORT || 5050

// const { students } = require('./util/handlers/students');

// app.get('/students', students);

// app.get('/', (req, res) => {
//     res.send('This is my demo project')
// })

app.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.id;
        const userJson = {
            age: req.body.age,
            college: req.body.college,
            id: req.body.id,
            name: req.body.name
        };
        const response = await db.collection("Students").add(userJson);
        res.send(response);
    } catch(error) {
        res.send(error);
    }
});

app.get('/read/all', async (req, res) => {
    try {
        const usersRef = db.collection("Students");
        const response = await usersRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch(error) {
        res.send(error);
    }
});

app.get('/read/:id', async (req, res) => {
    try {
        const userRef = db.collection("Students").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    } catch(error) {
        res.send(error);
    }
});

app.post('/update', async (req, res) => {
    try {
        const id = req.body.id;
        const newUsername = "angelo1703";
        const newAge = "20";
        const newCollege = "vida";
        const userRef = db.collection("Students").doc(id).update({
            name: newUsername,
            age: newAge,
            college: newCollege
        })
        res.send(userRef);
    } catch(error) {
        res.send(error);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const response = db.collection("Students").doc(req.params.id).delete();
        res.send(response);
    } catch(error) {
        res.send(error);
    }
})

app.listen(PORT, () => {
    console.log(`Up and Running at port ${PORT}!`);
});

