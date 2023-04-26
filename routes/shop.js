// import
const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer');

// Define the storage location and filename for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') // Change this to the directory where you want to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// Define the multer middleware with the storage configuration
const upload = multer({ storage: storage })

// router
router.get('/', (req, res) => {
    // call api to get all products
    const url = `http://localhost:3001/product/get-all-products`;
    axios.post(url)
    .then((response) => {
        // console.log(response.data.data);
        res.render('searchResult', { products: response.data.data });
    }
    ).catch((error) => {
        console.log(error);
    }
    );
    // res.sendFile('shopPage.html', { root: __dirname + '/../public/html/' });
});

// product
router.get('/product/:id', (req, res) => {
    // cal api to get product by id
    console.log(req.params.id);
    const url = `http://localhost:3001/product/get-product-by-id`;
    // const param = JSON.stringify({"id": parseInt(req.params.id)});
    // console.log(param);
    const param = { id: parseInt(req.params.id) }

    axios.post(url, param)
        .then((response) => {
            console.log(response.data.data);
            product = response.data.data[0];
            res.render('productPage', { product: product });
        }
        ).catch((error) => {
            console.log(error);
        }
        );
});

// add product //NOT FINISH
router.post('/create-product', upload.single('image'), async (req, res) => {
    const url = `http://localhost:3001/product/create-product-no-image`;

    try {
        const namePro = req.body.namePro;
        const idproduct_info = req.body.idproduct_info;
        const description = req.body.description;
        const price = req.body.price;
        const type = req.body['product-category'];


        const params = {
            name: namePro,
            description: description,
            price: price,
            type: type,
            idproduct_info: idproduct_info,
        };
        console.log(params);
        axios.post(url, {
            name: namePro,
            description: description,
            price: price,
            type: type,
            idproduct_info: idproduct_info,
            // image: image_fs,
            // name_image: image_name
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

module.exports = router;