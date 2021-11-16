function getView(){

    let view = {
        usuarios:()=>{
            return `
            <div class="row">
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="card shadow border-top-rounded border-bottom-rounded">
                        <div class="card-header bg-info">
                            <h5 class="text-white">Gestión de Usuarios</h5>
                        </div>
                        <br>
                        <div class="" align="right">
                            <button class="btn btn-lg btn-outline-success hand shadow" id="btnNuevoUsuario">
                                <i class="fas fa-plus"></i> Nuevo Usuario
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-responsive">
                                    <thead class="bg-info text-white">
                                        <tr>
                                            <td>Usuario</td>
                                            <td>Contraseña</td>
                                            <td>Tipo</td>
                                            <td>Marca</td>
                                            <td>Sucursal</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody id="tblUsuarios">
                                        
                                    </tbody>
                
                                </table>
                
                            </div>
            
                        </div> 
                
                    </div>
                
                </div>
            
            </div>
            `
        },
        modalDetalleUsuario:()=>{
            return `
            <div class="modal fade" id="modalUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">Datos del Nuevo Usuario</h5>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Usuario:</label>
                                <input type="text" class="form-control" id="txtUsuarioNombre">    
                            </div>
                            <div class="form-group">
                                <label>Contraseña:</label>
                                <input type="password" class="form-control" id="txtUsuarioPass">    
                            </div>
                            <div class="form-group">
                                <label>Tipo:</label>
                                <select class="form-control" id="cmbUsuarioTipo">
                                    <option value="GERENTE">GERENTE</option>
                                    <option value="SUPERVISOR">SUPERVISOR</option>
                                    <option value="PROVEEDOR">PROVEEDOR</option>
                                </select>    
                            </div>

                            <div class="form-group">
                                <label>Sede:</label>
                                <select class="form-control" id="cmbUsuarioSede">
                                    <option value="ME-ZACAPA">ME-ZACAPA</option>
                                    <option value="ME-JUTIAPA">ME-JUTIAPA</option>
                                    <option value="ME-IZABAL">ME-IZABAL</option>
                                    <option value="ME-COBAN">ME-COBAN</option>
                                    <option value="ME-PETEN">ME-PETEN</option>
                                </select>    
                            </div>
                            
                            <div class="form-group">
                                <label>Código de Marca:</label>
                                <input type="number" class="form-control" id="txtUsuarioMarca">    
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary btn-xl btn-circle shadow hand" id="btnCerrarModalUsuario">
                                X
                            </button>

                            <button class="btn btn-info btn-xl btn-circle shadow hand" id="btnGuardarUsuario">
                                <i class="fas fa-check"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            `
        }
    }

    root.innerHTML = view.usuarios() + view.modalDetalleUsuario();

};

function addListeners(){
    let cmbUsuarioTipo = document.getElementById('cmbUsuarioTipo');
    let txtUsuarioMarca = document.getElementById('txtUsuarioMarca');
    let cmbUsuarioSede = document.getElementById('cmbUsuarioSede');

    cmbUsuarioTipo.addEventListener('change',()=>{
        switch (cmbUsuarioTipo.value) {
            case "GERENTE":
                txtUsuarioMarca.style="visibility:hidden";
                cmbUsuarioSede.style ="visibility:hidden";
                break;
            case "SUPERVISOR":
                txtUsuarioMarca.style="visibility:hidden";
                cmbUsuarioSede.style ="visibility:visible";
                break;
            case "PROVEEDOR":
                txtUsuarioMarca.style="visibility:visible";
                cmbUsuarioSede.style ="visibility:hidden";

                break;

            default:
                break;
        }
    })
    
    document.getElementById('btnCerrarModalUsuario').addEventListener('click',()=>{
        $('#modalUsuario').modal('hide');
    });

    document.getElementById('btnNuevoUsuario').addEventListener('click',()=>{
        document.getElementById('cmbUsuarioSede').value='ME-ZACAPA';
        document.getElementById('cmbUsuarioTipo').value='GERENTE';
        document.getElementById('txtUsuarioNombre').value='';
        document.getElementById('txtUsuarioPass').value='';
        document.getElementById('txtUsuarioMarca').value=0;

        txtUsuarioMarca.style="visibility:hidden";
        cmbUsuarioSede.style ="visibility:hidden";
       
    
        $('#modalUsuario').modal('show');
    });

    let btnGuardarUsuario = document.getElementById('btnGuardarUsuario');
    btnGuardarUsuario.addEventListener('click',()=>{
        funciones.Confirmacion('¿Está seguro que desea crear este nuevo Usuario?')
        .then((value)=>{
            if(value==true){
                btnGuardarUsuario.disabled = true;
                btnGuardarUsuario.innerHTML = '<i class="fas fa-check fa-spin"></i>';

                fcn_insert_usuario()
                .then(()=>{
                    btnGuardarUsuario.disabled = false;
                    btnGuardarUsuario.innerHTML = '<i class="fas fa-check"></i>';
                    funciones.Aviso('Usuario creado exitosamente!!')
                    $('#modalUsuario').modal('hide');

                    getListaUsuarios();
                })
                .catch(()=>{
                    funciones.AvisoError('No se pudo crear este usuario')
                    btnGuardarUsuario.disabled = false;
                    btnGuardarUsuario.innerHTML = '<i class="fas fa-check"></i>';
                })



            }
        })
    });

   getListaUsuarios();

};


function initView(){
    getView();
    addListeners();
};



function getListaUsuarios(){
    let str = '';
    let container = document.getElementById('tblUsuarios');
    container.innerHTML = GlobalLoader;

    axios.post(`/usuarios/select_usuarios`)
        .then(res => {
            const datos = res.data.recordset;
            datos.map((r)=>{
                str += `
                <tr class="border-bottom border-secondary">
                    <td>${r.USUARIO}</td>
                    <td>${r.PASS}</td>
                    <td>${r.TIPO}</td>
                    <td>${r.CODMARCA}</td>
                    <td>${r.CODSUCURSAL}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger btn-circle hand" onclick="deleteUsuario('${r.ID}')" id="btnElim${r.ID.toString()}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
                `
            })
            container.innerHTML = str;
        })
        .catch(()=>{
           container.innerHTML = 'No se pudieron cargar los datos...'
        })
}



function deleteUsuario(id){
    funciones.Confirmacion('¿Está seguro que desea ELIMINAR este Usuario?')
    .then((value)=>{
        if(value==true){
            document.getElementById('btnElim' + id.toString()).innerHTML = '<i class="fas fa-trash fa-spin"></i>';
            document.getElementById('btnElim' + id.toString()).disabled =true;

            fcn_delete_usuario(id)
            .then(()=>{
                funciones.Aviso('Usuario eliminado exitosamente!!');
                getListaUsuarios();
            })
            .catch(()=>{
                document.getElementById('btnElim' + id.toString()).innerHTML = '<i class="fas fa-trash"></i>';
                document.getElementById('btnElim' + id.toString()).disabled =false;
            })

        }
    })
}


function fcn_delete_usuario(id){
    return new Promise((resolve, reject)=>{
        
        axios.post(`/usuarios/delete_usuario`,{id:id})
        .then(res => {
            const datos = res.data;
            if(Number(datos.rowsAffected[0])>0){
                resolve();             
            }else{
                reject();
            }    
        })
        .catch(()=>{
            reject();
        })

    })
};



function fcn_insert_usuario(){
    return new Promise((resolve, reject)=>{
        
        let data = {
            sede: document.getElementById('cmbUsuarioSede').value,
            tipo: document.getElementById('cmbUsuarioTipo').value,
            nombre: document.getElementById('txtUsuarioNombre').value,
            clave: document.getElementById('txtUsuarioPass').value, 
            codmarca: document.getElementById('txtUsuarioMarca').value
        }
        
        axios.post(`/usuarios/insert_usuario`, data)
        .then(res => {
            const datos = res.data;
            if(Number(datos.rowsAffected[0])>0){
                document.getElementById('cmbUsuarioSede').value = 'ME-ZACAPA';
                document.getElementById('cmbUsuarioTipo').value='GERENTE';
                document.getElementById('txtUsuarioNombre').value='';
                document.getElementById('txtUsuarioPass').value='';
                document.getElementById('txtUsuarioMarca').value=0;
                resolve();             
            }else{
                reject();
            }    
        })
        .catch(()=>{
            reject();
        })

    })
};