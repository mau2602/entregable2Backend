import fs from 'fs/promises'


class ProductManager {
    constructor(path) {
        this.path = path
        this.unique_id = 1;
    }

    async loadFile() {
        const json = await fs.readFile(this.path, 'utf-8')
        this.productsList = JSON.parse(json)
    }

    async saveFile() {
        const json = JSON.stringify(this.productsList, null, 2)
        await fs.writeFile(this.path, json)
    }

    async getProducts() {
        await this.loadFile()
        console.log(this.productsList)
    }

    async createProduct(title, description, price, thumbnail, code, stock){
            

            let producto = {
                id : this.unique_id ++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }       

            if (this.productsList.length === 0){
                this.productsList.push(producto);
                await productos.saveFile();
            }  else  {
                let found = this.productsList.find(( i => i.code === code));
                if (found){
                    console.log('Error. producto duplicado')
                }  else  {
                    this.productsList.push(producto);
                    await productos.saveFile();
                }
            }
            return producto;
    }

    async getProductByID(id){

        const found = this.productsList.find((i => i.id === id));
        if (found){
            console.log(found)
        }  else  {
            console.log('File not found');
        }
    }

    async updateProduct(newProduct){
        const updProduct = this.productsList.findIndex( pr => pr.id === newProduct.id)
        console.log(updProduct);
        if(updProduct >= 0){
            this.productsList[updProduct] = newProduct;
            await this.saveFile();
        } else {
            console.log('El producto a actualizar no existe')
        }
    }

    async deleteProduct(id){

        const byeProduct = this.productsList.findIndex( pr => pr.id === id)
        
        if(byeProduct >= 0){
            this.productsList.splice(byeProduct, 1);
            await this.saveFile();
        } else {
            console.log('El producto no existe')
        }
    }
}

const productos = new ProductManager('./products.txt')

await productos.getProducts()

await productos.createProduct("producto prueba", 'este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25)
await productos.getProducts()

await productos.createProduct("producto prueba", 'este es un producto de prueba', 200, 'imagen', 'ab23', 25)
await productos.getProducts()

await productos.getProductByID(2);

await productos.deleteProduct(3);

await productos.getProducts()

await productos.updateProduct({id: 1, title:'nuevo producto', description:'Esto es un nuevo producto', price:300, thumbnail:'producto sin imagen', code:'JSBK23', stock:45})

await productos.getProducts()




