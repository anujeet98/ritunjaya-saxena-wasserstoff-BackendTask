require('dotenv').config();
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');


const app = express();

app.use(cors());
app.use(express.json());


// app.use('/user', proxy('http://localhost:3001/user'));
app.use('/image', proxy('http://localhost:3002'));
app.use('/submission', proxy('http://localhost:3003'));
app.use('/admin', proxy('http://localhost:3004'));



const serverInit = ()=>{
    const port = process.env.GATEWAY_PORT || 3000;
    app.listen(port, ()=>{
        console.log(`Gateway is running on port :: ${port}`);
    })
}

serverInit();