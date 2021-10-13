
let btnFiltro = document.getElementById('btnFiltro');
btnFiltro.addEventListener('click',()=>{
    $('#modalParametros').modal('show');
});

let btnFiltroCerrar = document.getElementById('btnFiltroCerrar');
btnFiltroCerrar.addEventListener('click',()=>{
    $('#modalParametros').modal('hide');
});

let btnFiltroAceptar = document.getElementById('btnFiltroAceptar');
btnFiltroAceptar.addEventListener('click',()=>{
    $('#modalParametros').modal('hide');
    getParametros();

    switch (GlobalSelectedForm) {
        case 'INICIO':
            try {
                viewInicioObtenerDatos();
            } catch (error) {
                
            }        
            break;
        case 'ANALISIS_MARCA': 
            try {
                getDataMarca();
            } catch (error) {
                
            }
            break;
        default:
            break;
    }

    
    
});

let btnMenu = document.getElementById('circularmenu');

let f = new Date();
let parametrosEmpresas = ` 'ME-IZABAL','ME-ZACAPA','ME-JUTIAPA','ME-PETEN','ME-COBAN' `;
let parametrosAnio = f.getFullYear().toString();
let parametrosMes = (f.getUTCMonth()+1).toString();


function setParametrosIniciales(){
    document.getElementById('paramZ').checked=true;
    document.getElementById('paramJ').checked=true;
    document.getElementById('paramI').checked=true;
    document.getElementById('paramC').checked=true;
    document.getElementById('paramP').checked=true;

    let f = new Date();
    //MES
    document.getElementById('paramM' + (f.getUTCMonth()+1).toString()).checked=true;
    //AÑO
    document.getElementById('paramA' + (f.getFullYear()).toString()).checked=true;

};
//INICIA LOS PARAMETROS
setParametrosIniciales();



function getParametros(){

    parametrosEmpresas = ''; parametrosMes = ''; parametrosAnio='';
    //empresas
    if(document.getElementById('paramZ').checked==true){parametrosEmpresas += `'ME-ZACAPA',`}else{};
    if(document.getElementById('paramJ').checked==true){parametrosEmpresas += `'ME-JUTIAPA',`}else{};
    if(document.getElementById('paramI').checked==true){parametrosEmpresas += `'ME-IZABAL',`}else{};
    if(document.getElementById('paramC').checked==true){parametrosEmpresas += `'ME-COBAN',`}else{};
    if(document.getElementById('paramP').checked==true){parametrosEmpresas += `'ME-PETEN',`}else{};
    var n = parametrosEmpresas.lastIndexOf(",");
    parametrosEmpresas = parametrosEmpresas.substring(0,n); 
    
    //meses
    if(document.getElementById('paramM1').checked==true){parametrosMes += `1,`};
    if(document.getElementById('paramM2').checked==true){parametrosMes += `2,`};
    if(document.getElementById('paramM3').checked==true){parametrosMes += `3,`};
    if(document.getElementById('paramM4').checked==true){parametrosMes += `4,`};
    if(document.getElementById('paramM5').checked==true){parametrosMes += `5,`};
    if(document.getElementById('paramM6').checked==true){parametrosMes += `6,`};
    if(document.getElementById('paramM7').checked==true){parametrosMes += `7,`};
    if(document.getElementById('paramM8').checked==true){parametrosMes += `8,`};
    if(document.getElementById('paramM9').checked==true){parametrosMes += `9,`};
    if(document.getElementById('paramM10').checked==true){parametrosMes += `10,`};
    if(document.getElementById('paramM11').checked==true){parametrosMes += `11,`};
    if(document.getElementById('paramM12').checked==true){parametrosMes += `12,`};
    var n = parametrosMes.lastIndexOf(",");
    parametrosMes = parametrosMes.substring(0,n); 

    //años
    if(document.getElementById('paramA2017').checked==true){parametrosAnio += `2017,`};
    if(document.getElementById('paramA2018').checked==true){parametrosAnio += `2018,`};
    if(document.getElementById('paramA2019').checked==true){parametrosAnio += `2019,`};
    if(document.getElementById('paramA2020').checked==true){parametrosAnio += `2020,`};
    if(document.getElementById('paramA2021').checked==true){parametrosAnio += `2021,`};
    if(document.getElementById('paramA2022').checked==true){parametrosAnio += `2022,`};
    if(document.getElementById('paramA2023').checked==true){parametrosAnio += `2023,`};
    if(document.getElementById('paramA2024').checked==true){parametrosAnio += `2024,`};
    if(document.getElementById('paramA2025').checked==true){parametrosAnio += `2025,`};
    if(document.getElementById('paramA2026').checked==true){parametrosAnio += `2026,`};
    if(document.getElementById('paramA2027').checked==true){parametrosAnio += `2027,`};
    if(document.getElementById('paramA2028').checked==true){parametrosAnio += `2028,`};
    if(document.getElementById('paramA2029').checked==true){parametrosAnio += `2029,`};
    if(document.getElementById('paramA2030').checked==true){parametrosAnio += `2030,`};
    if(document.getElementById('paramA2031').checked==true){parametrosAnio += `2031,`};
    if(document.getElementById('paramA2032').checked==true){parametrosAnio += `2032,`};
    if(document.getElementById('paramA2033').checked==true){parametrosAnio += `2033,`};
    if(document.getElementById('paramA2034').checked==true){parametrosAnio += `2034,`};
    if(document.getElementById('paramA2035').checked==true){parametrosAnio += `2035,`};
    var n = parametrosAnio.lastIndexOf(",");
    parametrosAnio = parametrosAnio.substring(0,n); 

    //alert(parametrosEmpresas + ' ' + parametrosMes + ' ' + parametrosAnio);

};


Navegar.login();