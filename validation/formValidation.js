module.exports.registerValidation = (username, password) => {
    const errors = [];
    if (username === "") {
        errors.push({
            message: "Please fill the username area!"
        })
    }
    if (password === "") {
        errors.push({
            message: "Please fill the password area!"
        })
    }
    if (password.length < 6) {
        errors.push({
            message: "Password should be at least 6 characters!"
        })
    }
    return errors;
}