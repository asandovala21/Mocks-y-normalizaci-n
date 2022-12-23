import express from 'express'

import config from './config.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import productosApiRouter from './api-router/productos.js'

import addProductosHandlers from './websocket/productos.js'
import addMensajesHandlers from './websocket/mensajes.js'

// servidor, websocket, api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// configuración websocket

io.on('connection', async socket => {
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});

// middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// rutas API REST

app.use(productosApiRouter)

// conexión servidor

const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
