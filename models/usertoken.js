
import { config } from '../services/config.js';;
import mysql from 'mysql2';
import Sequelize from 'sequelize'
import { sequel } from '../services/db.js';
import { User } from './user.js';
// import { sequel } from '../index.js';;
// const sequel = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: config.dialect,
//     operatorsAliases: false,

//     pool: {
//       max: config.pool.max,
//       min: config.pool.min,
//       acquire: config.pool.acquire,
//       idle: config.pool.idle
//     }
//   }
// );
const UserToken = sequel.define("userToken", {
    userId: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  token: {
    type: Sequelize.DataTypes.STRING(2048),
    allowNull: false
  },
  expirationDate:{
    type:Sequelize.DataTypes.DATE,
    allowNull: false
  }
  
});
UserToken.belongsTo(User,{
  foreignKey: 'userId', targetKey: 'id'
});
sequel.sync().then(() => {
  console.log('userToken table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


export { UserToken };