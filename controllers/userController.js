const formValidation = require('../validation/formValidation')
const bcrypt = require('bcryptjs');
const User = require('../models/user');


module.exports.getUserLogin = (req, res) => {
    res.render('./pages/login');
}

module.exports.getUserRegister = (req, res) => {
    res.render('./pages/register');
}

module.exports.postUserLogin = (req, res) => {
    // console.log(req.body);
    res.render('./pages/login');
}

module.exports.postUserRegister = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = [];
    const validationErrors = formValidation.registerValidation(username, password);
    //Server side validation
    if (validationErrors.length > 0) {
        res.render('./pages/register', {
            username: username,
            password: password,
            errors: validationErrors
        });
    } else {
        User.findOne({
            username
        }).then(user => {
            if (user) {
                //Username validation
                errors.push({
                    message: `${username}  Not avaible!`
                })
                return res.render('pages/register.ejs', {
                    username,
                    password,
                    errors
                })
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) throw err;
                    const newUser = new User({
                        username: username,
                        password: hash
                    })
                    newUser
                        .save()
                        .then(() => {
                            console.log("Success");
                            res.redirect('/');
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
            })
        }).catch(err => console.log(err));
    }

}