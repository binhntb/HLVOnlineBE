// const config = {
//     host: "localhost",
//     user: "root",
//     password: "HLVonline13@",
//     database: "testdb"
// };
const config = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "HLVonline13@",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};


export {config};