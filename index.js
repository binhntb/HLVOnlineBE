
//Declare variables
import express, { json } from 'express';
import mysql from 'mysql2';
import { config } from './services/config.js';
import cors from 'cors';
import { router as loginRoutes } from './routes/loginRoutes.js';
import fs from 'fs';
import Sequelize from 'sequelize'

// const Sequelize = require("sequelize");
const sequel = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const app = express();
const PORT = 8000;
// const con = mysql.createConnection(config);
// Setup project
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors()) 
app.use('/login', loginRoutes);

//Start the application
app.listen(PORT, function () {
    console.log(`Node server running @ http://localhost:${PORT}`);
});
sequel.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
// export {sequel};
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!!!")
// });




