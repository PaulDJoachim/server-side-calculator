console.log('javascript is working!');

//// DECLARATIONS ////

// storage for last operator clicked
let opStorage


//// THE READY-NOW THING ////

$(readyNow);


//// FUNCTIONS ////


function readyNow() {
    console.log('jQuery is working!');
    $('.opBtn').on('click', opStore);
    $('#calculateBtn').on('click', sendInput)
}


function opStore() {
    console.log('operator button clicked:', $(this)[0].innerText);
    opStorage = $(this)[0].innerText;
    console.log('opStorage now holds:', opStorage);
}


