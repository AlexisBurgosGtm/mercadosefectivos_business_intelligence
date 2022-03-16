const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post('/get_cobertura', async function(req,res){

    const {empresas, anio, mes} = req.body;

    let qry = '';

        qry = `SELECT CODSUCURSAL, 
                        ISNULL(CODMUN,0) AS CODMUNICIPIO, 
                        ISNULL(MUNICIPIO,'SN') AS MUNICIPIO,
                        ISNULL(CODDEPTO,0) AS CODDEPTO, 
                        ISNULL(DEPARTAMENTO,'SN') AS DEPARTAMENTO, 
                        FORMAT(SUM(ISNULL(TOTALPRECIO,0)),'##.##') AS TOTALPRECIO, 
                        MAX(ISNULL(LAT,0)) AS LAT, 
                        MAX(ISNULL(LONG,0)) AS LONG
                    FROM BI_RPT_GENERAL
                    WHERE CODSUCURSAL IN(${empresas}) AND MES IN(${mes}) AND ANIO IN(${anio}) 
                    GROUP BY CODSUCURSAL, CODMUN,MUNICIPIO, CODDEPTO, DEPARTAMENTO
                    ORDER BY MUNICIPIO, DEPARTAMENTO`
    

 

     execute.Query(res,qry);
    
});


router.post('/get_marcas_municipio', async function(req,res){

    const {empresas,anio,mes,codmun, coddepto} = req.body;
    let qry = '';

        qry = `SELECT CODMARCA, DESMARCA, 
                ROUND(SUM(ISNULL(TOTALCOSTO,0)),2) AS TOTALCOSTO, 
                ROUND(SUM(ISNULL(TOTALPRECIO,0)),2) AS TOTALPRECIO,
				COUNT(CODIGO) AS CLIENTES
        FROM BI_RPT_GENERAL
        WHERE (CODSUCURSAL = '${empresas}') AND (ANIO = ${anio}) AND (MES = ${mes}) AND (CODMUN = ${codmun}) AND (CODDEPTO=${coddepto})
        GROUP BY CODMARCA, DESMARCA
        ORDER BY SUM(TOTALPRECIO) DESC`
  
    
     execute.Query(res,qry);
    
});


module.exports = router;

