const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');

app.use(cors());
app.use(bodyParser.json());
process.env.SECRET_KEY = 'shreek';

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established succesfully.");
})
    .catch(err => {
        console.log(err);
    })

// API endpoints

// Getting all the users
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Adding a new user
userRoutes.route('/add').post((req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    }
    console.log(userData);

    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.send("Registered") //.status(200).json({ status: user.username + 'Registered!' })
                            //return user.role
                        })
                        .catch(err => {
                            res.status(400).send('error: ' + err)
                        })
                })
            } else {
                res.send("Error: User already exists")// .status(600).json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.status(400).send('error: ' + err)
        })

    // user.save()
    //     .then(user => {
    //         res.status(200).json({'User': 'User added successfully'});
    //     })
    //     .catch(err => {
    //         res.status(400).send('Error');
    //     });
});

//login
userRoutes.route('/login').post((req, res) => {
    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // Passwords match
                    const payload = {
                        //_id: user._id,
                        username: user.username,
                        role: user.role,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    console.log("Successfully logged in")
                    res.cookie('token', token, { httpOnly: true }).status(200).send(user.role);  //res.send(token)
                } else {
                    res.send('Error: Passwords do not match')//status(900).json({ error: 'Passwords do not match' })
                }
            } else {
                res.send('Error: User does not exist')//.status(800).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).send('error: ' + err)
        })
})

// Getting a user by id
userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
