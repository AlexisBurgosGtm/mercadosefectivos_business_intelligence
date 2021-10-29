let root = document.getElementById('root');
let GlobalSelectedForm = 'LOGIN';

let titulo = document.getElementById('titulo');
let divMenu = document.getElementById('navbar');
divMenu.style = "visibility:hidden;";

let GlobalSelectedCodMarca = 0;
let GlobalSelectedDesMarca = '';
let GlobalSelectedFecha ='';

let GlobalIconoDobleClick = `<i class="fas fa-hand-point-up"></i><i class="fas fa-hand-point-up"></i>`

function getLoader(texto){
    return `
        <div class="">
            <i class="fas fa-sync fa-sping text-danger"></i>
            <i class="fas fa-sync fa-spin"></i>
            <i class="fas fa-sync fa-spin"></i>
            <i class="fas fa-sync fa-spin"></i>
        </div>
    `
}