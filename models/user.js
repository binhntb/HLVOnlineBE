
import { config } from '../services/config.js';;
import { sequel } from '../services/db.js';

import mysql from 'mysql2';
import Sequelize from 'sequelize'

const User = sequel.define("users", {
  userName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING,
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
  }
});
sequel.sync().then(() => {
  console.log('Usser table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


function register() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    const sql = "INSERT INTO `user` (`userId`, `userName`,`password`,`email`,`phone`) VALUES (NULL, ?, ?,?,?);"
    connection.query(sql, [this.userName, this.password, this.email, this.phone], (error, results, fields) => {
      if (error) reject(new Error(error));
      else resolve(results);
    });
  })
};



// function getUserByUsername(username) {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     const sql = "SELECT * FROM user WHERE user.userName = ? "
//     connection.query(sql, [username], (error, results, fields) => {
//       if (error) reject(new Error(error));
//       else resolve(results);
//     });
//   })
// };

// function getUserByEmail(email) {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     const sql = "SELECT * FROM user WHERE user.email = ? "
//     connection.query(sql, [email], (error, results, fields) => {
//       if (error) reject(new Error(error));
//       else resolve(results);
//     });
//   })
// };
// class User {
//     constructor(userId, userName, password, email, phone) {
//         this.userId = userId;
//         this.userName = userName;
//         this.password = password;
//         this.email = email;
//         this.phone = phone;
//     }
//     getId() {
//         return this.userId;
//     }
//     setId(userId) {
//         this.userId = userId;
//     }
//     getName() {
//         return this.userName;
//     }
//     setName(userName) {
//         this.userName = userName;
//     }
//     getEmail() {
//         return this.email;
//     }
//     setEmail(email) {
//         this.email = email;
//     }
//     getPhone(){
//         return this.phone;
//     }
//     setPhone(phone) {
//         this.phone = phone;
//     }

//     register() {
//         return new Promise((resolve, reject) => {
//             const connection = mysql.createConnection(config);
//             const sql = "INSERT INTO `user` (`userId`, `userName`,`password`,`email`,`phone`) VALUES (NULL, ?, ?,?,?);"
//             connection.query(sql, [this.userName,this.password,this.email,this.phone], (error, results, fields) => {
//                 if (error) reject(new Error(error));
//                 else resolve(results);
//             });
//         })
//     };

//     getUserByUsername(username) {
//         return new Promise((resolve, reject) => {
//             const connection = mysql.createConnection(config);
//             const sql = "SELECT * FROM user WHERE user.userName = ? "
//             connection.query(sql, [username], (error, results, fields) => {
//                 if (error) reject(new Error(error));
//                 else resolve(results);
//             });
//         })
//     };

//     getUserByEmail(email) {
//         return new Promise((resolve, reject) => {
//             const connection = mysql.createConnection(config);
//             const sql = "SELECT * FROM user WHERE user.email = ? "
//             connection.query(sql, [email], (error, results, fields) => {
//                 if (error) reject(new Error(error));
//                 else resolve(results);
//             });
//         })
//     };

// }

export { User };