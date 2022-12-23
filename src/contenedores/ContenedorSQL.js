import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async getById(id) {
        try {
            return this.knex.select('*').from(this.tabla).where('id', id)
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async getAll() {
        try {
            return this.knex.select('*').from(this.tabla)
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(elem) {
        try {
            return this.knex.insert(elem).into(this.tabla)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(elem) {
        try {
            return this.knex.from(this.tabla).where('id', elem.id).update(elem)
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

    async deleteAll() {
        try {
            return this.knex.delete().from(this.tabla)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async disconnect() {
        await this.knex.destroy();
    }
}

export default ContenedorSQL