const execute = require('./connection');
const express = require('express');
const router = express.Router();

router.get('/getProductosMarcaMunicipio', async function(req,res){

    const {empresas, municipio, departamento, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT CODPRODUCTO, PRODUCTO, 
                SUM(FARDOS) AS FARDOS, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO,
                (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
                FROM  BI_RPT_GENERAL
                WHERE (MUNICIPIO='${municipio}') AND (DEPARTAMENTO='${departamento}')
                    AND (CODMARCA = ${codmarca}) 
                    AND (CODSUCURSAL IN(${empresas})) 
                    AND (ANIO IN(${anio})) 
                    AND (MES IN(${mes}))
                GROUP BY CODPRODUCTO, PRODUCTO, CODMARCA
                `

    execute.Query(res,qry);
    
});

router.get('/getProductosMarca', async function(req,res){

    const {empresas, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT CODPRODUCTO, PRODUCTO, 
                SUM(FARDOS) AS FARDOS, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO,
                (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
                FROM  BI_RPT_GENERAL
                WHERE (CODMARCA = ${codmarca}) 
                    AND (CODSUCURSAL IN(${empresas})) 
                    AND (ANIO IN(${anio})) 
                    AND (MES IN(${mes}))
                GROUP BY CODPRODUCTO, PRODUCTO, CODMARCA
                `

    execute.Query(res,qry);
    
});


router.get('/getProductosMarcaVendedor', async function(req,res){

    const {empresas, codruta, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT CODPRODUCTO, PRODUCTO, 
                SUM(FARDOS) AS FARDOS, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO,
                (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
                FROM  BI_RPT_GENERAL
                WHERE (CODIGO_RUTA=${codruta})
                    AND (CODMARCA = ${codmarca}) 
                    AND (CODSUCURSAL IN(${empresas})) 
                    AND (ANIO IN(${anio})) 
                    AND (MES IN(${mes}))
                GROUP BY CODPRODUCTO, PRODUCTO, CODMARCA
                `

    execute.Query(res,qry);
    
});

router.get('/getVendedoresMarca', async function(req,res){

    const {empresas, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT CODIGO_RUTA AS CODRUTA, NOMEMPLEADO AS VENDEDOR,
                SUM(FARDOS) AS FARDOS, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO, 
                (SUM(TOTALPRECIO) - SUM(TOTALCOSTO)) AS UTILIDAD
            FROM BI_RPT_GENERAL
            WHERE (CODMARCA = ${codmarca}) 
            AND (CODSUCURSAL IN(${empresas})) 
            AND (ANIO IN(${anio})) 
            AND (MES IN(${mes}))
            GROUP BY CODIGO_RUTA, NOMEMPLEADO 
            ORDER BY NOMEMPLEADO`

    execute.Query(res,qry);
    
});


router.get('/getVentasMesMarca', async function(req,res){

    const {empresas, codmarca, anio, mes} = req.query;
  
    let qry = `SELECT MES, ANIO,
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO
    FROM            BI_RPT_GENERAL
    WHERE  (CODSUCURSAL IN (${empresas})) 
        AND (ANIO IN (${anio})) 
        AND (MES IN (${mes})) 
        AND (CODMARCA = ${codmarca}) 
    GROUP BY MES, ANIO
    ORDER BY MES, ANIO`

    execute.Query(res,qry);
    
});

router.get('/getClientesMarca', async function(req,res){

    const {empresas, codmarca, anio, mes} = req.query;
  
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
        AND (BI_RPT_GENERAL.CODMARCA = ${codmarca}) AND 
                             (BI_RPT_GENERAL.TIPO = 'FAC')
    GROUP BY BI_RPT_GENERAL.CODSUCURSAL
    ORDER BY BI_RPT_GENERAL.CODSUCURSAL`

    execute.Query(res,qry);
    
});

router.get('/getMunicipiosMarca', async function(req,res){

    const {empresas, codmarca, anio, mes} = req.query;
  

    let qry = `
            SELECT BI_RPT_GENERAL.DEPARTAMENTO, BI_RPT_GENERAL.MUNICIPIO, COUNT(DISTINCT BI_RPT_GENERAL.CODIGO) AS CONTEO, SUM(BI_RPT_GENERAL.TOTALCOSTO) AS TOTALCOSTO, 
                                SUM(BI_RPT_GENERAL.TOTALPRECIO) AS TOTALPRECIO, SUM(BI_RPT_GENERAL.TOTALPRECIO) - SUM(BI_RPT_GENERAL.TOTALCOSTO) AS UTILIDAD, 
                                BI_GENERALES_MUNICIPIOS.UNIVERSO AS TOTALMUNICIPIO
            FROM BI_RPT_GENERAL LEFT OUTER JOIN
                                    BI_GENERALES_MUNICIPIOS ON BI_RPT_GENERAL.DEPARTAMENTO = BI_GENERALES_MUNICIPIOS.DESDEPARTAMENTO AND 
                                    BI_RPT_GENERAL.MUNICIPIO = BI_GENERALES_MUNICIPIOS.DESMUNICIPIO AND BI_RPT_GENERAL.CODSUCURSAL = BI_GENERALES_MUNICIPIOS.CODSUCURSAL
            WHERE (BI_RPT_GENERAL.CODSUCURSAL IN (${empresas})) AND (BI_RPT_GENERAL.ANIO IN (${anio})) AND (BI_RPT_GENERAL.MES IN (${mes})) 
                    AND (BI_RPT_GENERAL.CODMARCA = ${codmarca})
            GROUP BY BI_RPT_GENERAL.DEPARTAMENTO, BI_RPT_GENERAL.MUNICIPIO, BI_GENERALES_MUNICIPIOS.UNIVERSO
            ORDER BY BI_RPT_GENERAL.DEPARTAMENTO, BI_RPT_GENERAL.MUNICIPIO
    `


    let qryold = `SELECT DEPARTAMENTO, MUNICIPIO, 
                COUNT(DISTINCT CODIGO) AS CONTEO, 
                SUM(TOTALCOSTO) AS TOTALCOSTO, 
                SUM(TOTALPRECIO) AS TOTALPRECIO,
                (SUM(TOTALPRECIO)-SUM(TOTALCOSTO)) AS UTILIDAD
    FROM BI_RPT_GENERAL 
    WHERE
    (CODSUCURSAL IN(${empresas})) AND (ANIO IN(${anio})) AND (MES IN(${mes})) 
    AND (CODMARCA=${codmarca}) AND (TIPO='FAC')
    GROUP BY DEPARTAMENTO,MUNICIPIO 
    ORDER BY DEPARTAMENTO, MUNICIPIO`

    execute.Query(res,qry);
    
});

router.get('/getMunicipiosMarcaProd', async function(req,res){

    const {empresas, codmarca, anio, mes,codprod} = req.query;
  

    let qry = `
            SELECT BI_RPT_GENERAL.DEPARTAMENTO, BI_RPT_GENERAL.MUNICIPIO, COUNT(DISTINCT BI_RPT_GENERAL.CODIGO) AS CONTEO, 
                                SUM(BI_RPT_GENERAL.FARDOS) AS FARDOS,
                                SUM(BI_RPT_GENERAL.TOTALCOSTO) AS TOTALCOSTO, 
                                SUM(BI_RPT_GENERAL.TOTALPRECIO) AS TOTALPRECIO, SUM(BI_RPT_GENERAL.TOTALPRECIO) - SUM(BI_RPT_GENERAL.TOTALCOSTO) AS UTILIDAD, 
                                BI_GENERALES_MUNICIPIOS.UNIVERSO AS TOTALMUNICIPIO
            FROM BI_RPT_GENERAL LEFT OUTER JOIN
                                    BI_GENERALES_MUNICIPIOS ON BI_RPT_GENERAL.DEPARTAMENTO = BI_GENERALES_MUNICIPIOS.DESDEPARTAMENTO AND 
                                    BI_RPT_GENERAL.MUNICIPIO = BI_GENERALES_MUNICIPIOS.DESMUNICIPIO AND BI_RPT_GENERAL.CODSUCURSAL = BI_GENERALES_MUNICIPIOS.CODSUCURSAL
            WHERE (BI_RPT_GENERAL.CODSUCURSAL IN (${empresas})) 
                    AND (BI_RPT_GENERAL.CODPRODUCTO='${codprod}')
                    AND (BI_RPT_GENERAL.ANIO IN (${anio})) 
                    AND (BI_RPT_GENERAL.MES IN (${mes})) 
                    AND (BI_RPT_GENERAL.CODMARCA = ${codmarca})
            GROUP BY BI_RPT_GENERAL.DEPARTAMENTO, BI_RPT_GENERAL.MUNICIPIO, BI_GENERALES_MUNICIPIOS.UNIVERSO
            ORDER BY BI_RPT_GENERAL.DEPARTAMENTO, BI_RPT_GENERAL.MUNICIPIO
    `

    execute.Query(res,qry);
    
});




//**  REPORTE SE MARCAS ****/
router.get('/getmarcas', async function(req,res){

    const {empnit,anio,mes} = req.query;
    let qry = '';

    if(empnit=='todos'){
        qry = `SELECT CODMARCA, DESMARCA, ROUND(SUM(ISNULL(TOTALCOSTO,0)),2) AS TOTALCOSTO, ROUND(SUM(ISNULL(TOTALPRECIO,0)),2) AS TOTALPRECIO
        FROM BI_RPT_GENERAL
        WHERE (ANIO = ${anio}) AND (MES = ${mes})
        GROUP BY CODMARCA, DESMARCA
        ORDER BY SUM(TOTALPRECIO) DESC`

    }else{
        qry = `SELECT CODMARCA, DESMARCA, ROUND(SUM(ISNULL(TOTALCOSTO,0)),2) AS TOTALCOSTO, ROUND(SUM(ISNULL(TOTALPRECIO,0)),2) AS TOTALPRECIO
        FROM BI_RPT_GENERAL
        WHERE (CODSUCURSAL = '${empnit}') AND (ANIO = ${anio}) AND (MES = ${mes})
        GROUP BY CODMARCA, DESMARCA
        ORDER BY SUM(TOTALPRECIO) DESC`
  
    }

    
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

