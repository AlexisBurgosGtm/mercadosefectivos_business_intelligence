const execute = require('./connection');
const express = require('express');
const router = express.Router();


//**  REPORTE SE MARCAS ****/
router.get('/getmarcas', async function(req,res){

    const {empnit,anio,mes} = req.query;
  
    let qry = `SELECT CODMARCA, DESMARCA, ROUND(SUM(ISNULL(TOTALCOSTO,0)),2) AS TOTALCOSTO, ROUND(SUM(ISNULL(TOTALPRECIO,0)),2) AS TOTALPRECIO
              FROM BI_RPT_GENERAL
              WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
              GROUP BY CODMARCA, DESMARCA
              ORDER BY SUM(TOTALPRECIO) DESC`
    
    
     execute.Query(res,qry);
    
});

router.get('/getclientesmarca', async function(req,res){
    const {empnit, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT   distinct COUNT(NOMBRECLIENTE) AS CONTEO FROM BI_RPT_GENERAL WHERE
    (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes}) AND (CODMARCA=${codmarca}) AND (TIPO='FAC')`
    execute.Query(res,qry);
    
});



router.get('/getmarcasfecha', async function(req,res){

    const {empnit, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT CODMARCA, DESMARCA, TIPO, FECHA, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO
            FROM BI_RPT_GENERAL
            WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
            GROUP BY CODMARCA, DESMARCA, TIPO, FECHA
            HAVING (CODMARCA = ${codmarca})`
  
    execute.Query(res,qry);
  
});



router.get('/getmarcasvendedor', async function(req,res){

    const {empnit, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT CODMARCA, DESMARCA, NOMEMPLEADO, TIPO, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO
                FROM BI_RPT_GENERAL
                WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
                GROUP BY CODMARCA, DESMARCA, TIPO, NOMEMPLEADO
                HAVING (CODMARCA = ${codmarca})`
  
    execute.Query(res,qry);
  
});
  
  
router.get('/getmarcasmunicipio', async function(req,res){
  
    
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
            HAVING (BI_RPT_GENERAL.CODMARCA = ${codmarca}) 
            ORDER BY SUM(BI_RPT_GENERAL.TOTALPRECIO) DESC`
  
    execute.Query(res,qry);
  
});


module.exports = router;

