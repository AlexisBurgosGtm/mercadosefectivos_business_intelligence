function getView(){
    let view = {
        login: ()=>{
            return `
            <div id="cardLogin" class="mx-auto card shadow p-4 col-sm-12 col-md-4 col-xl-4 col-lg-4 border-top-rounded border-bottom-rounded">
                <div class="card-header bg-white text-center">
                    <img src="../favicon.png" width="40" height="40">
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label class="negrita">Tipo Usuario</label>
                        <select class="form-control border-bottom border-right border-secondary border-left-0" id="cmbTipo">
                            <option value="GERENTE">GERENTE</option>
                            <option value="SUPERVISOR">SUPERVISOR</option>
                            <option value="PROVEEDOR">PROVEEDOR</option>
                        </select>
                    </div>
                    <br>
                    <div class="form-group">
                        <label class="negrita">Usuario</label>
                        <input type="text" class="form-control" id="txtU">
                    </div>
                    <br>
                    <div class="form-group">
                        <label class="negrita">Clave</label>
                        <input type="password" class="form-control" id="txtP">    
                    </div>
                    <br>
                    <div class="form-group">
                        <button class="btn btn-outline-info btn-lg shadow btn-rounded" id="btnIngresar">
                            <i class="fas fa-lock"></i>Ingresar
                        </button>
                    </div>
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

    axios.get(`/usuarios/login?tipo=${tipo}&nombre=${nombre}&clave=${pass}`)
    .then(res => {
      const resp = res.data;
        if(Number(resp.rowsAffected[0])==0){
            funciones.AvisoError('Usuario o contraseña incorrecta')
            event.innerHTML = `<i class="fas fa-lock"></i>Ingresar`;
            event.disabled = false;
        }else{
            Navegar.inicio();
        }
      
    })
    .catch(()=>{
        funciones.AvisoError('Usuario o contraseña incorrecta')
        event.innerHTML = `<i class="fas fa-lock"></i>Ingresar`;
        event.disabled = false;
    })
};
