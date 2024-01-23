const express = require('express');
const app = express();
const router = express.Router();
const database = require('../database');
const session = require('express-session');



router.get('/', (req, res, next) => {

    const message = req.query.message; // this message will be received from the url encoded message sent throught the redirection of /add_update


    // console.log(message);
    if (message)
        res.render('sample.hbs', { title: 'NodeJS AJAX CRUD', message: message });
    else
        res.render('sample.hbs', { title: 'NodeJS AJAX CRUD', message: -1 });



});

router.post('/action', (req, res, next) => {
    let action = req.body.action;
    if (action == 'fetch') {
        let query = 'SELECT * FROM students ORDER BY id DESC';
        database.query(query, (err, data) => {
            if (err) {
                res.send(err);
                console.log(err);
            }
            else {

                res.json({
                    data: data
                });
            }

        });
    }

})

router.post('/add', (req, res, next) => {


    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let age = req.body.age;

    let query = `
        INSERT INTO students 
        (first_name,last_name,gender,age)
        VALUES(" ${first_name}","${last_name}","${gender}","${age}")
        `;

    database.query(query, (err, data) => {
        res.json({
            message: 'Data Added'
        })
    })

})

router.post('/add_update', (req, res, next) => {

    let data = req.body;
    let userId = req.body.action;
    let first_name = data.first_name;
    let last_name = data.last_name;
    let gender = data.gender;
    let age = data.age;

    const updateQuery = `
  UPDATE students SET first_name= ?, last_name= ?, gender =? ,age=? WHERE id=?
  `;




    database.query(updateQuery, [first_name, last_name, gender, age, userId], (err, result) => {

        if (err) {
            let message = 1;
            res.redirect(`/sample?message=${encodeURIComponent(message)}`);
            // the above loc will redirect to '/sample' with url encooded message tas message=..
        }
        else {
            let message = 0;
            res.redirect(`/sample?message=${encodeURIComponent(message)}`);
        }
    });

})

router.post('/edit', (req, res, next) => {

    let id = req.body.id;
    let query = `
    SELECT * FROM students WHERE id=?
    `;

    database.query(query, id, (err, result) => {
        if (err) {
            res.send('Error')
        }
        else {
            res.json(result[0]);
        }
    })



})
router.delete('/delete', (req, res, next) => {
    let data = req.body.id;

    let query = `
    DELETE FROM students WHERE id = ?
    `;
    database.query(query, data, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {

            res.json({
                message: 'Data Deleted'
            })
        }

    })
})

module.exports = router;