const express = require('express')
const pool = require('./db/pg-wrapper')
const tokenDb = require('./db/token')(pool)
const userDb = require('./db/users')(pool)
const oauthService = require('./auth/token-service')(userDb, tokenDb)
const oauth2Server = require('node-oauth2-server')

const app = express()
app.oauth = oauth2Server({
    model: oauthService,
    grants: ['password'],
    debug: true
})

const authenticator = require('./auth/authenticator')(userDb)
const routes = require('./auth/router')(express.Router(), app, authenticator)
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(app.oauth.errorHandler())
app.use('/auth', routes)
app.post('/test', app.oauth.authorise(), (req, res)=>{
    res.send('hello world')
})

app.listen(3000, ()=>{
    console.log('listen on port 3000')
})
