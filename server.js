require('dotenv').config({ path: "./config/config.env" });
const express = require("express");
const errorHandler = require("./middleware/error");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const cors = require("cors");

// --------------- IMPORT ----------------


const app = express();

app.use(morgan('dev'));


// View engine setup
app.set('view engine', 'ejs');
// app.set('views', './public/html/');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/',      require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/shop',  require('./routes/shop'));
app.use('/auth',  require('./routes/auth'));
// Error Handler (should be last piece of middleware)
app.use(errorHandler);

// --------------- MIDDLEWARE ----------------


const PORT = process.env.PORT || 8080 ;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
console.log(`URL: http://localhost:${PORT}`);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})

// --------------- SERVER ----------------