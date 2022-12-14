class ContenedorMemoria {

    constructor()
    {
    this.producto=[]
    this.id=0
    }

    save= (producto)=>{
            let newProduct={
                id: ++this.id,
                ...producto
            }
            this.producto.push(newProduct)
            return newProduct
    }


    getById=(id)=>{
            let producto=this.producto.find(item => item.id == id)
            if (producto==undefined){
                console.log("Producto no encontrado")
            }
            else{
                return producto

            }
    }
  
    deleteById = (id) => {
            let largo_antes=this.producto.length
            // console.log(largo_antes)
            let i = this.producto.findIndex(item => item.id == id)
            if (i == -1) {
               console.log(`El id: ${id} no existe`)
            } else {
              return this.producto.splice(i,1)

            }
            // console.log(nuevo)
            // console.log(nuevo.length)
   
                       
    }

    deleteAll = () => {
           this.producto =[]
    }



    getAll=()=>{
        return [...this.producto]
    }

    update=(elem)=> {
        const index = this.elementos.findIndex(p => p.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: elemento no encontrado`)
        } else {
            this.elementos[index] = elem
            return elem
        }
    }
  
}

export default ContenedorMemoria
