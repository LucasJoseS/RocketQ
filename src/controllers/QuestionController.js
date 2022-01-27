const Database = require("../db/config.js")

module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password

        const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        if(room.password == password){
            if(action == 'delete'){
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            }
            else if(action == 'read'){
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }

            res.redirect(`/room/${roomId}`)
        }
        else {
            res.render("wrong-pass", {roomId: roomId})
        }
    },

    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions (body, read, room) VALUES ("${question}", 0, ${roomId})`)

        res.redirect(`/room/${roomId}`)
    }
}
