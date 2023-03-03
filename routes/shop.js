// import
const express = require('express');
const router = express.Router();

// router
router.get('/', (req, res) => {
    res.sendFile('shopPage.html', { root: __dirname + '/../public/html/' });
});

// product
router.get('/product', (req, res) => {
    res.sendFile('keyChaineDemo.html', { root: __dirname + '/../public/html/demoProduct/' });
});

// product1
router.get('/product1', (req, res) => {
    res.sendFile('keyChaineDemo1.html', { root: __dirname + '/../public/html/demoProduct/' });
});

// product2
router.get('/product2', (req, res) => {
    res.sendFile('keyChaineDemo2.html', { root: __dirname + '/../public/html/demoProduct/' });
});

// product3
router.get('/product3', (req, res) => {
    res.sendFile('keyChaineDemo3.html', { root: __dirname + '/../public/html/demoProduct/' });
});

// product4
router.get('/product4', (req, res) => {
    res.sendFile('keyChaineDemo4.html', { root: __dirname + '/../public/html/demoProduct/' });
});

// product5
router.get('/product5', (req, res) => {
    res.sendFile('keyChaineDemo5.html', { root: __dirname + '/../public/html/demoProduct/' });
});

module.exports = router;