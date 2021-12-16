require('dotenv').config(); 

const express = require('express');
const http = require('http');

const oauth2 = require('./oli-oauth2')

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/products', oauth2.authenticatedAccessToken, (req, res) => {
    res.json({ message: 'Whola...you are authorized to access this API' });  
});

server.listen(4000, function(){
    console.log("Resource server is listening on port: 4000");
});