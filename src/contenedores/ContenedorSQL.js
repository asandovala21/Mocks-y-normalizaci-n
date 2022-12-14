import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async getById(id) {
        try {
            const [rowDataPacket] = await this.knex.select('*').from(this.tabla).where('id', id)
            if (!rowDataPacket) throw 'elemento no encontrado'
            return asPOJO(rowDataPacket)
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll(criterio = {}) {
        try {
            const elems = await this.knex.select('*').from(this.tabla).where(criterio)
            const pojos = elems.map(e => asPOJO(e))
            return pojos
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(elem) {
        try {
            const [newId] = await this.knex.insert(elem).into(this.tabla)
            elem.id = newId
            return asPOJO(elem)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(elem) {
        elem.id = Number(elem.id)
        try {
            await this.knex.update(elem).from(this.tabla).where('id', elem.id)
            return asPOJO(elem)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            return this.knex.delete().from(this.tabla).where('id', id)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll(criterio = {}) {
        try {
            return this.knex.delete().from(this.tabla).where(criterio)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default ContenedorSQL