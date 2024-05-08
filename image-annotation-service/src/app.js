require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const processRoute = require('./routes/process');


const app = express();
app.use(cors());
app.use(express.json({extended: false}));


app.use('/', processRoute);


const serverInit = async() => {
    try{
        const port = process.env.APP_PORT || 3002;
        // await mongoose.connect(`${process.env.MONGODB_CONN_STR}`);
        // console.log('User-Service :: Database connection establised.');

        app.listen(port, ()=>{
            console.log(`Image-annotation-Service started on port :: ${port}`);
        })
    }
    catch(err){
        console.error('Image-annotation-Service :: Failed to connect:', err);
        process.exit(1);
    }
};

serverInit();