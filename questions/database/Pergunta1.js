const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta',{
    titulop:{
        type: Sequelize.TEXT,
        allownull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allownull: false
    }
    
    

});


Pergunta.sync({force: false}).then(()=>{});

module.exports = Pergunta;