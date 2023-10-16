// import 
const Sequelize = require("sequelize");
const connection = require("./database");
// crete table
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