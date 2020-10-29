const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 2999;

const db = require('./db/index');
const habitRouter = require('./routes/habit-router');
const userRouter = require('./routes/user-router');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use('/habits', habitRouter);
app.use('/users', userRouter);
app.get('/test', () => {
    console.log('test udnay');
})

app.listen(apiPort, () => {console.log(`Server running on ${apiPort}`)});
