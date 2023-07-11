import {config} from './config.js';
import mysql from 'mysql2';
import Sequelize from 'sequelize'

async function query(sql, params) {
    const connection =  mysql.createConnection(config);
    connection.query(sql, (error, results, fields) => {
        if(error) throw error
        console.log(results);
    });
}
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

export {sequel,query}; 