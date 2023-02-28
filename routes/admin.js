// import
const express = require('express');
const router = express.Router();


// router 

// index page
router.get('/', (req, res) => {
    res.sendFile('adminPage.html', { root: __dirname + '/../public/html/' });
});

// login page
router.get('/login', (req, res) => { 
    res.sendFile('adminLogin.html', { root: __dirname + '/../public/html/' });
});

// product management page
router.get('/product', (req, res) => {
    res.sendFile('adminProduct.html', { root: __dirname + '/../public/html/' });
});


module.exports = router;