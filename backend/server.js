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
let Product = require('./models/products');
let Order = require('./models/orders');

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

// Reviewing a user
userRoutes.route('/user/review').post(function (req, res) {
    let id = req.body;
    Product.find({ name: id['order'] }, function (err, product) {
        console.log(product[0])
        Order.find({ order: product[0]['name'] }, function (err, order) {
            console.log(order[0])
            User.findOne({ username: product[0]['owner'] }, function (err, user) {
                user['rating_sum'] += order[0]['rating']
                user['review'].push((order[0]['review']))
                user['ratings'] += 1
                User.updateOne({ username: product[0]['owner'] },
                    { ratings: user['ratings'], rating_sum: user['rating_sum'], review: user['review'] })
                    .then(
                        res.status(200)
                    )
            })
        })
    });
});

// Getting all the orders
userRoutes.route('/orders/view').get(function (req, res) {
    Order.find(function (err, product) {
        if (err) {
            console.log(err);
        } else {
            console.log(product);
            res.json(product);
        }
    });
});

// Getting all the products search
userRoutes.route('/product/search').post(function (req, res) {
    console.log(req.body)
    if (req.body['name'] === '') {
        Product.find(function (err, product) {
            if (err) {
                console.log(err);
                res.send('Error');
            } else {
                res.json(product);
            }
        });
    }
    else {
        Product.find({ name: req.body['name'] }, function (err, product) {
            if (err) {
                console.log(err);
                res.send('Error');
            } else {
                res.json(product);
            }
        });
    }
});
userRoutes.route('/product/rating').post(function (req, res) {
    Product.find().sort({ 'owner': -1 }).exec(function (err, product) {
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            res.json(product);
        }
    });
});
userRoutes.route('/product/price').post(function (req, res) {
    Product.find().sort({ 'price': -1 }).exec(function (err, product) {
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            res.json(product);
        }
    });
});
userRoutes.route('/product/quantity').post(function (req, res) {
    Product.find().sort({ 'quantity': -1 }).exec(function (err, product) {
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            res.json(product);
        }
    });
});

// Adding a new order
userRoutes.route('/order/update').post(function (req, res) {
    let prod = {
        name: req.body['order'],
        quantity: req.body['quantity']
    }
    Product.findOne({ name: prod.name }, function (err, pro) {
        if (prod.quantity > pro['quantity']) {
            res.json({ 'User': 'invalid' })
        }
        else {
            pro['quantity'] -= prod.quantity;
            pro['ordered'] += prod.quantity;
            if (pro['quantity'] > 0) {
                Product.updateOne({ name: prod.name }, { quantity: pro['quantity'], ordered: pro['ordered'] })
                    .then(
                        res.json({ 'User': 'Success' })
                    )
            }
            else {
                Product.updateOne({ name: prod.name }, { quantity: pro['quantity'], status: 'ready', ordered: pro['ordered'] })
                    .then(
                        res.json({ 'User': 'Success' })
                    )
            }
        }
    })
});
userRoutes.route('/order/add').post(function (req, res) {
    let orde = new Order(req.body);
    Order.create(orde)
        .then(
            res.status(200).json(req.body)
        )
        .catch(err => {
            res.status(400).send('Error');
        })
});

// Getting all the orders for a particular vendor
userRoutes.route('/orders/view/cus1').post(function (req, res) {
    ret = [];
    const user = req.body['username']
    Product.find(function (err, product) {
        for (i in product) {
            if (product[i].owner === user) {
                Order.find({ order: product[i].name }, function (err, order) {
                    console.log(order)
                    for (j in order) {
                        ret.push(j);
                    }
                })
            }
        }
    })
        .then(
            res.status(200).json(ret)
        )
});
// userRoutes.route('/orders/view/cus2').post(function (req, res) {
//     console.log(ret)
//     res.status(200).json(ret);
// });

// Product dispatch
userRoutes.route('/product/dispatch').post(function (req, res) {
    let const_id = req.body['name']

    Product.findOneAndUpdate(
        { name: const_id },
        { $set: { status: "dispatched" } },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    );
});

userRoutes.route('/orders/dispatch').post(function (req, res) {
    let const_id = req.body['name']

    Order.updateMany(
        { order: const_id },
        { $set: { status: "dispatched" } },
        function (err, result) {
            if (err) {
                console.log('Error');
                // res.send(err)
            } else {
                console.log(result);
                // res.send(result)
                // res.status(200);
            }
        }
    );
});

// Getting all the products
userRoutes.route('/product/view').get(function (req, res) {
    Product.find(function (err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

// Removing a product
userRoutes.route('/product/delete').post(function (req, res) {
    let const_id = req.body['id']
    Product.findByIdAndUpdate(const_id,
        { $set: { status: 'deleted' } },
        function (err, result) {
            if (err) {
                res.send('Error');
            } else {
                res.send(result);
            }
        }
    );
});

// Adding a new product
userRoutes.route('/product/add').post(function (req, res) {
    let prod = new Product(req.body)
    console.log(prod)
    Product.create(prod)
        .then(prod => {
            res.status(200).json(prod);
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

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
    console.log(userData)

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
                    res.cookie('token', token, { httpOnly: true }).status(200).json({ 'user': user.username, 'role': user.role });  //res.send(token)
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
