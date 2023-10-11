const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define('Resposta',{
    corpo:{
        type: Sequelize.TEXT,
        allownull: false
    },
    perguntaID:{
        type: Sequelize.INTEGER,
        allownull: false
    }
    
    

});

Resposta.sync({force: false}).then(()=>{});

module.exports = Resposta;