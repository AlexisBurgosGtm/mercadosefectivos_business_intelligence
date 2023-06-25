function getView(){
    let view = { 
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.card_tipo_usuario()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           ${view.card_login()}
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            
                        </div>    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-uno" data-toggle="tab" href="#uno" role="tab" aria-controls="uno" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-dos" data-toggle="tab" href="#dos" role="tab" aria-controls="dos" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-tres" data-toggle="tab" href="#tres" role="tab" aria-controls="tres" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>         
                    </ul>
                </div>
            `
        },
        card_tipo_usuario:()=>{
            return `
            <div id="cardLogin" class="card card-rounded shadow">
                <div class="card-body p-4">                         
                    <br>
                    
                        <div class="row">
                            <div class="card card-rounded shadow text-primary border-primary p-4 hand col-12" onclick="get_tipo_usuario('GERENTE')">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-auto">
                                            <img class="" width="40" height="40" src="./favicon.png">
                                        </div>
                                        <div class="col-auto">
                                            <h1 class="text-primary text-center negrita">Gerente</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>

                        <div class="row">
                            <div class="card card-rounded shadow border-info p-4 hand col-12" onclick="get_tipo_usuario('SUPERVISOR')">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-auto">
                                            <img class="" width="40" height="40" src="./favicon.png">
                                        </div>
                                        <div class="col-auto">
                                            <h1 class="text-info text-center negrita">Supervisor</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        
                        <div class="row">
                            <div class="card card-rounded shadow text-danger border-danger p-4 hand col-12" onclick="get_tipo_usuario('PROVEEDOR')">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-auto">
                                            <img class="" width="40" height="40" src="./favicon.png">
                                        </div>
                                        <div class="col-auto">
                                            <h1 class="text-danger text-center negrita">Proveedor</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                </div>
            </div>
            `
        },
        card_login:()=>{
            return `
            <div id="" class="card card-rounded shadow">
                <div class="card-body p-6">
                    <br>        
                    <div class="form-group">
                            <label class="negrita text-secondary">Usuario:</label>
                            <input type="text" name="username" id="txtU" class="form-control border-primary text-primary negrita" placeholder="Usuario..">
                    </div>
                    <br>    
                    <div class="form-group">
                            <label class="negrita text-secondary">Clave:</label>
                            <input type="password" name="password" id="txtP" class="form-control border-primary text-primary negrita" placeholder="Contraseña">
                    </div>             
                    <div class="row">
                        <div class="col-6">
                            <button class="btn btn-circle btn-outline-secondary btn-xl hand shadow" onclick="document.getElementById('tab-uno').click();">
                                <i class="fal fa-arrow-left"></i>
                            </button>
                        </div>
                        <div class="col-6 text-right">
                                <button class="btn btn-xl btn-primary btn-circle shadow hand" id="btnIngresar">
                                    <i class="fal fa-lock"></i>
                                </button>        
                        </div>
                    </div>     
                    <div class="form-group hidden">          
                            <select class="form-control border-seconday border-top-0 border-right-0 negrita" id="cmbTipo">
                                <option value="GERENTE">GERENTE</option>
                                <option value="SUPERVISOR">SUPERVISOR</option>
                                <option value="PROVEEDOR">PROVEEDOR</option>
                            </select>
                    </div>

                    <div class="footer">
                        <div class="row">
                            <div class="col-6">
                              
                            </div>
                            <div class="col-6">
                                <small class="negrita text-right" style="font-size:70%">por Alexis Burgos (${versionlog})</small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `
        },
        login:()=>{
            return `
            <br>
        <div class="row">
            <div class="col-sm-12 col-lg-4 col-xl-4 col-md-6">
                ${view.body()}
            </div>
            
            <div class="col-sm-12 col-lg-8 col-xl-8 col-md-6 card-rounded shadow"  style="background:url(./img/fondo.png) top/100% auto no-repeat;background-repeat:no-repeat;">
                
            </div>
        </div>
            `
        }
    }


    root.innerHTML = view.login();


}

function addListeners(){


    let tipo = document.getElementById('cmbTipo');
    let u = document.getElementById('txtU');
    let p = document.getElementById('txtP');

    let btnIngresar = document.getElementById('btnIngresar');
    btnIngresar.addEventListener('click', ()=>{

       
        login(tipo.value,u.value,p.value,'btnIngresar')
    });

    funciones.slideAnimationTabs();

    //funciones.animateCSS('cardLogin','backInRight');
    document.getElementById('tab-uno').click();

};

function initView(){
    getView();
    addListeners();
};

function get_tipo_usuario(tipo){
    GlobalSelectedTipoUsuario = tipo;
    document.getElementById('cmbTipo').value = tipo;
    document.getElementById('tab-dos').click();
}

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


