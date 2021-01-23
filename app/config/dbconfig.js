const env = require ('./env')
//require("dotenv").config();
const Sequelize = require ('sequelize')

//const { DATABASE,USERNAME,PASS,HOST,PORT_DB,DIALECT } = process.env;


const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: 5432,
    dialect: env.dialect,
  
  })

  //test koneksi
  sequelize
    .authenticate()
    .then((res) => {
        console.log("CONNECTION_SUCCESS");
      })
    .catch((err) => console.log("FAILED_TO_CONNECT ", err));
  
 
  
const db = {}
  db.Sequelize = Sequelize
  db.sequelize = sequelize


db.Customer = require('../models/customer.model.js')(sequelize, Sequelize)
   
  module.exports = db