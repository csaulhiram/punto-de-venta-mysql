const { request, response } = require('express');


const principal = (req, res) => {
    res.render('index');
}

const usersView = (req, res) => {
    res.render('adminUsers');
}

const financesView = (req, res) => {
    res.render('finances');
}


module.exports = {
    principal,
    usersView,
    financesView
}