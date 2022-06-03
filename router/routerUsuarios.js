
const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post('/login', async function(req,res){

    const {tipo,nombre,clave} = req.body;

    let qry = `SELECT ID, USUARIO, CODSUCURSAL FROM BI_USUARIOS 
        WHERE USUARIO='${nombre}' AND PASS='${clave}' AND TIPO='${tipo}'; `;

    execute.Query(res,qry);

});

router.post('/select_usuarios', async function(req,res){

   
    let qry = `SELECT ID, USUARIO, PASS, CODDOC, CORRELATIVO, TIPO, CODMARCA, CODSUCURSAL FROM BI_USUARIOS; 
                `;

    execute.Query(res,qry);

});



router.post('/insert_usuario', async function(req,res){

    const {tipo,nombre,clave, codmarca,sede} = req.body;

    let marca = codmarca || 0;

    let qry = `INSERT INTO BI_USUARIOS (USUARIO,PASS,TIPO,CODMARCA,CODSUCURSAL) 
                                    VALUES ('${nombre}','${clave}','${tipo}',${marca},'${sede}')`;

    //console.log(qry);

    execute.Query(res,qry);

});

router.post('/delete_usuario', async function(req,res){

    const {id} = req.body;

    let qry = `DELETE FROM BI_USUARIOS WHERE ID=${id};`;

    execute.Query(res,qry);

});




module.exports = router;