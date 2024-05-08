require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const { authenticate } = require('./middlewares/authentication');
const proxy = require('express-http-proxy');


const app = express();
app.use(cors());
app.use(express.json({extended: false}));


app.use('/user', userRoutes);
app.use('/', authenticate, proxy('http://localhost:3000'));


const serverInit = async() => {
    try{
        const port = process.env.APP_PORT || 3001;
        await mongoose.connect(`${process.env.MONGODB_CONN_STR}`);
        console.log('User-Service :: Database connection establised.');

        app.listen(port, ()=>{
            console.log(`User-Service started on port :: ${port}`);
        })
    }
    catch(err){
        console.error('User-Service :: Failed to connect to database:', err);
        process.exit(1);
    }
};

serverInit();