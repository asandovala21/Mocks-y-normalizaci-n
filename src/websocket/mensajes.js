import mensajesApi from '../api/mensajes.js'
import { normalizarMensajes } from '../utils-normalizar/normalizar-mensajes.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', normalizarMensajes(await mensajesApi.getAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.save(mensaje)
        sockets.emit('mensajes', normalizarMensajes(await mensajesApi.getAll()));
    })
}