// Bring in the express modules
// we don't start this one with the ./ because it should be looking in the node_module directory
const express = require('express');


// creates an instance of express to do all the web server things
const app = express();


// setup the public directory for static files
// any files in here can be sent back to web browsers
app.use(express.static('server/public'));


// Tell express how to read the request body
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set the port that express will listen too
const port = 5000;
app.listen(port,()=>{
    console.log('server is listening on port: ', port);
})