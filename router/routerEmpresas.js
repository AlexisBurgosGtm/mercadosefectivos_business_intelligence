
const execute = require('./connection');
const express = require('express');
const router = express.Router();



router.get('/getfacdevempresas', async function(req,res){

    const {anio,mes} = req.query;

    let qry = `SELECT        CODSUCURSAL, TIPO, SUM(TOTALPRECIO) AS TOTALPRECIO
    FROM            BI_RPT_GENERAL
    WHERE        (ANIO = ${anio}) AND (MES = ${mes})
    GROUP BY CODSUCURSAL, TIPO
    ORDER BY CODSUCURSAL, TIPO DESC`;

    execute.Query(res,qry);

});

router.get("/getempresas", async function(req,res){
    let qry = `SELECT EMPNIT, NOMBRE, VENTAS,COSTO,UTILIDAD,MARGEN,OBJETIVO, UNIVERSO FROM BI_EMPRESAS_RESUMEN`
    execute.Query(res,qry);
});


module.exports = router;
