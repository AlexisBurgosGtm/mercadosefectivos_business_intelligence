
const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.get('/getVentasFechaEmpresas', async function(req,res){

    const {anio,mes,filtro} = req.query;

    filtro = `'ME-ZACAPA', 'ME-PETEN', 'ME-COBAN', 'ME-IZABAL', 'ME-JUTIAPA'`;

    let qry = `SELECT        CODSUCURSAL, FECHA, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO, 
                (SUM(TOTALPRECIO) - SUM(TOTALCOSTO)) AS TOTALUTILIDAD 
    FROM            BI_RPT_GENERAL
    GROUP BY CODSUCURSAL, FECHA, ANIO, MES
    HAVING        (CODSUCURSAL IN (${filtro})) AND (ANIO = ${anio}) AND (MES = ${mes})`;

    execute.Query(res,qry);

});

router.get('/getfacdevempresas', async function(req,res){

    const {anio,mes} = req.query;

    let qry = `SELECT 
        CODSUCURSAL, TIPO, SUM(TOTALPRECIO) AS TOTALPRECIO
    FROM            BI_RPT_GENERAL
    WHERE        (ANIO = ${anio}) AND (MES = ${mes})
    GROUP BY CODSUCURSAL, TIPO
    ORDER BY CODSUCURSAL, TIPO DESC`;

    execute.Query(res,qry);

});

router.get("/getempresas", async function(req,res){
    const {empresas} = req.query;

    let qry = `SELECT EMPNIT, NOMBRE, 
                COSTO,VENTAS,
                COSTODEV,DEVOLUCIONES,
                UTILIDAD,MARGEN,OBJETIVO, 
                UNIVERSO 
                FROM BI_EMPRESAS_RESUMEN 
                WHERE EMPNIT IN(${empresas})`
    
    execute.Query(res,qry);
});


module.exports = router;
