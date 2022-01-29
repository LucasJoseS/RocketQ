const Database = require('./config.js')

const initDb = {
    async init() {
        const db = Database()
        var connection
        await db._connection().then(con => { connection = con }) 
        
        await connection.exec(`CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY, password TEXT)`)
        await connection.exec(`CREATE TABLE IF NOT EXISTS  questions (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT, read INT, room INTEGER)`)
        await connection.close()
    }
}

initDb.init()
