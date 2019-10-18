console.log('in javascript');

$('document').ready(onReady);

function onReady () {
$('#submitButton').on('click', onSubmit)
console.log('in jquery');
}

function onSubmit () {
    console.log ('submit was clicked');
}