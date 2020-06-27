console.log('javascript is working!');

//// DECLARATIONS ////

// storage for last operator clicked
let opStorage;


//// THE READY-NOW THING ////

$(readyNow);


//// FUNCTIONS ////


function readyNow() {
    console.log('jQuery is working!');
    getHistory()
    $('.opBtn').on('click', opStore);
    $('#calculateBtn').on('click', sendInput);
}


function opStore() {
    console.log('operator button clicked:', $(this)[0].innerText);
    opStorage = $(this)[0].innerText;
    console.log('opStorage now holds:', opStorage);
}


function sendInput() {
    const inputPacket = {
        input1: $('#input1').val(),
        input2: $('#input2').val(),
        operator: opStorage
    }
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