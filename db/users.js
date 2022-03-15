let pool

const crypto = require('crypto')

function register(username, password, cb) {
    let sha = crypto.createHash('sha256').update(password).digest('hex')
    const sql = `insert into users (username, user_password) values ('${username}', '${sha}')`
    pool.query(sql, cb)
}

function getUser(username, password, cb) {
    let sha = crypto.createHash('sha256').update(password).digest('hex')
    const sql = `select * from users where username = '${username}' and user_password = '${sha}'`
    pool.query(sql, resp=>{
        cb(false, resp.result && resp.result.rowCount === 1?resp.result.rows[0]:null)
    })
}

function isValidUser(username, cb) {
    const sql = `select * from users where username = '${username}'`
    pool.query(sql, resp=>{
        cb(resp.error, resp.result?!(resp.result.rowCount>0):null)
    })
}

module.exports = injectedPgPool => {
    pool = injectedPgPool
    return {
        register: register,
        getUser: getUser,
        isValidUser: isValidUser
    }
}