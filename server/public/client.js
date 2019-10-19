console.log('in javascript');

$('document').ready(onReady);

function onReady() {
    $('#submitButton').on('click', onSubmit);
    getTask();

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
        console.log ('Error in POST', error);
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


  function appendTask (taskArray) {
    $('#viewTask').empty();
    taskArray.forEach(function(task){
      let readyButton = '';
      console.log(task);
      if (task.completed == false) {
        readyButton =`<button data-id="${task.id}" id="completedButton">Completed?</button>`
      }
      stringToAppend = `<tr><td>${task.task}</td><td>${task.completed}</td>><td>${readyButton}</td>
      <td><button id = "Delete"> Delete</button></td></tr>`;
      $('#viewTask').append(stringToAppend);
    })
  }