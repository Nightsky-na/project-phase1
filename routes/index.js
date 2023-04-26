// import 
const express = require('express');
const router = express.Router();
const axios = require('axios');



// router
router.get('/', (req, res) => {
    res.render('homePage');
});

router.get('/about', (req, res) => {
    res.render('aboutPage');
});

router.get('/search', (req, res) => {
    res.render('searchPage');
});

router.post('/search/bar', (req, res) => {
    const search = req.body['search-box'];
    let url = `http://localhost:3001/product/get-product-by-name`;
            // let url = `http://localhost:3001/product/get-all-products`;
            console.log(url);
            const param = {name: search}
            axios.post(url, {name: search})
            .then((response) => {
                // console.log(response.data.data);
                res.render('searchResult', {products: response.data.data});
            } 
            ).catch((error) => {
                console.log(error);
            }
            );
});

// send request to server to get data
router.post('/search/', (req, res) => {
    const search = req.body['search-box'];
    const criteria = req.body['search-criteria'];
    const category = req.body['search-category'];

    console.log((category === 'all') );
    if (category === 'all') {
        // search all categories by criteria
        if (criteria == 'name'){
            let url = `http://localhost:3001/product/get-product-by-name`;
            // let url = `http://localhost:3001/product/get-all-products`;

            axios.post(url, {name: search})
            .then((response) => {
                console.log(response.data.data);
                res.render('searchResult', {products: response.data.data});
            } 
            ).catch((error) => {
                console.log(error);
            }
            );
        } else if (criteria === 'description') {
            let url = `http://localhost:3001/product/get-product-by-description`;
            axios.post(url, {description: search})
            .then((response) => {
                // console.log(response.data);
                res.render('searchResult', {products: response.data.data});
            } 
            ).catch((error) => {
                console.log(error);
            }
            );
            // TODO: search by description
        } else if (criteria === 'id') {
            let url = `http://localhost:3001/product/get-product-by-id`;
            axios.post(url, {id: parseInt(search)})
            .then((response) => {
                console.log(response.data);
                res.render('searchResult', {products: response.data.data});
            } 
            ).catch((error) => {
                console.log(error);
            }
            );
        }
    } else {
        // search by category and name 
        if (criteria == 'name' && category !== 'all'){
            let url = `http://localhost:3001/product/get-product-by-name-and-category`;
            const param = {name: search, category: category}
            axios.post(url, {param, responseType: "json"})
            .then((response) => {
                console.log(response.data.data);
                res.render('searchResult', {products: response.data.data});
            }
            ).catch((error) => {
                console.log(error);
            }
            );
        } else if (criteria === 'description' && category !== 'all') {
            let url = `http://localhost:3001/product/get-product-by-type-and-description`;
            const param = {type: category, description: search}
            axios.post(url, {param, responseType: "json"})
            .then((response) => {
                console.log(response.data.data);
                res.render('searchResult', {products: response.data.data});
            }
            ).catch((error) => {
                console.log(error);
            }
            );
        }
            
    }
});


module.exports = router;