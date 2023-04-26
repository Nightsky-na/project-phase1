// check for json web token in the header
const jwt = require('jsonwebtoken');
const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');
exports.protect = async (req, res, next) => {
    let token;
    try {
        token = req.cookies.token.split(" ")[1];;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        next();

    } catch (error) {
        res.redirect('/admin/login');
        // return next(new ErrorResponse("Not authorized to access this route", 401));

    }
}
