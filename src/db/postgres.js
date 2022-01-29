const { Pool } = require('pg')

module.exports = () => {
    return {
        _pool: new Pool(
            {
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            }),
        room_get(room_id) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`SELECT * FROM rooms WHERE id = ${room_id}`)
                        .then(res => { resolve(res.rows[0]) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        room_create(room_id, room_password) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`INSERT INTO rooms (id, password) VALUES (${room_id}, '${room_password}')`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        rooms_id() {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`SELECT id FROM rooms`)
                        .then(res => { resolve(res.rows) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        question_delete(question_id) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`DELETE FROM questions WHERE id = ${question_id}`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        question_mark_as_read(question_id) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`UPDATE questions SET read = 1 WHERE id = ${question_id}`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        question_create(question_body, room_id) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`INSERT INTO questions (body, read, room) VALUES ('${question_body}', 0, ${room_id})`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        questions_unread(room_id) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`SELECT * FROM questions WHERE room = ${room_id} and read = 0`)
                        .then(res => { resolve(res.rows) })
                        .catch(err => { reject(err) })
                        .finally(_ => { client.release() })
                })
            })
        },
        questions_read(room_id) {
            return new Promise((resolve, reject) => {
                this._pool.connect().then(client => {
                    client.query(`SELECT * FROM questions WHERE room = ${room_id} and read = 1`)
                          .then(res =>  { resolve(res.rows) })
                          .catch(err => { reject(err) })
                          .finally(_ => { client.release() })
                })
            })
        },
    }
}
