const express = require('express')
const route = express.Router()
const questionController = require('./controllers/QuestionController')
const roomController = require('./controllers/RoomController')

route.get('/', (req, res) => res.render("index", { page: 'enter-room', room_not_found: false }))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.get('/room/:room', roomController.open)
route.post('/enter-room', roomController.enter)
route.post('/create-room', roomController.create)

route.post('/question/:room/:question/:action', questionController.index)
route.post('/create-question/:room', questionController.create)

module.exports = route
