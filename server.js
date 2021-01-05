const express = require('express');
const cors = require('cors');
const path = require('path');


// Configuring Host and Port.
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());



app.use(express.static('client/build'));

app.use('/image', express.static('uploads'));
/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));


app.get('/**', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
});

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:5000

app.listen(PORT, HOST, () => console.log(`Server started running on : http://${HOST}:${PORT}`));
