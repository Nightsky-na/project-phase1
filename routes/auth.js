// import
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/login', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email, password);

    const url = `http://localhost:3001/auth/login`;
    axios.post(url, {"email": email, "password": password})
    .then((response) => {
        console.log(response.data);
        if (response.data.success) {
            
            res.cookie('token', `Bearer ${response.data.token}`, {maxAge: 3600000, httpOnly: true});
            res.redirect('/admin');
        } else {
            res.redirect('/admin/login');
        }
    })
    .catch((error) => {
        console.log(error);
    });
});

router.post('/register', (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const ID = req.body.ID;
    
    const url = `http://localhost:3001/auth/register`;
    axios.post(url, {"email": email, "password": password, "fname": fname, "lname": lname, "ID": ID})
    .then((response) => {
        console.log(response.data);
        if (response.data.success) {
            res.redirect('/admin/login');
        } else {
            res.redirect('/admin/register');
        }
    })
    .catch((error) => {
        console.log(error);
    });
});




module.exports = router;