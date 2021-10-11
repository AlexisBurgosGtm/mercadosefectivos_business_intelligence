
const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.get('/getVentasFechaEmpresas', async function(req,res){

    const {anio,mes,empresas} = req.query;

   console.log(req.query);
   
    let qry = `SELECT FECHA, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO, 
                (SUM(TOTALPRECIO) - SUM(TOTALCOSTO)) AS TOTALUTILIDAD 
    FROM            BI_RPT_GENERAL
    WHERE (CODSUCURSAL IN (${empresas})) AND (ANIO IN(${anio})) AND (MES IN(${mes}))
    GROUP BY FECHA, ANIO, MES
    ORDER BY FECHA`;

    execute.Query(res,qry);

});

router.get('/getfacdevempresas', async function(req,res){

    const {empresas,anio,mes} = req.query;

    let qry = `SELECT 
        CODSUCURSAL, TIPO, SUM(TOTALPRECIO) AS TOTALPRECIO
    FROM            BI_RPT_GENERAL
    WHERE       (CODSUCURSAL IN (${empresas})) 
            AND (ANIO IN(${anio})) AND (MES IN(${mes}))
    GROUP BY CODSUCURSAL, TIPO
    ORDER BY CODSUCURSAL, TIPO DESC`;

    execute.Query(res,qry);

});

router.get("/getempresas", async function(req,res){
    const {empresas,anio,mes} = req.query;

    let qry = `SELECT EMPNIT, NOMBRE, 
                COSTO,VENTAS,
                COSTODEV,DEVOLUCIONES,
                UTILIDAD,MARGEN,OBJETIVO, 
                UNIVERSO 
                FROM BI_EMPRESAS_RESUMEN 
                WHERE EMPNIT IN(${empresas})
                 AND MES IN(${mes}) AND ANIO IN(${anio})`
    
    execute.Query(res,qry);
});


module.exports = router;
