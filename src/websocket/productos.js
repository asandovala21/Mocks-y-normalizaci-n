import productosApi from '../api/productos.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('productos', await productosApi.getAll());

    socket.on('update', async producto => {
        await productosApi.save(producto)
        sockets.emit('productos', await productosApi.getAll());
    })
}