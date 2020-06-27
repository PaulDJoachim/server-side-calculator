// Bring in the express modules
// we don't start this one with the ./ because it should be looking in the node_module directory
const express = require('express');
let history = []

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


//// POST HANDLERS ////

app.post('/calculate', (req, res)=>{
    let input = req.body;
    console.log('Got this packet from client:', input);
    history.push(calculate(input));

    res.sendStatus(201);
})



//// GET HANDLERS ////

app.get('/calculate',(req, res)=>{
    res.send(history);
})



//// FUNCTIONS ////

function calculate(object) {
    let result
    switch(object.operator) {
        case '+':
            result = Number(object.input1) + Number(object.input2);
            break;
        case '-':
            result = object.input1 - object.input2;
            break;
        case '*':
            result = object.input1 * object.input2;
            break;
        case '/':
            result = object.input1 / object.input2;
    }
    return {
        input1: object.input1,
        input2: object.input2,
        operator: object.operator,
        result: result
    }
}