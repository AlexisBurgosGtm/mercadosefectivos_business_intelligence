
let btnFiltro = document.getElementById('btnFiltro');
btnFiltro.addEventListener('click',()=>{
    $('#modalParametros').modal('show');
});

let btnFiltroCerrar = document.getElementById('btnFiltroCerrar');
btnFiltroCerrar.addEventListener('click',()=>{
    $('#modalParametros').modal('hide');
});

let btnMenu = document.getElementById('circularmenu');

//Chart.register(ChartDataLabels);


Navegar.login();