'use strict';

require('dotenv').config();
const server = require('./src/server');
const { db } = require('./src/auth/models/');
const PORT = process.env.PORT || 3001;

db.sync()
  .then(() => {
    server.start(PORT);
  })
  .catch((e) => console.log('Error starting server'));