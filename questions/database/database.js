// imports
const Sequelize = require('sequelize');
// conecction database
const connection = new Sequelize('siteperguntas','root','123456789',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;