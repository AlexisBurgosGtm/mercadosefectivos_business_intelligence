var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');

//const execute = require('./router/connection');
//const { send } = require("process");
var routerMarcas = require('./router/routerMarcas');
var routerEmpresas = require('./router/routerEmpresas');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 4700;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(
  cors({
        origin: ['https://business-intelligence-mercados.herokuapp.com','http://127.0.0.1:3000'],
        method: ['POST','GET']
      })
 );

// Configurar cabeceras y cors
app.use(
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
    // Set to true if you need the website to include cookies in the requests sent
  //res.setHeader('Access-Control-Allow-Credentials', true);
  cors({
    origin: ['https://business-intelligence-mercados.herokuapp.com','http://127.0.0.1:3000'],
    method: ['POST','GET']
  })
  //next();
);

app.use("/",router);

app.use("*",function(req,res){
  //res.redirect('/');
  //res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
	res.sendFile(path + 'favicon.png');
});

app.get("/",function(req,res){
  //execute.start();
	res.sendFile(path + 'favicon.png');
 
  //res.send('<h1>Acceso Restringido</h1>')
}); 


//Router para MARCAS
app.use('/marcas', routerMarcas);

app.use('/empresas', routerEmpresas);






// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('navegar', (vista)=>{
    io.emit('navegar', vista);
  });
   
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

