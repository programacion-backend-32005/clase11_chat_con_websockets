const express   = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const viewsRouter = require('./routes/views.router.js')

const app = express()
const httpServer = app.listen(8080, () => console.log('Listening on PORT 8080...'))

const io = new  Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use('/', viewsRouter)

let messages = []
io.on('connection', socket => {
    console.log('New client connected');

    // Escucha los mensajes de un user
    socket.on('message', data => {
        messages.push(data) // Guardamos el mensaje

        // Emitimos el mensaje para los demas
        io.emit('messageLogs', messages)
    })
})