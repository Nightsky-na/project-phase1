// import
const express = require('express');
const router = express.Router();
const axios = require('axios');
const {protect} = require('../middleware/auth');

// router 

// index page
router.get('/', protect, (req, res) => {
    const url = `http://localhost:3001/user/get-all-users`;
    // console.log(url);
    axios.post(url)
    .then((response) => {
        console.log(response.data);
        if (response.data.success) {
            res.render('adminPage', {users: response.data.data});
        } else {
            res.redirect('/admin/login');
        }
    })
    .catch((error) => {
        console.log(error);
    });

    // res.render('adminPage', {users: []});
});


// login page
router.get('/login', (req, res) => { 
    res.render('adminLogin');
});

// register page
router.get('/register', (req, res) => {
    res.render('adminRegister');
});


// product management page
router.get('/product', protect, (req, res) => {
    const url = `http://localhost:3001/product/get-all-products`;

    axios.post(url)
    .then((response) => {
        console.log(response.data);
        res.render('adminProduct', { products: response.data.data });
    }).catch((error) => {
        console.log(error);
    });
    // res.render('adminProduct');
});

router.get('/user-add', protect, (req, res) => {
    res.render('adminAddUser');
});

// Route to edit user page
router.get('/user-edit', protect, (req, res) => {
    const product_id = req.query.product_id;
    // get user info
    const url = `http://localhost:3001/user/get-user-id`;

    axios.post(url, {"id": product_id})
    .then((response) => {
        console.log(response.data);
        res.render('adminEditUser', { user: response.data.data });
        }).catch((error) => {
        console.log(error);
    });
});

// Post to url 
router.post('/edit-user', protect, (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const ID = req.body.ID;
    url = `http://localhost:3001/user/update-user`;
    axios.post(url, {"email": email, "fname": fname, "lname": lname, "ID": ID})
    .then((response) => {
        console.log(response.data);
        if (response.data.success) {
            res.redirect('/admin/');
        } else {
            res.redirect('/admin/login');
        }
    })
    .catch((error) => {
        console.log(error);
    });
});


// Route to edit product page
router.get('/product-edit', protect, (req, res) => {
    console.log(req.query)
    const product_id = req.query.product_id;
    // get user info
    const url = `http://localhost:3001/product/get-product-by-id`;

    axios.post(url, {"id": product_id})
    .then((response) => {
        console.log(response.data.data);
        res.render('adminEditProduct', { product: response.data.data[0]});
        }).catch((error) => {
        console.log(error);
    });
});

// Route to edit page 
router.post('/edit-product', protect, (req, res) => {
    // const product_id = req.query.product_id;
    // get user info
    const url = `http://localhost:3001/product/edit-product`;
    try {
        const namePro = req.body.namePro;
        const idproduct_info = req.body.idproduct_info;
        const description = req.body.description;
        const price = req.body.price;
        const type = req.body['product-category'];

        console.log(req.body);

        const params = {
            "idproduct_info": idproduct_info,
            "name": namePro,
            "price": price,
            "description": description,
            "type": type,
        };
        console.log(params);
        axios.post(url, {
            "idproduct_info": idproduct_info,
            "name": namePro,
            "price": price,
            "description": description,
            "type": type,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    res.redirect('/admin/product');
                } else {
                    res.redirect('/admin/product-add');
                }
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.get('/product-add', protect, (req, res) => {
    res.render('adminAddProduct');
});


module.exports = router;