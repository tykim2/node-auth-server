let userDb
let tokenDb


function getClient(clientId, clientSecret, cb) {
    console.log('getClient')
    cb(false, {clientId, clientSecret, grant: null, redirectUris: null})
}

function grantTypeAllowed(clientId, grantType, cb) {
    console.log('grantTypeAllowd')
    cb(false, true)
}

function getUser(username, password, cb) {
    console.log('getUser')
    userDb.getUser(username, password, cb)
}

function saveAccessToken(accessToken, clientId, expires, user, cb) {
    console.log('saveAccessToken')
    tokenDb.saveAccessToken(accessToken, user.id, cb)
}

function getAccessToken(bearerToken, cb) {
    console.log('getAccessToken')
    tokenDb.getUserIdFromBearerToken(bearerToken, userId=>{
        cb(userId===null, userId===null?null:{user:{id:userId}, expires: null})
    })
}

module.exports = (injectedUserDb, injectedTokenDb) => {
    userDb = injectedUserDb
    tokenDb = injectedTokenDb

    return {
        getClient: getClient,
        saveAccessToken: saveAccessToken,
        getUser: getUser,
        grantTypeAllowed: grantTypeAllowed,
        getAccessToken: getAccessToken
    }
}

