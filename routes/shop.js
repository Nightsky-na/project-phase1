// import
const express = require('express');
const router = express.Router();

// router
router.get('/', (req, res) => {
    res.sendFile('shopPage.html', { root: __dirname + '/../public/html/' });
});

module.exports = router;