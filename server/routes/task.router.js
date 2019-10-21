const express = require('express');
const pool = require('../modules/pool'); // double .. since in routes folder
const taskRouter = express.Router();

// // DB CONNECTION
// const pg = require('pg');
// const Pool = pg.Pool;
// const config = {
//     database: 'weekend-to-do-app',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 10000
// }

// const pool = new Pool(config);

// pool.on('connect', () => {
//     console.log('postgresql connected!!');
// });

// pool.on('error', (error) => {
//     console.log('Error connecting to db', error);
// })

// GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to-do-list";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting tasks', error);
            res.sendStatus(500);
        });
});

// POST
taskRouter.post('/', (req, res) => {
    let newTask = req.body
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "to-do-list" ("task", "completed") VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.completed])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500);
        });
});

//PUT

taskRouter.put('/:id', (req, res) => {
    let completed = req.body
    let id = req.params.id // id of the thing to update
    let queryText = `UPDATE "to-do-list" SET "completed"='true' WHERE "id"=$1` // in database
    console.log(`Updating task ${id} with `, completed);

    pool.query(queryText, [id])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error with UPDATE task query', error);
        res.sendStatus(500);
    });
})


// DELETE 

taskRouter.delete('/:id', (req,res) => {
    let id = req.params.id; // id of thing to delete
    let queryText = `DELETE FROM "to-do-list" WHERE "id" = $1`; // in database
    pool.query(queryText, [id])
    .then(function (result) {
        res.sendStatus(200); // sendstatus of Ok went through
    })
    console.log('Delete route called with id of', id);

})






module.exports = taskRouter;