console.log('in javascript');

$('document').ready(onReady);

function onReady() {
    $('#submitButton').on('click', onSubmit);
    getTask(); // keep current tasks on DOM after refresh
    $('#viewTask').on('click', '#completedButton', putTask);
    $('#viewTask').on('click', '#deleteButton', deleteTask);
    console.log('in jquery');
}

function onSubmit() { // take in input values
    let taskToSend = {
        task: $('#taskInput').val(),
        completed: $('#statusSelect').val(),
    }
    postTask(taskToSend);
    console.log('submit was clicked');
}

function postTask(newTask) { // POST values from DOM to server side
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

function appendTask(taskArray) { // append new string
    let id = $(this).data().id;

    $('#viewTask').empty();
    taskArray.forEach(function (task) {
        let readyButton = '';

        console.log(task);
        if (task.completed == false) {
            readyButton = `<button data-id="${task.id}" id="completedButton">Completed?</button>`
            color = `<tr data-id="${task.id}" class ="redColorHere">` // change color
        }
        else if (task.completed == true) {
            color = `<tr data-id="${task.id}" class ="greenColorHere">` // change color
        }
        stringToAppend = `
                    <tr id = "${color}">
                    <td>${task.task}</td>
                    <td> ${task.completed}</td>
                    <td>${readyButton}</td>
                    <td><button data-id = "${task.id}" id = "deleteButton">Delete</button></td>
                    </tr>
                    `;
        $('#viewTask').append(stringToAppend);
    })
}


// PUT function
function putTask() {
    console.log('will update completed status from false to true'); // update from false to true
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
    }).then(function () {
        getTask();
        console.log('im deleting something');
    })
}