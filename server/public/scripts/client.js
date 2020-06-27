console.log('javascript is working!');

//// DECLARATIONS ////

// storage for last operator clicked
let opStorage;


//// THE READY-NOW THING ////

$(readyNow);


//// FUNCTIONS ////


function readyNow() {
    console.log('jQuery is working!');
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
    }).catch (function(error){
        alert('Sorry, something went wrong!');
        console.log('Error on /calculate POST to server:', error);
    })

}