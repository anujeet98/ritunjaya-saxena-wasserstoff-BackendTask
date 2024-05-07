require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');


const app = express();
app.use(cors());
app.use(express.json({extended: false}));

app.use('/user', userRoutes);



const serverInit = async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_CONN_STR}`);
        console.log('User-Service :: Database connection establised.');

        app.listen(process.env.APP_PORT || 3000, ()=>{
            console.log('User-Service :: started.');
        })
    }
    catch(err){
        console.error('User-Service :: Failed to connect to database:', err);
        process.exit(1);
    }
};

serverInit();