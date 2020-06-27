console.log('javascript is working!');

//// DECLARATIONS ////

// count how many operators have been added
opPresent = false;


//// THE READY-NOW THING ////

$(readyNow);


//// FUNCTIONS ////


function readyNow() {
    console.log('jQuery is working!');
    //getHistory()
    $('.opBtn').on('click', opCop);
    $('#calculateBtn').on('click', sendInput);
}


// opCop polices the user's input of operators
function opCop() {
    console.log('an operator button was clicked');
    // if a second operator is clicked remove it from the display
    if (opPresent) {
        $('#display').val($('#display').val().slice(0,-1));
        //ADD A USER NOTIFICATION THAT THEY CAN ONLY DO 1 OPERATOR!
    }
    opPresent = true;
}


function sendInput() {
    const inputPacket = inputParser($('#display').val());
    console.log('Attempting to POST @ /calculate:',inputPacket);
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: inputPacket
    }).then (function(response){
        console.log('reply from /calculate POST is:', response);
        // put a get request here for the answer?
        //getHistory()
    }).catch (function(error){
        alert('Sorry, something went wrong!');
        console.log('Error on /calculate POST to server:', error);
    })

}


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


function printEverything(array) {
    console.log('later I will print this on the DOM:', array);
    $('#outputArea').children().empty();
    $('#resultDisplay').append(array[array.length-1].result);
    for (let i=array.length-1; i>=0; i--) {
        $('#resultList').append(`
        <li>${array[i].input1} ${array[i].operator} ${array[i].input2} = ${array[i].result}</li>`);
    }
}


function inputParser(string) {
    let input1 = '';
    let input2 = '';
    let operator = '';
    let onFirst = true;
    for (let i=0; i<string.length; i++){
        if (Number.isInteger(Number(string[i])) && onFirst) {
            input1 += string.substring(i,i+1);
        } else if (onFirst) {
            operator += string.substring(i,i+1)
            onFirst = false;
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


console.log(inputParser('122*500'));