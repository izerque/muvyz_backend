require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('./config');
const env = process.env.NODE_ENV || 'development';
const { database, username, password, host, dialect, port } = config[env];

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});


// sequelize.sync({force: true}).then(()=>{
//   console.log("Shychroniced")
// }).catch(()=>{
//   console.log("S")
// })

module.exports = sequelize;
