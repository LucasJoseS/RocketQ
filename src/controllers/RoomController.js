const Database = require('../db/config.js')

module.exports = {
    create(req, res) {
        let room_id = ''
        const password = req.body.password

        for(var i = 0; i< 6; i++) {
            room_id += Math.floor(Math.random() * 10).toString()
        }

        const db = Database()

        var room_exists
        db.rooms_id().then( rooms => { room_exists = rooms.some(room => room == room_id) })

        if(!room_exists) {
            db.room_create(room_id, password)
              .then( _ => { res.redirect(`/room/${room_id}`) })
        } else {
            this.create(req, res)
        }
    },

    open(req, res) {
        const room_id = req.params.room
        const db = Database()

        Promise.all([db.questions_read(room_id), db.questions_unread(room_id)])
               .then((questions) => {
                   const read = questions[0]
                   const unread = questions[1]
                   const have_questions = read.length > 0 || unread.length > 0

                   res.render("room", {
                       roomId: room_id,
                       haveQuestions: have_questions,
                       questionsRead: read,
                       questionsUnread: unread
                   })
               })
    },

    async enter(req, res) {
        const room_id = req.body.roomId
        res.redirect(`/room/${room_id}`)
    }
}
