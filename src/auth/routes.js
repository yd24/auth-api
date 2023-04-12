'use strict';

const express = require('express');

const { users } = require('./models/index');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer');
const logger = require('./middleware/logger');
const acl = require('./middleware/acl');

const router = express.Router();

router.post('/signup', logger, handleSignUp);
router.post('/signin', logger, handleSignIn);

router.get('/secret', logger, handleSecret);
router.get('/users', logger, handleUsers);

function handleSignUp(req, res, next) {
  res.send('Signed up');
}

function handleSignIn(req, res, next) {
  res.send('Signed in');
}

function handleSecret(req, res, next) {
  res.send('Secret hit');
}

function handleUsers(req, res, next) {
  res.send('Users hit');
}

module.exports = router;