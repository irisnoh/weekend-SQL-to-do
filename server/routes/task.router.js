const express = require('express');
const taskRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('postgresql connected!!');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
})

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
    console.log(`Adding koala`, newTask);
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












module.exports = taskRouter;