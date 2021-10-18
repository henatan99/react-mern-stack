let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoDb = require('./db');

const TodoRoute = require('./todo.route');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected!')
}, 
error => {
    console.log(error)
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use('/api', TodoRoute)

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('Connected on: ' + port)
})

app.use(function (err, req, res, next) {
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})