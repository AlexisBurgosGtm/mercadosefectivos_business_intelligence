var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./connection');
//var routerNoticias = require('./router/routerNoticias');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 4700;

app.use(bodyParser.json());

app.use(express.static('build'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.get("/",function(req,res){
  //execute.start();
	res.sendFile(path + 'index.html');
  //let html =`<h1>Hola mundo</h1>`
  //res.send(html)
}); 

app.get("/getempresas", async function(req,res){
  let qry = `SELECT EMPNIT, NOMBRE, VENTAS,COSTO,UTILIDAD,MARGEN,OBJETIVO, UNIVERSO FROM BI_EMPRESAS_RESUMEN`
  execute.Query(res,qry);
}); 


app.get('/getmarcas', async function(req,res){

  const {empnit,anio,mes} = req.query;

  let qry = `SELECT CODMARCA, DESMARCA, ROUND(SUM(ISNULL(TOTALCOSTO,0)),2) AS TOTALCOSTO, ROUND(SUM(ISNULL(TOTALPRECIO,0)),2) AS TOTALPRECIO
            FROM BI_RPT_GENERAL
            WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
            GROUP BY CODMARCA, DESMARCA
            ORDER BY SUM(TOTALPRECIO) DESC`

  execute.Query(res,qry);
  
})

//Router para app NOTICIAS
//app.use('/noticias', routerNoticias);


app.use("/",router);

app.use("*",function(req,res){
  res.redirect('/');
  //res.send('<h1 class="text-danger">NO DISPONIBLE</h1>');
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

