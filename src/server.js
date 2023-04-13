'use strict';

//dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//error handler middleware
const error404 = require('./error-handlers/404');
const error500 = require('./error-handlers/500');

//routers
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');
const logger = require('./auth/middleware/logger');
const bearerAuth = require('./auth/middleware/bearer');
const account = require('./auth/routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//routes
app.use('/', logger, account);
app.use('/api/v1', v1);
app.use('/api/v2', bearerAuth, v2);

app.use('*', error404);
app.use(error500);

module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  }),
};

