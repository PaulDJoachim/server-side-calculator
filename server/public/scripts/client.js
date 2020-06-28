console.log('javascript is working!');

//// DECLARATIONS ////

// count how many operators have been added
opAdded = false;
dotCount = 0;

//// THE READY-NOW THING ////

$(readyNow);


//// FUNCTIONS ////


function readyNow() {
    console.log('jQuery is working!');
    $('.opBtn').on('click', opCop);
    $('.dotBtn').on('click', dotCop);
    $('#calculateBtn').on('click', sendInput);
    $('#clearBtn').on('click', clearDisplay);
    $('#allClear').on('click', allClear);
    $('#bkSpace').on('click', backspace);
    getHistory()
}


// opCop polices the user's input of operators
function opCop() {
    dotCount = 0;
    // if a second operator is clicked remove it from the display
    if (opAdded) {
        $('#display').val($('#display').val().slice(0,-1));
        console.log('OP COP SAYS: ONLY 1 OPERATOR ALLOWED!');
        return;
        //ADD A USER NOTIFICATION THAT THEY CAN ONLY DO 1 OPERATOR!
    } else if ($('#display').val().length === 1) {
        $('#display').val($('#display').val().slice(0,-1));
        console.log('OP COP SAYS: YOU CAN\'T START WITH THE OPERATOR!')
        return;
    }
    opAdded = true;
}


// dot cop makes sure only one decimal is added to either side of the equation
function dotCop() {
    if (dotCount === 1 && !opAdded) {
        $('#display').val($('#display').val().slice(0,-1));
        console.log('DOT COP SAYS: NO MORE DOTS UNTIL YOU ADD AN OPERATOR!!')
        return;
    } else if (dotCount === 1 && opAdded){
        $('#display').val($('#display').val().slice(0,-1));
        console.log('DOT COP SAYS: NO MORE DOTS FOR YOU!!!')
        return;
    }
    dotCount++
}


// makes an inputPacket out of the input, sends to server, gets answer object back.
function sendInput() {
    const inputPacket = inputParser($('#display').val());
    // check to make sure all the inputs actually have data before sending
    if (!syntaxCheck(inputPacket)) {
        console.log('THE INPUT IS MISSING SOMETHING!')
        //ADD MESSAGE TO USER ABOUT BAD SYNTAX
        return false;
    }
    console.log('Attempting to POST @ /calculate:',inputPacket);
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: inputPacket
    }).then (function(response){
        console.log('reply from /calculate POST is:', response);
        // put a get request here for the answer?
        getHistory()
    }).catch (function(error){
        alert('Sorry, something went wrong!');
        console.log('Error on /calculate POST to server:', error);
    })
}


// sends a GET request to the server for all previous inputs & results
function getHistory() {
    $.ajax({
        type: 'GET',
        url: '/calculate'
    }).then (function(response){
        printEverything(response);
    }).catch (function(error){
        alert('Sorry, something went wrong!');
        console.log('Error on /calculate GET from server:', error);
    })
}


// print all results on the dom
function printEverything(array) {
    console.log('later I will print this on the DOM:', array);
    $('#resultList').children().remove();
    // check to make sure the array has something, if so print it
    if (array.length > 0) {
        $('#result').val(array[array.length-1].result);
    }
    for (let i=array.length-1; i>=0; i--) {
        $('#resultList').append(`
        <li>${array[i].input1} ${array[i].operator} ${array[i].input2} = ${array[i].result}</li>`);
    }
}


// take the calculator display and turn it into an object for sending to server 
function inputParser(string) {
    let input1 = '';
    let input2 = '';
    let operator = '';
    let onFirst = true;
    for (let i=0; i<string.length; i++){
        // separate input1
        if (Number.isInteger(Number(string[i])) && onFirst || string[i] === '.') {
            input1 += string.substring(i,i+1);
        // separate operator
        } else if (onFirst) {
            operator += string.substring(i,i+1)
            onFirst = false;
        // whatever is left in the string add to input2
        } else {
            input2 += string.substring(i);
            break;
        }
    }
    return {
        input1: input1,
        input2: input2,
        operator: operator
    }
}


//checks the outgoing packet to make sure all parameters have values
function syntaxCheck(object) {
    if (object.input1 === '' || object.input2 === '' || object.operator === '') {
        return false
    }
    return true
}


// clears the display, resets the decimal and operator tracking
function clearDisplay() {
    console.log('reset pressed');
    $('#result').val('');
    $('#display').val('');
    opAdded = false;
    dotCount = 0;
}


// clear display & delete all history from the server
function allClear() {
    $.ajax({
        method: 'DELETE',
        url: '/delete',
        // data: 'name=history'
    }).then (function(response){
        console.log(response);
    }).catch (function(error){
        alert('Sorry, something went wrong!');
        console.log('Error on /calculate DELETE to server:', error);
    })
    $('#result').val('');
    $('#display').val('');
    opAdded = false;
    dotCount = 0;
    $('#resultList').empty();
}


function backspace() {
    let inputString = $('#display').val()
    let backspace = $('#display').val(inputString.slice(0,-1));
    let last = inputString[inputString.length-1]

    if (last === '.') {
        backspace;
        dotCount = 0;
    } else if (last === '+'||last === '-'||last === '*'||last === '/') {
        backspace;
        opAdded = false;
    }
    
}