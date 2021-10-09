let Navegar = {
    login:()=>{
        funciones.loadScript('../views/viewLogin.js','root')
        .then(()=>{
            btnFiltro.style='visibility:hidden';
            btnFiltroCerrar.style='visibility:hidden';
            btnMenu.style='visibility:hidden';
            initView();
        })
    },
    inicio:()=>{
        funciones.loadScript('../views/viewInicio.js','root')
        .then(()=>{
            btnFiltro.style='visibility:visible';
            btnFiltroCerrar.style='visibility:visible';
            btnMenu.style='visibility:visible';
            initView();
        })
    }
}