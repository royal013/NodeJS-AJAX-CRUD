const express = require('express');
const app = express();

const sampleRouter = require('./router/sample');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("H");
})
app.use('/sample', sampleRouter);

app.listen(3000, () => {
    console.log('done');
})

