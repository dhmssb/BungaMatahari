//require ('dotenv').config()
const express = require ('express')
const bodyParser = require ('body-parser')
const swaggerUi = require('swagger-ui-express');


const swaggerDocument = require('./swagger.json');
const router = require('./app/routers/router')
const db = require ('./app/config/dbconfig')

//const {PORT, NODE_ENV } = process.env;

const PORT = 9000
const app = express()


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router)


const server = app.listen(PORT,() =>{  
    console.log(`Express is running on port ${PORT} and use $!{NODE_ENV}`)
})