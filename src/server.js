'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

module.exports = {
    app,
    start: (port) => app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    }),
};

