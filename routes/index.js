// import 
const express = require('express');
const router = express.Router();

// router
router.get('/', (req, res) => {
    res.sendFile('homePage.html', { root: __dirname + '/../public/html/' });
});

router.get('/about', (req, res) => {
    res.sendFile('aboutPage.html', { root: __dirname + '/../public/html/' });
});

router.get('/search', (req, res) => {
    res.sendFile('searchPage.html', { root: __dirname + '/../public/html/' });
});

module.exports = router;