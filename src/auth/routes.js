'use strict';

const express = require('express');

const { users } = require('./models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const logger = require('./middleware/logger');
const acl = require('./middleware/acl');

const router = express.Router();

router.post('/signup', logger, handleSignUp);
router.post('/signin', logger, basicAuth, handleSignIn);

router.get('/secret', logger, bearerAuth, handleSecret);
router.get('/users', logger, bearerAuth, acl, handleUsers);

function handleSignUp() {
  console.log('Signed up');
}

function handleSignIn() {
  console.log('Signed in');
}

function handleSecret() {
  console.log('Secret hit');
}

function handleUsers() {
  console.log('Users hit');
}

module.exports = router;