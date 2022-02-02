function getView(){
    let view = { 
        login:()=>{
            return `
          
            <div class="container-fluid">
                <div id="cardLogin"  class="row main-content bg-success text-center">
                    <div class="col-md-4 text-center company__info bg-login">
                        
                        <img class="company__logo" width="100" height="100" src="./favicon.png">
                        
                    </div>
                    <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                        <div class="container-fluid">
                            <div class="row">
                            </div>
                            <div class="row">
                                <form control="" class="form-group">
                                    <div class="row">
                                        
                                        <select class="form__input" id="cmbTipo">
                                            <option value="GERENTE">GERENTE</option>
                                            <option value="SUPERVISOR">SUPERVISOR</option>
                                            <option value="PROVEEDOR">PROVEEDOR</option>
                                        </select>
                                    </div>
                                    <div class="row">
                                        <input type="text" name="username" id="txtU" class="form__input" placeholder="Usuario..">
                                    </div>
                                    <div class="row">
                                        <input type="password" name="password" id="txtP" class="form__input" placeholder="Contraseña">
                                    </div>
                                 
                                    <div class="row">
                                        <button class="btn-redondo" id="btnIngresar">
                                            <i class="fas fa-lock"></i>Ingresar
                                        </button>
                                    </div>
                                    <br>
                                </form>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer -->
            <div class="container-fluid text-center footer" style="font-size:10px">
                (Rev 2.2022) Por <a href="https://api.whatsapp.com/send?phone=50257255092&text=Hola%20Alexis%2C%20puedes%20ayudarme%20...." target="_blank">Alexis Burgos (v.11.2021)</a>
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
    event.innerHTML = `<i class="fas fa-unlock fa-spin"></i>`;
    event.disabled = true;

    let data = {nombre:nombre,clave:pass,tipo:tipo}
    //axios.get(`/usuarios/login?tipo=${tipo}&nombre=${nombre}&clave=${pass}`)
    axios.post(`/usuarios/login`,data)
    .then(res => {
      const resp = res.data;
        if(Number(resp.rowsAffected[0])==0){
            funciones.AvisoError('Usuario o contraseña incorrecta')
            event.innerHTML = `<i class="fas fa-lock"></i>Ingresar`;
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
        event.innerHTML = `<i class="fas fa-lock"></i>Ingresar`;
        event.disabled = false;
    })
};


