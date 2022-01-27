const Database = require('../db/config.js')

module.exports = {
    async create(req, res) {
        let newRoom = ''
        const pass = req.body.password

        for(var i = 0; i< 6; i++) {
            newRoom += Math.floor(Math.random() * 10).toString()
        }

        const db = await Database()

        /* Check the existence of the room */
        const rooms = await db.all("SELECT id FROM rooms")
        const roomExist = rooms.some(room => room == newRoom)

        /* Create the room */
        if (!roomExist) {
            await db.run(`INSERT INTO rooms (id, password) values (${newRoom}, ${pass})`)
            res.redirect(`/room/${newRoom}`)
            await db.close()
            
            return true
        }
        
        await create(req, res)
    },

    async open(req, res) {
        const roomId = req.params.room
        const db = await Database()

        const questionsUnread = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
        const haveQuestions = questionsRead.length > 0 || questionsUnread.length > 0

        res.render("room", {
            roomId: roomId,
            haveQuestions: haveQuestions,
            questionsUnread: questionsUnread,
            questionsRead: questionsRead
        })
    },

    async enter(req, res) {
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
}
