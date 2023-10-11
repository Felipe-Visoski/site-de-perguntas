const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const pergunta1 = require("./database/Pergunta1");
const Resposta = require("./database/Resposta");
//Base
connection
    .authenticate()
    .then(()=> {
     console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log("msgerro");
    }) 

// estou dizendo o para express para usar o ejs como view engine
app.set('view engine','ejs');
app.use(express.static('public'));
//body Parses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Rotas
app.get("/",(req,res)=> {
    pergunta1.findAll({raw: true, order:[
        ["id","DESC"]
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    });
   
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
})


app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    pergunta1.create({
        titulop: titulo,
        descricao: descricao
        
    }).then(() =>{
        res.redirect("/");
    })
});

app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    pergunta1.findOne({
        where: {id: id}
    }).then(perguntas =>{
        if(perguntas != undefined){
            Resposta.findAll({
                where: {perguntaID: perguntas.id},
                order:[
                    ["id","desc"]
            
            ]
            }).then(resposta=>{
                res.render("pergunta",{
                    perguntas: perguntas,
                    resposta: resposta
                });
            })
           
        }else{
            res.redirect("/")
        }
    })
});

app.post("/responder",(req,res)=>{
    var corpo= req.body.corpo;
    var perguntaID= req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID
    }).then(()=>{
        res.redirect("/pergunta/"+perguntaID)
    })
});
app.listen(9090,()=>{console.log("app rodando!");});