var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('../connection');
const { send } = require("process");
var routerMarcas = require('./router/routerMarcas');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 4700;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'https://business-intelligence-mercados.herokuapp.com');
       // Website you wish to allow to connect
       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
        // Set to true if you need the website to include cookies in the requests sent
      res.setHeader('Access-Control-Allow-Credentials', true);
  
  console.log("/" + req.toString());
  next();
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, pplication/json');
    // Set to true if you need the website to include cookies in the requests sent
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


app.get("/",function(req,res){
  //execute.start();
	res.sendFile(path + 'index.html');
  //let html =`<h1>Hola mundo</h1>`
  //res.send(html)
}); 


//Router para MARCAS
app.use('/marcas', routerMarcas);


app.get("/getempresas", async function(req,res){
  let qry = `SELECT EMPNIT, NOMBRE, VENTAS,COSTO,UTILIDAD,MARGEN,OBJETIVO, UNIVERSO FROM BI_EMPRESAS_RESUMEN`
  execute.Query(res,qry);
}); 









//********************** */
//********************** */





app.use("/",router);

app.use("*",function(req,res){
  //res.redirect('/');
  res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
});




// SOCKET HANDLER
io.on('connection', function(socket){
  
  socket.on('avisos', (tipo,mensaje)=>{
    io.emit('avisos', tipo, mensaje);
  });
   
  
});


http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});

