console.log('in javascript');

$('document').ready(onReady);

function onReady() {
    $('#submitButton').on('click', onSubmit);
    getTask();
    $('#viewTask').on('click', '#completedButton', putTask);
    $('#viewTask').on('click', '#deleteButton', deleteTask);
    console.log('in jquery');
}

function onSubmit() {
    let taskToSend = {
        task: $('#taskInput').val(),
        completed: $('#statusSelect').val(),
    }
    postTask(taskToSend);
    console.log('submit was clicked');
}

function postTask(newTask) {
    $.ajax({
        type: 'POST',
        url: '/task',
        data: newTask,
    }).then(function (response) {
        console.log('response from Server', response);
        console.log('in postTask function');
        getTask();
    }).catch(function (error) {
        console.log('Error in POST', error);
    })

}

function getTask() { // GET what is in my response from server to DOM
    console.log('in getTask');
    $.ajax({
        type: 'GET',
        url: '/task',
    }).then(function (response) {
        appendTask(response);
    }).catch(function (error) {
        console.log('error in get', error);
    })

} // end getTask


function appendTask(taskArray) {
    $('#viewTask').empty();
    taskArray.forEach(function (task) {
        let readyButton = '';
        let colorthis = '';
        console.log(task);
        if (task.completed == false) {
            readyButton = `<button data-id="${task.id}" id="completedButton">Completed?</button>`
        }
        else if (task.completed == true) {
            colorthis = `<div data-id="${task.id}" class = "colorMe"></div>`
        }
        stringToAppend = `
                        <tr><td>${task.task}</td>
                        <td>${task.completed}</td>>
                        <td>${readyButton}</td>
                        <td><button data-id = "${task.id}" id = "deleteButton">Delete</button></td>
                        <td>${colorthis}</td></tr>
                        `;

        $('#viewTask').append(stringToAppend);
        //   $('#viewTask').css("background-color", "purple");

    })
}

// $('#appendMe').append(`
// <div data-id="${clicks}" class = "ketchup"> 
//     <p>${clicks}</p> 
//     <button id="yellowButton"> Yellow </button> 
//     <button id="deleteButton">Delete</button>
// </div>

// PUT function
function putTask() {
    console.log('will update completed status from false to true');
    let id = $(this).data().id;
    console.log(id);
    $.ajax({
        method: 'PUT',
        url: `/task/${id}`
    }).then(function (response) {
        console.log(response)
        getTask();
    }).catch(function (error) {
        console.log('error in PUT', error);
    })
}

// DELETE function

function deleteTask() {
    let id = $(this).data().id;
    console.log(id);
    $.ajax({
        method: 'DELETE',
        url: `/task/${id}`
    }).then(function() {
        getTask();
        console.log('im deleting something');
    })
}