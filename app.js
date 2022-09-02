const app = require('express')();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const User = require('./models/user');

// Mongodb connection
mongoose.connect('mongodb://localhost/passportdb', {
    useNewUrlParser: true
});
//bodyParser Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
    console.log('Connected to Database');
});


app.set('view engine', 'ejs');
app.use(userRouter);
app.get('/', (_req, res) => {
    User.find({})
        .then(users => {
            res.render('pages/index', {
                users
            });
        })
        .catch(err => console.log(err));
    // res.render('pages/index.ejs')
})

app.use((req, res) => {
    res.render('static/404', {
        message: "404 Not Found"
    });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})