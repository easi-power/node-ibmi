#!/usr/bin/env node

require('dotenv').config();
const connection = require('../models/sequelize').connection;
let app = require('..');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/**
 * Sync database => not supported by ibmi dialect
 */
/* connection.sync({force: true})
    .then(() => {
        let server = http.createServer(app);
        server.listen(port);
    })*/

    /**
    * Create HTTP server.
    */
    let server = http.createServer(app);
    server.listen(port);
    console.log('Server started on port ' + process.env.PORT);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}