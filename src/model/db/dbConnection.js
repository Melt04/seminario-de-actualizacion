const mysql = require('mysql')

class DataBaseHandler {
  constructor (host, port, user, password, db) {
    console.log(db)
    this.connection = mysql.createConnection({
      host,
      port,
      user,
      password,
      database: db
    })
  }

  async connect () {
    return new Promise((resolve, reject) => {
      this.connection.connect(error => {
        if (error) {
          console.log(error)
          reject(new Error('Cant connect to db'))
          return
        }
        console.log(`Connected`)
        resolve()
      })
    })
  }

  async query (params) {
    return new Promise((resolve, reject) => {
      this.connection.query(params, (error, queryResults) => {
        if (error) {
          console.error('Erorr while executing query', error)
          reject(new Error('Cant execute query'))
        } else {
          resolve(queryResults)
        }
      })
    })
  }
}

module.exports = {
  DataBaseHandler
}
