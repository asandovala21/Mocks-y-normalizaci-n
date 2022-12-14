import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import ContenedorSQL from './contenedores/ContenedorSQL.js'

import config from './config.js'

// servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

// socket

io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', await productosApi.getAll());

    // actualizacion de productos
    socket.on('update', async producto => {
        await productosApi.save(producto)
        io.sockets.emit('productos', await productosApi.getAll());
    })

    // carga inicial de mensajes
    socket.emit('mensajes', await mensajesApi.getAll());

    // actualizacion de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.save(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.getAll());
    })
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// servidor: puerto

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
