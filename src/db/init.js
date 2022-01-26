const Database = require('./config.js')

const initDb = {
    async init() {
        const db = await Database()
        
        await db.exec(`CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY, password TEXT)`)

        await db.exec(`CREATE TABLE IF NOT EXISTS  questions (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT, read INT)`)

        await db.close()
    }
}

initDb.init()
