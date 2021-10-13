let Navegar = {
    login:()=>{
        funciones.loadScript('../views/viewLogin.js','root')
        .then(()=>{
            GlobalSelectedForm = 'LOGIN';
            btnFiltro.style='visibility:hidden';
            btnFiltroCerrar.style='visibility:hidden';
            btnMenu.style='visibility:hidden';
            initView();
        })
    },
    inicio:()=>{
        funciones.loadScript('../views/viewInicio.js','root')
        .then(()=>{
            GlobalSelectedForm = 'INICIO';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView();
        })
    },
    marcas:()=>{
        funciones.loadScript('../views/viewMarcas.js','root')
        .then(()=>{
            GlobalSelectedForm = 'MARCAS';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView();
        })
    },
    analisis_marca:(data)=>{
        funciones.loadScript('../views/viewAnalisisMarca.js','root')
        .then(()=>{
            GlobalSelectedForm = 'ANALISIS_MARCA';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView(data);
        })
    },
    analisis_fecha:(data)=>{
        funciones.loadScript('../views/viewAnalisisFecha.js','root')
        .then(()=>{
            GlobalSelectedForm = 'ANALISIS_FECHA';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView(data);
        })
    }
}