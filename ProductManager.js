import fs from "fs"

class ProductManager {
    constructor(title, description, price, thumbnail, code, stock) {
        this.products = [];
        this.path = "./products.json";
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    };
    getProducts = async () => {
        try {
            if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
                let data = await JSON.parse(fs.readFileSync(this.path,"utf-8"))
                console.log("\ngetProducts: Data Not Found... creating empty file. Please generate products and try again.\n")
                console.log(data)
            } else {
                let data = await JSON.parse(fs.readFileSync(this.path))
                console.log("\ngetProducts: Data Found Succesfully \n")
                console.log(data)
                return data
            }
        } catch (Error) {
            console.error(Error);
        }
    }
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            if (!title || !description || !price || !code || !stock) {
                throw new Error("\naddProduct \nMissing product properies, all properties must be declared.")
            };
            if (this.products.some((product) => product.code === code)) {
                throw new Error(`\naddProduct \nProduct code ${code} already exists, please change it and try again.`);
            };
            const newProduct = {
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            };
            if (this.products.length === 0) {
                newProduct.id = 1;
            }
            else {
                newProduct.id = this.products[this.products.length - 1].id + 1
            };
            this.products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 4))
            console.log(`\naddProduct:  ${newProduct.id}`)
            console.log(`Product with id ${newProduct.id}: Added succesfully`)
            return this.products;
        } catch (Error) {
            console.error(Error);
        }
    }
    getProductById = async (id) => {
        try {
            if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
                let data = await JSON.parse(fs.readFileSync(this.path,"utf-8"))
                console.log("\ngetProductById: Data Not Found... creating empty file. Please generate products and try again.\n")
                console.log(data)
            }
            const data = await JSON.parse(fs.readFileSync(this.path,"utf-8"));
            const product = data.find((product) => product.id === parseInt(id));
            if (product !== undefined) {
                console.log(`\ngetProductByID: ${id}\n`)
                console.log(product)
                return product
            }
            throw new Error(`\ngetProductByID: ${id}\nID ${id} not found, please try another product ID`)
        } catch (Error) {
            console.error(Error);
        }
    }
    updateProduct= async(id,update)=>{
        try {
            if (!fs.existsSync(this.path)) {
                return console.log("There is no data to update, please generate a product")
            }
            const data= await fs.promises.readFile(this.path,"utf-8")
            const productsCopy = JSON.parse(data)
            const index = productsCopy.findIndex((prod)=>prod.id === id)
            if(index !== -1){
                const updatedProduct = {...productsCopy[index], ...{update}};
                productsCopy[index]= updatedProduct;
                await fs.promises.writeFile(this.path,JSON.stringify(productsCopy,null,4));
                console.log(`\nupdateProduct:\n Product with id ${id} updated succesfully: \n`)
                this.products = productsCopy
                console.log(this.products);
                return this.products
            }throw new Error(`\n deleteProduct \nID ${id} Not Found`)
            
        } catch (Error) {
            console.error(Error);
        }
    }
    deleteProduct = async(id)=>{
        try {
            if (!fs.existsSync(this.path)) {
                return console.log("There is no data to delete, please generate a product")
            }
            this.products = await JSON.parse(fs.readFileSync(this.path,"utf-8"))
            const productPos = this.products.findIndex((product) => product.id === id);
            if (productPos != -1 || undefined) {
                this.products.splice(productPos, 1)
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
                console.log(`\n deleteProduct: \nProduct with id ${id} Eliminated`)
            }throw new Error(`\n deleteProduct \nID ${id} Not Found`)
        } catch (Error) {
            console.error(Error);
        }
    }
}

export default ProductManager

// let productManager = new ProductManager //Valide por mi cuenta para ver que funciona.
// productManager.getProducts() //Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod1", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod2", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod3", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod4", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod5", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod6", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod7", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod8", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod9", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "cod10", 25); //10 Productos agregados
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);//Probar duplicacion de codigo
// await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124");//Probar Faltante de campo
// await productManager.getProducts() //Confirmar addProduct
// await productManager.getProductById(1) //se corroborará que devuelva el producto con el id especificado
// await productManager.getProductById(3) //en caso de no existir, debe arrojar un error.
// await productManager.updateProduct(1, {price: 4000}) //se intentará cambiar un campo de algún producto
// await productManager.updateProduct(5, {price: 4000}) //en caso de no existir, debe arrojar un error.
// await productManager.deleteProduct(1) // se evaluará que realmente se elimine el producto
// await productManager.deleteProduct(2) // o que arroje un error en caso de no existir.
