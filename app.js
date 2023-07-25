import ProductManager from './ProductManager.js';
import express from "express"

const app = express();
const port = 8080;
const productManager = new ProductManager();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const limit = parseInt(req.query.limit);
        if (Number.isInteger(limit)) {
            res.send(products.slice(0, limit));
        } else {
            res.send(products);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.get("/products/:id",async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id:',id)
        const product = await productManager.getProductById(id);

        if (!product) {
            res.status(404).send('Product not found');
        } else {
            res.send(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});