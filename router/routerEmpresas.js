
const execute = require('./connection');
const express = require('express');
const router = express.Router();




router.get('/getMesesSucursal', async function(req,res){

    const {sucursal, anio, mes} = req.query;
  
    let qry = `SELECT CODSUCURSAL, CONCAT(MES, '-', ANIO) AS NOMMES, MES, ANIO,
    SUM(TOTALCOSTO) AS TOTALCOSTO,
    SUM(TOTALPRECIO) AS TOTALPRECIO,
     (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
   FROM            BI_RPT_GENERAL
   GROUP BY CODSUCURSAL, ANIO, MES
   HAVING        (ANIO IN(${anio})) AND (CODSUCURSAL ='${sucursal}') 
   ORDER BY ANIO, MES
                `

    execute.Query(res,qry);
    
});



router.post('/getVentasFechas', async function(req,res){

    const {empresa,anio,mes} = req.body;
   
    let qry = `SELECT FECHA, COUNT(DISTINCT CODIGO) AS VISITADOS, SUM(TOTALCOSTO) AS TOTALCOSTO, SUM(TOTALPRECIO) AS TOTALPRECIO
            FROM BI_RPT_GENERAL
            WHERE (CODSUCURSAL = '${empresa}') AND (ANIO IN(${anio})) AND (MES IN(${mes})) 
    GROUP BY FECHA`;

    execute.Query(res,qry);

});



router.get('/getHistorialVenta', async function(req,res){

    const {empresas,anio} = req.query;
   
    let qry = `SELECT CODSUCURSAL, CONCAT(MES, '-', ANIO) AS NOMMES, MES, ANIO,
    SUM(TOTALCOSTO) AS TOTALCOSTO,
    SUM(TOTALPRECIO) AS TOTALPRECIO,
     (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
   FROM            BI_RPT_GENERAL
   GROUP BY CODSUCURSAL, ANIO, MES
   HAVING        (ANIO IN(${anio})) AND (CODSUCURSAL IN(${empresas}))
   ORDER BY MES,ANIO`;

    execute.Query(res,qry);

});


router.get('/getHistorialVentaGeneral', async function(req,res){

    const {empresas,anio} = req.query;
   
    let qry = `SELECT CONCAT(MES, '-', ANIO) AS NOMMES, MES, ANIO,
    SUM(TOTALCOSTO) AS TOTALCOSTO,
    SUM(TOTALPRECIO) AS TOTALPRECIO,
     (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
   FROM  BI_RPT_GENERAL
   WHERE (CODSUCURSAL IN(${empresas}))
   GROUP BY ANIO, MES
   HAVING   (ANIO IN(${anio})) 
   ORDER BY MES,ANIO`;

    execute.Query(res,qry);

});

router.get('/getVentasVendedores', async function(req,res){

    const {empresas,anio,mes} = req.query;
   
   
    let qry = '';
    qry = `SELECT  CODSUCURSAL, CODVEN, NOMEMPLEADO AS NOMVEN, 
    (SELECT ISNULL(SUM(TOTALPRECIO),0) FROM BI_RPT_GENERAL AS G2 
    WHERE (G2.CODSUCURSAL  IN(${empresas})) AND (G2.ANIO  IN(${anio})) AND (G2.MES IN(${mes})) 
    AND G2.TIPO='FAC' AND G2.CODVEN=G1.CODVEN AND G2.CODSUCURSAL=G1.CODSUCURSAL AND G2.MES=G1.MES AND G1.ANIO=G2.ANIO) AS VENTAS,
    (SELECT ISNULL(SUM(TOTALPRECIO),0) FROM BI_RPT_GENERAL AS G2 
    WHERE (G2.CODSUCURSAL  IN(${empresas})) AND (G2.ANIO  IN(${anio})) AND (G2.MES IN(${mes})) 
    AND G2.TIPO='DEV' AND G2.CODVEN=G1.CODVEN AND G2.CODSUCURSAL=G1.CODSUCURSAL AND G2.MES=G1.MES AND G1.ANIO=G2.ANIO) AS DEVOLUCIONES
FROM            BI_RPT_GENERAL AS G1
WHERE        (CODSUCURSAL IN(${empresas})) AND (ANIO IN(${anio})) AND (MES IN(${mes}))
GROUP BY CODSUCURSAL, CODVEN, NOMEMPLEADO, ANIO, MES
ORDER BY CODSUCURSAL,CODVEN`;

    execute.Query(res,qry);

});



router.get('/getFechaMarca', async function(req,res){

    const {empresas,anio,mes,codmarca} = req.query;
   
    let qry = `SELECT CODCLAUNO, DESCLAUNO, FECHA,  
        SUM(TOTALUNIDADES) AS TOTALUNIDADES, 
        SUM(TOTALCOSTO) AS TOTALCOSTO, 
        SUM(TOTALPRECIO) AS TOTALPRECIO,
        (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
    FROM            BI_RPT_GENERAL
    WHERE  (CODCLAUNO = ${codmarca}) AND (CODSUCURSAL IN(${empresas})) AND (ANIO IN(${anio})) AND (MES IN(${mes}))
    GROUP BY CODCLAUNO, DESCLAUNO, FECHA
    ORDER BY FECHA`;

    execute.Query(res,qry);

});


router.get('/getVentasMarcas', async function(req,res){

    const {empresas,anio,mes} = req.query;
   
    let qry = `SELECT CODMARCA, DESMARCA, 
        SUM(TOTALCOSTO) AS TOTALCOSTO, 
        SUM(TOTALPRECIO) AS TOTALPRECIO, 
        (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD 
    FROM            BI_RPT_GENERAL
    WHERE (ANIO IN(${anio})) AND (MES IN(${mes})) AND (CODSUCURSAL IN(${empresas}))
    GROUP BY CODMARCA, DESMARCA
    ORDER BY DESMARCA`;

    execute.Query(res,qry);

});


router.get('/getClientesVisitados', async function(req,res){

    const {anio,mes} = req.query;
   
    let qry = `SELECT  BI_RPT_GENERAL.CODSUCURSAL, COUNT(DISTINCT BI_RPT_GENERAL.CODIGO) AS VISITADOS, BI_EMPRESAS_RESUMEN.UNIVERSO
                        FROM  BI_RPT_GENERAL LEFT OUTER JOIN
                             BI_EMPRESAS_RESUMEN ON BI_RPT_GENERAL.MES = BI_EMPRESAS_RESUMEN.MES AND BI_RPT_GENERAL.ANIO = BI_EMPRESAS_RESUMEN.ANIO AND 
                             BI_RPT_GENERAL.CODSUCURSAL = BI_EMPRESAS_RESUMEN.CODSUCURSAL
    WHERE        (BI_RPT_GENERAL.TIPO = 'FAC')
    GROUP BY BI_RPT_GENERAL.CODSUCURSAL, BI_RPT_GENERAL.ANIO, BI_RPT_GENERAL.MES, BI_EMPRESAS_RESUMEN.UNIVERSO
    HAVING        (BI_RPT_GENERAL.ANIO IN(${anio})) AND (BI_RPT_GENERAL.MES IN(${mes}))`;

    execute.Query(res,qry);

});



router.get('/getVentasFechaEmpresas', async function(req,res){

    const {anio,mes,empresas} = req.query;

     
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

router.post("/getempresas", async function(req,res){
    
    const {empresas,anio,mes} = req.body;

  
    let qry = `
                SELECT  BI_EMPRESAS_RESUMEN.EMPNIT, BI_EMPRESAS_RESUMEN.NOMBRE, SUM(BI_EMPRESAS_RESUMEN.COSTO) AS COSTO, SUM(BI_EMPRESAS_RESUMEN.VENTAS) AS VENTAS, SUM(BI_EMPRESAS_RESUMEN.COSTODEV)
                                    AS COSTODEV, SUM(BI_EMPRESAS_RESUMEN.DEVOLUCIONES) AS DEVOLUCIONES, SUM(BI_EMPRESAS_RESUMEN.UTILIDAD) AS UTILIDAD, SUM(BI_EMPRESAS_RESUMEN.MARGEN) AS MARGEN, 
                                    SUM(ISNULL(BI_EMPRESAS_RESUMEN.OBJETIVO, 0)) AS OBJETIVO, AVG(BI_EMPRESAS_RESUMEN.UNIVERSO) AS UNIVERSO, MAX(BI_EMPRESAS_RESUMEN.LASTUPDATE) AS LASTUPDATE, 
                                    SUM(ISNULL(BI_EMPRESAS_RESUMEN.COMPRAS, 0)) AS COMPRAS, BI_SUCURSALES.ID
                FROM BI_EMPRESAS_RESUMEN LEFT OUTER JOIN
                                    BI_SUCURSALES ON BI_EMPRESAS_RESUMEN.CODSUCURSAL = BI_SUCURSALES.CODSUCURSAL
                WHERE (BI_EMPRESAS_RESUMEN.EMPNIT IN (${empresas})) AND (BI_EMPRESAS_RESUMEN.MES IN (${mes})) AND (BI_EMPRESAS_RESUMEN.ANIO IN (${anio}))
                GROUP BY BI_EMPRESAS_RESUMEN.EMPNIT, BI_EMPRESAS_RESUMEN.NOMBRE, BI_SUCURSALES.ID
                ORDER BY BI_SUCURSALES.ID
    `
    
    execute.Query(res,qry);
});


module.exports = router;
