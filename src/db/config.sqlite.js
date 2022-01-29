const sqlite3 = require("sqlite3")
const { open } = require("sqlite")

module.exports = () => {
    return {
        _connection() {
            return new Promise((resolve, reject) => {
                open({ filename: './src/db/rocketq.lite', driver: sqlite3.Database })
                    .then(res => { resolve(res) })
                    .catch(err => { reject(err) })
            })
        },
        room_get(room_id) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.get(`SELECT * FROM rooms WHERE id = ${room_id}`)
                        .then(res => { resolve(res) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        room_create(room_id, room_password) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.run(`INSERT INTO rooms (id, password) VALUES (${room_id}, '${room_password}')`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        rooms_id() {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.all(`SELECT id FROM rooms`)
                        .then(res => { resolve(res) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        question_delete(question_id) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.run(`DELETE FROM questions WHERE id = ${question_id}`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        question_mark_as_read(question_id) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.run(`UPDATE questions SET read = 1 WHERE id = ${question_id}`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        question_create(question_body, room_id) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.run(`INSERT INTO questions (body, read, room) VALUES ('${question_body}', 0, ${room_id})`)
                        .then(_ => { resolve(true) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        questions_unread(room_id) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.all(`SELECT * FROM questions WHERE room = ${room_id} and read = 0`)
                        .then(res => { resolve(res) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
        questions_read(room_id) {
            return new Promise((resolve, reject) => {
                this._connection().then(client => {
                    client.all(`SELECT * FROM questions WHERE room = ${room_id} and read = 1`)
                        .then(res => { resolve(res) })
                        .catch(err => { reject(err) })

                    client.close()
                })
            })
        },
    }
}
