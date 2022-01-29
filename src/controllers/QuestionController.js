const Database = require("../db/config.js")

module.exports = {
    index(req, res) {
        const db = Database()
        const room_id = req.params.room
        const question_id = req.params.question
        const action = req.params.action
        const password = req.body.password

        db.room_get(room_id).then((room) => {
            if(room.password == password) {
                if(action == "delete") {
                    db.question_delete(question_id)
                      .then( _ => { res.redirect(`/room/${room_id}`) })
                }
                else if(action == "read") {
                    db.question_mark_as_read(question_id)
                      .then( _ => { res.redirect(`/room/${room_id}`) })
                }
            }
            else {
                res.render("wrong-pass", {roomId: room_id})
            }
        })
    },

    async create(req, res) {
        const db = Database()
        const question = req.body.question
        const room_id = req.params.room

        db.question_create(question, room_id)
                           .then( _ => { res.redirect(`/room/${room_id}`) } )
    }
}
