// console.log('test');

//express - ekspreso serveris
//pg - integracija su PSql duombaze
//dotenv - prisijungimo duomenu pasidejimui duombazei

const express = require('express'); //require pasiima is modules express
const app = express();

//prisijungima prie duombazes 
const pool = require('./database');

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
//  GET     /users - route mums grazins visus users
app.get('/users', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    //select * from users
    
    try {
        const results = await pool.query("select * from users");    
        res.status(200).json(results.rows);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});

//  GET     /users/:id - route mums viena 1 users
app.get('/users/:id', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    //select * from users
    
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from users where id=$1`,[id]);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
//  POST         /users - route sukurs users
app.post('/users', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        
        const {id, username, password} = req.body;

        const results = await pool.query(`insert into users (id,username,"password")  values (${id}, '${username}','${password}') returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(201).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
//  PUT/PATCH     /users/:id - route redaguos users
app.put('/users/:id', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        

        const id = req.params.id;
        const {username, password} = req.body;

        const results = await pool.query(`update users 
            set username = '${username}', 
            "password" = '${password}' 
            where id = ${id} 
            returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
//  DELETE     /users/:id  - istrins users
app.delete('/users/:id', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        

        const id = req.params.id;

        const results = await pool.query(`delete from users where id = ${id}`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json({message: 'Elementas sėkmingai ištrintas'});
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});

// Products routes

//  GET     /products - route mums grazins visus users
app.get('/products', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    //select * from users
    
    try {
        const results = await pool.query("select * from products");    
        res.status(200).json(results.rows);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
//  GET     /products/:id - route mums viena 1 products
app.get('/products/:id', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    //select * from users
    
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from products where id=$1`,[id]);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
//  POST         /products - route sukurs products
app.post('/products', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        
        const {title, description, price} = req.body;

        const results = await pool.query(`insert into products (title, description, price)  values ('${title}', '${description}',${price}) returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(201).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
// duomenu bazes stulpelis float4, "10.44", node.js price yra skaicius, iki duombazes '10.44', kala error 
//  PUT/PATCH     /products/:id - route redaguos products
app.put('/products/:id', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        

        const id = req.params.id;
        const {title, description, price} = req.body;

        const results = await pool.query(`update products 
            set title = '${title}', 
            description = '${description}',
            price = ${price}
            where id = ${id} 
            returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(200).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});
//  DELETE     /products/:id  - istrins users
app.delete('/products/:id', async (req, res) => {
    
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
        

        const id = req.params.id;

        // const results = await pool.query(`delete from products where id = ${id}`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        

        res.status(200).json({message: 'Kazkas ivyko blogai'});
        //
        // res.status(200).json({message: 'Elementas sėkmingai ištrintas'});



        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
    
});

//Nesaugu API, su siais routes:
    
    // GET /products - atvaizduoti visus produktus
	// GET /products/1 - atvaizduoti konkretų produktą
	// POST /products - sukurti naują produktą
	// PUT /products/:id - redaguoti produktą
	// DELETE /products/:id - ištrinti produktą

    // GET     /users - route mums grazins visus users 
    // 
    // 
    // 
    // ...

// API su 10 endpoint
//  GET /products - atvaizduoti visus produktus. 
    // 1. Kreiptis /products GET
    // 2. patikrinti ar yra tinkamas response. Status kodo patikra. 200
    // 3. Reikia response laika
    // 4. Patikrinti ar ne tuscias ir patikrinti ar tai nera error zinute



// /users reikia gauti visų vartotojų sąrašą iš lentelės users
// 1. API turi prisijungti prie DB x
// 2. Kelia /users x
// 3. Per postman atvaizduoti users JSON formatu


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});