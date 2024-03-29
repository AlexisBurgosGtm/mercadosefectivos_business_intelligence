function getView(){
    let view = { 
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.vista_listado()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           
                            
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            
                        </div>    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-uno" data-toggle="tab" href="#uno" role="tab" aria-controls="profile" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-dos" data-toggle="tab" href="#dos" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-tres" data-toggle="tab" href="#tres" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>         
                    </ul>
                </div>
               
            `
        },
        login:()=>{
            return `
        <div class="row">
                <div id="cardLogin" class="card card-rounded shadow col-sm-12 col-lg-4 col-xl-4 col-md-6">
                    <div  class="card-header bg-white text-center">                        
                        <img class="" width="70" height="70" src="./favicon.png">
                    </div>

                    <div class="card-body p-6">
                        <div class="form-group">          
                            <select class="form-control border-seconday border-top-0 border-right-0 negrita" id="cmbTipo">
                                <option value="GERENTE">GERENTE</option>
                                <option value="SUPERVISOR">SUPERVISOR</option>
                                <option value="PROVEEDOR">PROVEEDOR</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <input type="text" name="username" id="txtU" class="form-control border-seconday border-top-0 border-right-0 negrita" placeholder="Usuario..">
                        </div>
                        
                        <div class="form-group">
                            <input type="password" name="password" id="txtP" class="form-control border-seconday border-top-0 border-right-0 negrita" placeholder="Contraseña">
                        </div>
                                 
                        <div class="row">
                            <div class="col-6">
                            </div>
                            <div class="col-6 text-right">
                                <button class="btn btn-xl btn-secondary btn-circle shadow" id="btnIngresar">
                                    <i class="fal fa-lock"></i>
                                </button>        
                            </div>
                        </div>
                                    
                    </div>

                    <div class="footer>
                        <small class="negrita text-right" style="font-size:70%">por Alexis Burgos (${versionlog})</small>
                        <br>
                    </div>
            
                </div>

                <div id="" class="card card-rounded shadow col-sm-12 col-lg-8 col-xl-8 col-md-6" style="background:
                                                                                                url(./img/fondo.png) top/100% auto no-repeat;
                                                                                                background-repeat:no-repeat;">
                </div>

        </div>
            `
        }
    }


    root.innerHTML = view.login();

}

function addListeners(){


    let root

    let tipo = document.getElementById('cmbTipo');
    let u = document.getElementById('txtU');
    let p = document.getElementById('txtP');

    let btnIngresar = document.getElementById('btnIngresar');
    btnIngresar.addEventListener('click', ()=>{

       
        login(tipo.value,u.value,p.value,'btnIngresar')
    });


    funciones.animateCSS('cardLogin','backInRight');

};

function initView(){
    getView();
    addListeners();
};


function login(tipo,nombre,pass,element){

   let event = document.getElementById(element)
    event.innerHTML = `<i class="fal fa-unlock fa-spin"></i>`;
    event.disabled = true;

    let data = {nombre:nombre,clave:pass,tipo:tipo}
    //axios.get(`/usuarios/login?tipo=${tipo}&nombre=${nombre}&clave=${pass}`)
    axios.post(`/usuarios/login`,data)
    .then(res => {
      const resp = res.data;
        if(Number(resp.rowsAffected[0])==0){
            funciones.AvisoError('Usuario o contraseña incorrecta')
            event.innerHTML = `<i class="fal fa-lock"></i>`;
            event.disabled = false;
        }else{
            switch (tipo) {
                case "GERENTE":
                    GlobalSelectedTipoUsuario = 'GERENTE';
                    Navegar.inicio();        
                    break;
                case "PROVEEDOR":
                    GlobalSelectedTipoUsuario = 'PROVEEDOR';
                    Navegar.analisis_marca();
                    break;
                case "SUPERVISOR":
                   
                    GlobalSelectedTipoUsuario = 'SUPERVISOR';
                    GlobalSelectedCodSucursal = resp.recordset[0].CODSUCURSAL;
                   
                    Navegar.analisis_empresa(0,0,0);

                    break;
                default:
                    break;
            }
            
        }
      
    })
    .catch((error)=>{
        console.log(error);
        funciones.AvisoError('Usuario o contraseña incorrecta')
        event.innerHTML = `<i class="fal fa-lock"></i> Ingresar`;
        event.disabled = false;
    })
};


