//inicializa el service worker
function InicializarServiceWorkerNotif(){
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
   navigator.serviceWorker.register('./sw.js')
    .then(registration => console.log('Service Worker registered'))
    .catch(err => 'SW registration failed'));
  };

  requestPermission();
}

if ('Notification' in window) {};

function requestPermission() {
  if (!('Notification' in window)) {
    //alert('Notification API not supported!');
    return;
  }
  
  Notification.requestPermission(function (result) {
    //$status.innerText = result;
  });
}

InicializarServiceWorkerNotif();
//finaliza--- inicializador del service worker

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
        case 'MARCAS': 
            try {
              getTblVentasMarcas('containerTblMarcas');
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

let GlobalSelectedEmpresas = [];
let GlobalSelectedAnioMes = [];

function setParametrosIniciales(){
    document.getElementById('paramZ').checked=true;
    document.getElementById('paramJ').checked=true;
    document.getElementById('paramI').checked=true;
    document.getElementById('paramC').checked=true;
    document.getElementById('paramP').checked=true;

    let f = new Date();
   
    //MES
    document.getElementById('paramM' + (f.getMonth()+1).toString()).checked=true;
    //AÑO
    document.getElementById('paramA' + (f.getFullYear()).toString()).checked=true;

};
//INICIA LOS PARAMETROS
setParametrosIniciales();



function getParametros(){
    
    GlobalSelectedEmpresas=[];
    GlobalSelectedAnioMes = []; let anio = []; let mes=[]; let m = [1,2,3,4,5,6,7,8,9,10,11,12];

    parametrosEmpresas = ''; parametrosMes = ''; parametrosAnio='';
    //empresas
    if(document.getElementById('paramZ').checked==true){
      parametrosEmpresas += `'ME-ZACAPA',`;
      GlobalSelectedEmpresas.push('ME-ZACAPA');
    }else{};
    if(document.getElementById('paramJ').checked==true){
      parametrosEmpresas += `'ME-JUTIAPA',`;
      GlobalSelectedEmpresas.push('ME-JUTIAPA');
    }else{};
    if(document.getElementById('paramI').checked==true){
      parametrosEmpresas += `'ME-IZABAL',`;
      GlobalSelectedEmpresas.push('ME-IZABAL');
    }else{};
    if(document.getElementById('paramC').checked==true){
      parametrosEmpresas += `'ME-COBAN',`;
      GlobalSelectedEmpresas.push('ME-COBAN');
    }else{};
    if(document.getElementById('paramP').checked==true){
      parametrosEmpresas += `'ME-PETEN',`;
      GlobalSelectedEmpresas.push('ME-PETEN');
    }else{};

    var n = parametrosEmpresas.lastIndexOf(",");
    parametrosEmpresas = parametrosEmpresas.substring(0,n); 
    
    //meses
    if(document.getElementById('paramM1').checked==true){
      parametrosMes += `1,`;
      mes.push(1)
    };
    if(document.getElementById('paramM2').checked==true){
      parametrosMes += `2,`;
      mes.push(2)
    };
    if(document.getElementById('paramM3').checked==true){
      parametrosMes += `3,`;
      mes.push(3)
    };
    if(document.getElementById('paramM4').checked==true){
      parametrosMes += `4,`;
      mes.push(4)
    };
    if(document.getElementById('paramM5').checked==true){
      parametrosMes += `5,`;
      mes.push(5)
    };
    if(document.getElementById('paramM6').checked==true){
      parametrosMes += `6,`;
      mes.push(6)
    };
    if(document.getElementById('paramM7').checked==true){
      parametrosMes += `7,`;
      mes.push(7)
    };
    if(document.getElementById('paramM8').checked==true){
      parametrosMes += `8,`;
      mes.push(8)
    };
    if(document.getElementById('paramM9').checked==true){
      parametrosMes += `9,`;
      mes.push(9)
    };
    if(document.getElementById('paramM10').checked==true){
      parametrosMes += `10,`;
      mes.push(10)
    };
    if(document.getElementById('paramM11').checked==true){
      parametrosMes += `11,`;
      mes.push(11)
    };
    if(document.getElementById('paramM12').checked==true){
      parametrosMes += `12,`;
      mes.push(12)
    };

    var n = parametrosMes.lastIndexOf(",");
    parametrosMes = parametrosMes.substring(0,n); 

    //años
    if(document.getElementById('paramA2017').checked==true){parametrosAnio += `2017,`;anio.push(2017);};
    if(document.getElementById('paramA2018').checked==true){parametrosAnio += `2018,`;anio.push(2018);};
    if(document.getElementById('paramA2019').checked==true){parametrosAnio += `2019,`;anio.push(2019);};
    if(document.getElementById('paramA2020').checked==true){parametrosAnio += `2020,`;anio.push(2020);};
    if(document.getElementById('paramA2021').checked==true){parametrosAnio += `2021,`;anio.push(2021);};
    if(document.getElementById('paramA2022').checked==true){parametrosAnio += `2022,`;anio.push(2022);};
    if(document.getElementById('paramA2023').checked==true){parametrosAnio += `2023,`;anio.push(2023);};
    if(document.getElementById('paramA2024').checked==true){parametrosAnio += `2024,`;anio.push(2024);};
    if(document.getElementById('paramA2025').checked==true){parametrosAnio += `2025,`;anio.push(2025);};
    if(document.getElementById('paramA2026').checked==true){parametrosAnio += `2026,`;anio.push(2026);};
    if(document.getElementById('paramA2027').checked==true){parametrosAnio += `2027,`;anio.push(2027);};
    if(document.getElementById('paramA2028').checked==true){parametrosAnio += `2028,`;anio.push(2028);};
    if(document.getElementById('paramA2029').checked==true){parametrosAnio += `2029,`;anio.push(2029);};
    if(document.getElementById('paramA2030').checked==true){parametrosAnio += `2030,`;anio.push(2030);};

    var n = parametrosAnio.lastIndexOf(",");
    parametrosAnio = parametrosAnio.substring(0,n); 


    anio.forEach(function(an, index) {
        m.forEach(function (mes,i){
          GlobalSelectedAnioMes.push(mes.toString() + '-' + an.toString());
        })
    })

    //alert(parametrosEmpresas + ' ' + parametrosMes + ' ' + parametrosAnio);

};



Navegar.login();


let btnMInicio = document.getElementById('btnMInicio');
btnMInicio.addEventListener('click',()=>{
    Navegar.inicio();
});

let btnMMarcas = document.getElementById('btnMMarcas');
btnMMarcas.addEventListener('click',()=>{
    Navegar.marcas();
});

let btnMProductos = document.getElementById('btnMProductos');
btnMProductos.addEventListener('click',()=>{
    Navegar.inicio();
});

let btnMSell = document.getElementById('btnMSell');
btnMSell.addEventListener('click',()=>{
    Navegar.inicio();
});

let btnMSalir = document.getElementById('btnMSalir');
btnMSalir.addEventListener('click',()=>{
    Navegar.login();
});



//fullscreen scroll
function expandir(idcontainer){
  
  element = document.getElementById(idcontainer);
  element.requestFullscreen();

  //element.style = "overflow:scroll";
  //element.style = "overflow:hidden";
  //return;

    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
        element.style = "overflow:visible";
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        element.style = "overflow:scroll";
        //element.style = "overflow:hidden";
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }


      
};


funciones.animateCSS('btnInstalar','backInRight');

funciones.instalationHandlers('btnInstalar');
