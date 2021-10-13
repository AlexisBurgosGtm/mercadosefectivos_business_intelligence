let root = document.getElementById('root');
let GlobalSelectedForm = 'LOGIN';


let GlobalSelectedCodMarca = 0;
let GlobalSelectedDesMarca = '';
let GlobalSelectedFecha ='';


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