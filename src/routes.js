const express = require('express')
const route = express.Router()
const questionController = require('./controllers/QuestionController')
const roomController = require('./controllers/RoomController')

route.get('/', (req, res) => res.render("index", { page: 'enter-room' }))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.get('/room/:room', (req, res) => res.render("room"))

route.post('/question/:room/:question/:action', (req, res) => questionController.index(req, res))
route.post('/create-room', roomController.create)

module.exports = route
