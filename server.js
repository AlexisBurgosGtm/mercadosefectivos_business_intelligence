var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const execute = require('./connection');
const { send } = require("process");
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

app.get("/getempresas", async function(req,res){
  let qry = `SELECT EMPNIT, NOMBRE, VENTAS,COSTO,UTILIDAD,MARGEN,OBJETIVO, UNIVERSO FROM BI_EMPRESAS_RESUMEN`
  execute.Query(res,qry);
}); 


//**  REPORTE SE MARCAS ****/
app.get('/getmarcas', async function(req,res){

  const {empnit,anio,mes} = req.query;

  let qry = `SELECT CODMARCA, DESMARCA, ROUND(SUM(ISNULL(TOTALCOSTO,0)),2) AS TOTALCOSTO, ROUND(SUM(ISNULL(TOTALPRECIO,0)),2) AS TOTALPRECIO
            FROM BI_RPT_GENERAL
            WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
            GROUP BY CODMARCA, DESMARCA
            ORDER BY SUM(TOTALPRECIO) DESC`
  
  
            execute.Query(res,qry);
  
})

app.get('/getclientesmarca', async function(req,res){
  const {empnit, codmarca, anio, mes} = req.query;

  let qry = `SELECT   distinct COUNT(NOMBRECLIENTE) AS CONTEO FROM BI_RPT_GENERAL WHERE
  (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes}) AND (CODMARCA=${codmarca}) AND (TIPO='FAC')`
  execute.Query(res,qry);
  
})

app.get('/getmarcasfecha', async function(req,res){

  const {empnit, codmarca, anio, mes} = req.query;

  let qry = `SELECT CODMARCA, DESMARCA, TIPO, FECHA, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO
          FROM BI_RPT_GENERAL
          WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
          GROUP BY CODMARCA, DESMARCA, TIPO, FECHA
          HAVING (CODMARCA = ${codmarca})`

  execute.Query(res,qry);

})

app.get('/getmarcasvendedor', async function(req,res){

  const {empnit, codmarca, anio, mes} = req.query;

  let qry = `SELECT CODMARCA, DESMARCA, NOMEMPLEADO, TIPO, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO
              FROM BI_RPT_GENERAL
              WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
              GROUP BY CODMARCA, DESMARCA, TIPO, NOMEMPLEADO
              HAVING (CODMARCA = ${codmarca})`

  execute.Query(res,qry);

})


app.get('/getmarcasmunicipio', async function(req,res){

  
  const {empnit, codmarca, anio, mes} = req.query;

  let qry = `SELECT BI_RPT_GENERAL.CODMARCA, BI_RPT_GENERAL.DESMARCA, 
        BI_RPT_GENERAL.TIPO, 
            BI_RPT_GENERAL.MUNICIPIO, BI_RPT_GENERAL.DEPARTAMENTO, 
            SUM(BI_RPT_GENERAL.TOTALCOSTO) AS TOTALCOSTO, 
            SUM(BI_RPT_GENERAL.TOTALPRECIO) AS TOTALPRECIO, 
            BI_EMPRESAS_RESUMEN.UNIVERSO
          FROM BI_RPT_GENERAL LEFT OUTER JOIN
            BI_EMPRESAS_RESUMEN ON BI_RPT_GENERAL.CODSUCURSAL = BI_EMPRESAS_RESUMEN.EMPNIT
          WHERE (BI_RPT_GENERAL.CODSUCURSAL = '${empnit}') AND (BI_RPT_GENERAL.ANIO = ${anio}) AND (BI_RPT_GENERAL.MES = ${mes})
          GROUP BY BI_RPT_GENERAL.CODMARCA, BI_RPT_GENERAL.DESMARCA, BI_RPT_GENERAL.TIPO, BI_RPT_GENERAL.MUNICIPIO, BI_RPT_GENERAL.DEPARTAMENTO, BI_EMPRESAS_RESUMEN.UNIVERSO
          HAVING (BI_RPT_GENERAL.CODMARCA = ${codmarca})`

  execute.Query(res,qry);

})


//********************** */
//********************** */



//Router para app NOTICIAS
//app.use('/noticias', routerNoticias);


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

