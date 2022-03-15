let pool

function saveAccessToken(accessToken, userId, cb) {
    const sql = `insert into access_tokens (access_token, user_id) values ('${accessToken}', '${userId}')`
    pool.query(sql, resp=>cb(resp.error))
}

function getUserIdFromBearerToken(bearerToken, cb) {
    const sql = `select * from access_tokens where access_token = '${bearerToken}'`
    pool.query(sql, resp=>cb(resp.result && resp.result.rowCount===1?resp.result.rows[0].user_id:null))
}

module.exports = injectedPgPool => {
    pool = injectedPgPool
    return {
        saveAccessToken: saveAccessToken,
        getUserIdFromBearerToken: getUserIdFromBearerToken
    }
}