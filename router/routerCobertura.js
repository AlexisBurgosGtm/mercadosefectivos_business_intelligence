const execute = require('./connection');
const express = require('express');
const router = express.Router();




router.post('/get_clientes_efectivos', async function(req,res){

    

    const {empresas, anio, mes} = req.body;
  
    let qry = `SELECT BI_RPT_GENERAL.CODSUCURSAL, 
                COUNT(DISTINCT BI_RPT_GENERAL.CODIGO) AS CONTEO, 
                AVG(BI_EMPRESAS_RESUMEN.UNIVERSO) AS UNIVERSO,
                SUM(TOTALPRECIO) AS TOTALPRECIO
    FROM            BI_RPT_GENERAL LEFT OUTER JOIN
                             BI_EMPRESAS_RESUMEN ON BI_RPT_GENERAL.MES = BI_EMPRESAS_RESUMEN.MES AND BI_RPT_GENERAL.ANIO = BI_EMPRESAS_RESUMEN.ANIO AND 
                             BI_RPT_GENERAL.CODSUCURSAL = BI_EMPRESAS_RESUMEN.CODSUCURSAL
    WHERE  (BI_RPT_GENERAL.CODSUCURSAL IN (${empresas})) 
        AND (BI_RPT_GENERAL.ANIO IN (${anio})) 
        AND (BI_RPT_GENERAL.MES IN (${mes})) 
        AND (BI_RPT_GENERAL.TIPO = 'FAC')
    GROUP BY BI_RPT_GENERAL.CODSUCURSAL
    ORDER BY BI_RPT_GENERAL.CODSUCURSAL`

    execute.Query(res,qry);
    
});





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

