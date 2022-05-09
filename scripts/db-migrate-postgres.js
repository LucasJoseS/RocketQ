const Database = require("../src/db/postgres")

const Migrate = {
  async init() {
    const db = Database()

    await db._pool.query(`CREATE TABLE IF NOT EXISTS rooms (id INTEGER PRIMARY KEY, password TEXT)`)
    await db._pool.query(`CREATE TABLE IF NOT EXISTS questions (id SERIAL, body TEXT, read INT, room INTEGER)`)
    await db._pool.end()
  }
}

Migrate.init()
