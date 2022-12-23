import { promises as fs } from 'fs'

class ContenedorArchivo {

    constructor(ruta)
    {
        this.ruta = ruta;
    }

    save= async (producto)=>{
    try { 
        if( fs.existsSync(this.ruta)){
            let result= await this.getAll()
            let lastId= result.reduce((acc, item)=> item.id>acc? acc=item.id: acc,0 )
            let newProduct={
                id: lastId+1,
                ...producto
            }
            result.push(newProduct)
            //spread operator
            await fs.writeFile(this.ruta, JSON.stringify(result,null,2));
        return lastId+1
        }else{
            let newProduct={
            id:1,
            ...producto
            }
        await fs.writeFile(this.ruta,JSON.stringify([newProduct],null,2))
            return 1
        }
    } catch (error) {
        console.log(error);
    }  
    }


    getById= async (id)=>{
        if(fs.existsSync(this.ruta)){
            let result= await this.getAll()
            let producto=result.find(item => item.id == id)

            if (producto==undefined){
                producto=[null]
            }
            
            return producto
            
        }else{
            console.log("El archivo no existe")
        }
    }
  
    deleteById = async (id) => {
        if (fs.existsSync(this.ruta)) {
            let result = await this.getAll()
            let largo_antes=result.length
            let nuevo=result.filter(item=>item.id!==id)
            if (nuevo.length == largo_antes) {
                console.log(`El id: ${id} no existe`)
            }
            else{
                try {
                await fs.writeFile(this.ruta, JSON.stringify(nuevo, null, 2))
                } catch (error) {
                console.log(error);
                }
            }            
        } else {
                console.log("El archivo no existe")
        }
    }

    deleteAll = async () => {
        if (fs.existsSync(this.ruta)) {
            let n_result =[]
            try {
                await fs.writeFile(this.ruta, JSON.stringify(n_result, null, 2))
                } catch (error) {
                console.log(error);
            }            
        } else {
                console.log("El archivo no existe")
        }
    }



    getAll= async()=>{
        try {
            if( fs.existsSync(this.ruta)){
                let result= await fs.readFile(this.ruta)
                return JSON.parse(result)
            }else{
            throw "No se encontro el archivo"
            }
            } catch (error) {
            console.log(error);
            }

    }

    update=async(elem)=> {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

}

export default ContenedorArchivo