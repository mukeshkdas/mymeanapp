const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const userRoutes = require('./routes/users');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
    console.log('database connected successfully ' + config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('database error ' + err);
});

// Express App
const app = express();

// CORS Middleware
app.use(cors());
// Body Parser Middleware
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Static Contents
app.use(express.static(path.join(__dirname, 'public')));

// Create User Route
app.use('/users', userRoutes);

app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = 3000;

//const port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log('Service started on port:' + port);    
});

