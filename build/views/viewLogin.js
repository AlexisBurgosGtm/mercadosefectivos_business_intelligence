function getView(){
    let view = { 
        login:()=>{
            return `
          
            <div id="cardLogin" class="card card-rounded shadow col-sm-12 col-lg-4 col-xl-4 col-md-6">
                    <div  class="card-header text-center">                        
                        <img class="" width="100" height="100" src="./favicon.png">
                    </div>

                    <div class="card-body">
                        <div class="form-group">          
                            <select class="form-control" id="cmbTipo">
                                <option value="GERENTE">GERENTE</option>
                                <option value="SUPERVISOR">SUPERVISOR</option>
                                <option value="PROVEEDOR">PROVEEDOR</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <input type="text" name="username" id="txtU" class="form-control" placeholder="Usuario..">
                        </div>
                        
                        <div class="form-group">
                            <input type="password" name="password" id="txtP" class="form-control" placeholder="Contraseña">
                        </div>
                                 
                        <div class="row">
                            <div class="col-6">
                            </div>
                            <div class="col-6 text-right">
                                <button class="btn btn-lg btn-info btn-rounded shadow" id="btnIngresar">
                                    <i class="fal fa-lock"></i> Ingresar
                                </button>        
                            </div>
                            
                            
                        </div>
                                    
                    </div>
            
            </div>

            <!-- Footer -->
            <div class="footer" style="font-size:10px">
                Por <a href="https://api.whatsapp.com/send?phone=50257255092&text=Hola%20Alexis%2C%20puedes%20ayudarme%20...." target="_blank">Alexis Burgos (v.2.2022)</a>
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
    btnIngresar.addEventListener('click',()=>{
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
            event.innerHTML = `<i class="fal fa-lock"></i> Ingresar`;
            event.disabled = false;
        }else{
            switch (tipo) {
                case "GERENTE":
                    Navegar.inicio();        
                    break;
                case "PROVEEDOR":
                    Navegar.analisis_marca();
                    break;
                case "SUPERVISOR":
                    Navegar.analisis_empresa();
                    break;
                default:
                    break;
            }
            
        }
      
    })
    .catch(()=>{
        funciones.AvisoError('Usuario o contraseña incorrecta')
        event.innerHTML = `<i class="fal fa-lock"></i> Ingresar`;
        event.disabled = false;
    })
};


