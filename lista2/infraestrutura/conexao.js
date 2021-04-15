const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '',
    //port: 3308,
    user: 'root',
    password: 'root',
    database: 'lista'
})

module.exports = conexao