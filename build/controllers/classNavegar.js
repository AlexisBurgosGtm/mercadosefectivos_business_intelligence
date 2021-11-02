let Navegar = {
    login:()=>{
        funciones.loadScript('../views/viewLogin.js','root')
        .then(()=>{
            titulo.innerHTML = `<img src="./favicon.png" width="20" height="20" class="profile-pic me-2">MERCADOS EFECTIVOS`;
            GlobalSelectedForm = 'LOGIN';
            btnFiltro.style='visibility:hidden';
            btnFiltroCerrar.style='visibility:hidden';
            btnMenuHome.style='visibility:hidden';
            initView();
        })
    },
    inicio:()=>{
        funciones.loadScript('../views/viewInicio.js','root')
        .then(()=>{
            titulo.innerHTML = `<img src="./favicon.png" width="20" height="20" class="profile-pic me-2">MERCADOS EFECTIVOS - OVERVIEW`;
            GlobalSelectedForm = 'INICIO';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenuHome.style='visibility:visible';
            initView();
        })
    },
    marcas:()=>{
        funciones.loadScript('../views/viewMarcas.js','root')
        .then(()=>{
            titulo.innerHTML = `<img src="./favicon.png" width="20" height="20" class="profile-pic me-2">ALL BRAND ANALYSIS`;
            GlobalSelectedForm = 'MARCAS';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenuHome.style='visibility:visible';
            initView();
        })
    },
    analisis_marca:(data)=>{
        funciones.loadScript('../views/viewAnalisisMarca.js','root')
        .then(()=>{
            titulo.innerHTML = `<img src="./favicon.png" width="20" height="20" class="profile-pic me-2">BRAND ANALYSIS`;
            GlobalSelectedForm = 'ANALISIS_MARCA';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenuHome.style='visibility:visible';
            initView(data);
        })
    },
    analisis_fecha:(data)=>{
        funciones.loadScript('../views/viewAnalisisFecha.js','root')
        .then(()=>{
            titulo.innerHTML = `<img src="./favicon.png" width="20" height="20" class="profile-pic me-2">DATE ANALYSIS`;
            GlobalSelectedForm = 'ANALISIS_FECHA';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenuHome.style='visibility:visible';
            initView(data);
        })
    }
}