require('dotenv').config({ path: "./config/config.env" });
const express = require("express");
const errorHandler = require("./middleware/error");
// const cors = require("cors");

// --------------- IMPORT ----------------


const app = express();



// app.use(express.json({ limit: '2mb' }));
// app.use(express.urlencoded({ limit: '2mb', extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/',      require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/shop',  require('./routes/shop'));
// Error Handler (should be last piece of middleware)
app.use(errorHandler);

// --------------- MIDDLEWARE ----------------


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
console.log(`URL: http://localhost:${PORT}`);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})

// --------------- SERVER ----------------