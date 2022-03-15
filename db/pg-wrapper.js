const { Pool } = require('pg/lib')

function query(sql, cb) {
    const pool = new Pool({
        user: 'rssadmin',
        host: 'localhost',
        database: 'rssdb',
        password: '1234',
        port: 5432
    })

    pool.query(sql, (err, result)=>{
        cb({error: err, result: result?result:null})
    })
}

module.exports = {
    query: query
}