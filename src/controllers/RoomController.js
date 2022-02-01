const driver = process.env.DATABASE_DRIVER || "sqlite"
const Database = require(`../db/${driver}`)
const Password = require('./PasswordController')

module.exports = {
    create(req, res) {
        let room_id = ''
        const password = Password.get_password(req)

        for(var i = 0; i< 6; i++) {
            room_id += Math.floor(Math.random() * 10).toString()
        }

        const db = Database()
        
        db.rooms_id().then(rooms => {
            const room_exist = rooms.some(room => room.id == room_id)

            if (!room_exist) {
                db.room_create(room_id, password)
                    .then(_ => { res.redirect(`/room/${room_id}`) })
            } else {
                this.create(req, res)
            }
        })
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

    enter(req, res) {
        const room_id = req.body.roomId
        const db = Database()

        db.rooms_id().then(rooms => {
            const room_exist = rooms.some(room => room.id == room_id)

            if (room_exist) {
                res.redirect(`/room/${room_id}`)
            } else {
                res.render('index', { page: 'enter-room', room_not_found: true })
            }
        })
    }
}
