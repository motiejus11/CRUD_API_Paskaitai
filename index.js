// console.log('test');

//express - ekspreso serveris
//pg - integracija su PSql duombaze
//dotenv - prisijungimo duomenu pasidejimui duombazei

const express = require('express'); //require pasiima is modules express
const app = express();

//prisijungima prie duombazes 

app.use(express.json());//requestam ir responsem

//Apsirasyti ROUTES - kelias
//  GET     /products - route mums grazins visus produktus
//  GET     /products/:id - route mums viena 1 produkta
//  POST         /products/create - route sukurs produkta
//  PUT/PATCH     /products/update/:id - route redaguos produkta
//  DELETE     /products/delete/:id  - istrins produkta

//req - request
//res - response
//localhost:3000/products
//{ message: 'Sėkmingai pasiekiamas produktų puslapis'} status kodas 200
app.get('/products', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    try {
        res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});