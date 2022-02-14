let Navegar = {
    login:()=>{
        funciones.loadScript('../views/viewLogin.js','root')
        .then(()=>{
            titulo.innerHTML = `MERCADOS EFECTIVOS`;
            GlobalSelectedForm = 'LOGIN';
            btnFiltro.style='visibility:hidden';
            btnFiltroCerrar.style='visibility:hidden';
            btnMenu.style='visibility:hidden';
            initView();
        })
    },
    config:()=>{
        funciones.loadScript('../views/viewConfig.js','root')
        .then(()=>{
            titulo.innerHTML = `CONFIGURATIONS AND USERS`;
            GlobalSelectedForm = 'CONFIG';
            btnFiltro.style='visibility:hidden';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView();
        })
    },
    inicio:()=>{
        funciones.loadScript('../views/viewInicio.js','root')
        .then(()=>{
            titulo.innerHTML = `MERCADOS EFECTIVOS - OVERVIEW`;
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
            titulo.innerHTML = `TRADEMARK ANALYSIS`;
            GlobalSelectedForm = 'MARCAS';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView();
        })
    },
    empleados:()=>{
        funciones.loadScript('../views/viewEmpleados.js','root')
        .then(()=>{
            titulo.innerHTML = `EMPLOYEES ANALYSIS`;
            GlobalSelectedForm = 'EMPLEADOS';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView();
        })
    },
    analisis_marca:(data)=>{
        funciones.loadScript('../views/viewAnalisisMarca.js','root')
        .then(()=>{
            titulo.innerHTML = `BRAND ANALYSIS`;
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
            titulo.innerHTML = `DATE ANALYSIS`;
            GlobalSelectedForm = 'ANALISIS_FECHA';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView(data);
        })
    },
    analisis_empresa:(codsucursal,ventas,devoluciones,universo)=>{
        funciones.loadScript('../views/viewAnalisisEmpresa.js','root')
        .then(()=>{
            titulo.innerHTML = `COMPANY ANALYSIS`;
            GlobalSelectedForm = 'ANALISIS_EMPRESA';
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView(codsucursal,ventas,devoluciones,universo);
        })
    }
}