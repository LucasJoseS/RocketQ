const Database = require('../db/config.js')

module.exports = {
    async create(req, res) {
        let roomId = ''
        const pass = req.body.password

        for(var i = 0; i< 6; i++) {
            roomId += Math.floor(Math.random() * 10).toString()
        }

        const db = await Database()
        await db.run(`INSERT INTO rooms (id, password) values (${roomId}, ${pass})`)
        await db.close()

        res.redirect(`/room/${roomId}`)
    }
}
