const uuid = require('uuid');
const express = require('express');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug')

const {auth, requiresAuth} = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'bWUNFvT10QJBoWqZn7b4MYAfwMFS8q8C',
    issuerBaseURL: 'https://dev-00wdj4huibiu7y8p.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.render('index', {user: req.oidc.user})
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.render('profile', {user: req.oidc.user})
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
