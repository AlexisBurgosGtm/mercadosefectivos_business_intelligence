const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post('/get_cobertura', async function(req,res){

    const {empresas, anio, mes} = req.body;

    let qry = '';

        qry = `SELECT DISTINCT ISNULL(MUNICIPIO,'SN') AS MUNICIPIO, ISNULL(DEPARTAMENTO,'SN') AS DEPARTAMENTO, 
        FORMAT(SUM(ISNULL(TOTALPRECIO,0)),'##.##') AS TOTALPRECIO, 
        MAX(ISNULL(LAT,0)) AS LAT, MAX(ISNULL(LONG,0)) AS LONG
        FROM BI_RPT_GENERAL
       WHERE CODSUCURSAL IN(${empresas}) AND MES IN(${mes}) AND ANIO IN(${anio}) AND LAT<>0 
       GROUP BY MUNICIPIO, DEPARTAMENTO
ORDER BY MUNICIPIO, DEPARTAMENTO`
    

      let xqry = `SELECT DISTINCT CODIGO, NOMBRECLIENTE, ISNULL(MUNICIPIO,'SN') AS MUNICIPIO, ISNULL(DEPARTAMENTO,'SN') AS DEPARTAMENTO, 
       ISNULL(TOTALPRECIO,0) AS TOTALPRECIO, ISNULL(LAT,0) AS LAT, ISNULL(LONG,0) AS LONG
       FROM BI_RPT_GENERAL
      WHERE CODSUCURSAL IN(${empresas}) AND MES IN(${mes}) AND ANIO IN(${anio}) AND LAT<>0 `

     execute.Query(res,qry);
    
});


module.exports = router;

