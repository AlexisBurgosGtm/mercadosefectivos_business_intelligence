let root = document.getElementById('root');
let GlobalSelectedForm = 'LOGIN';

let titulo = document.getElementById('titulo');


let btnMenuHome = document.getElementById('circularMenu');

let GlobalSelectedCodSucursal = '';
let GlobalSelectedCodMarca = 0;
let GlobalSelectedDesMarca = '';
let GlobalSelectedFecha ='';

let GlobalIconoDobleClick = `<i class="fal fa-hand-point-up"></i><i class="fal fa-hand-point-up"></i>`

let GlobalLoader = `<div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    `;

function getLoader(texto){
    return `
        <div class="">
            <i class="fal fa-sync fa-sping text-danger"></i>
            <i class="fal fa-sync fa-spin"></i>
            <i class="fal fa-sync fa-spin"></i>
            <i class="fal fa-sync fa-spin"></i>
        </div>
    `
}