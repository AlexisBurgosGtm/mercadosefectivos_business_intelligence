
const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.get('/login', async function(req,res){

    const {tipo,nombre,clave} = req.query;

    let qry = `SELECT ID, USUARIO FROM BI_USUARIOS 
        WHERE USUARIO='${nombre}' AND PASS='${clave}' AND TIPO='${tipo}'; `;

    execute.Query(res,qry);

});




module.exports = router;