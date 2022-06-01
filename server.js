var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var routerMarcas = require('./router/routerMarcas');
var routerEmpresas = require('./router/routerEmpresas');
var routerUsuarios = require('./router/routerUsuarios');
var routerCobertura = require('./router/routerCobertura');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 4700;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
app.use(function (req,res,next) {
      // Website you wish to allow to connect
      //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
      res.setHeader('Access-Control-Allow-Origin', '*');
      //res.setHeader('Access-Control-Allow-Origin', 'https://business-intelligence-mercados.herokuapp.com');
      
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Methods', 'POST');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
  
  //console.log("/" + req.toString());
  next();
});



app.get("/",function(req,res){
  res.send(path + '/index.html');
}); 


//Router para MARCAS
app.use('/marcas', routerMarcas);

app.use('/empresas', routerEmpresas);

app.use('/usuarios', routerUsuarios);

app.use('/cobertura', routerCobertura);


app.use("/",router);


app.use("*",function(req,res){
  res.send(path + '/404.html');
});



// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('navegar', (vista)=>{
    io.emit('navegar', vista);
  });
   
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
