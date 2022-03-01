function getView(){
    let view = {
        body:()=>{
            return `
            <div class="row">
                <div class="tab-content col-12" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="tabHome" role="tabpanel" aria-labelledby="pills-home-tab">
                        ${view.home()}
                    </div>
                    <div class="tab-pane fade" id="tab1" role="tabpanel" aria-labelledby="pills-profile-tab">
                       
                    </div>
                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="pills-profile-tab">
                        
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="pills-contact-tab">
                       
                    </div>
                </div>
            </div>
            `
        },
        home:()=>{
            return `
            <div class="row" id="containerTotalesEmpleados">
                
            </div>
            <div class="col-12" id="tblTablaV">
                
            </div>
            `
        },
        modalDetalles: ()=>{
            return `
            <div class="modal fade" id="modalDetalles" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="lbDesMarca"></h5>
                        </div>
                        <div class="modal-body">
                            <li>VENTAS POR EMPRESA</li>
                            <li>DEVOLUCIONES POR EMPRESA</li>
                            <li>VENTAS POR EMPRESA</li>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary btn-xl btn-circle shadow" id="btnCerrarModalDet">
                                X
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            `
        }
        
    }

    root.innerHTML = view.body() + view.modalDetalles();
};

function addListeners(){

    getDataVendedores()
    .then((datos)=>{
        getTblVentasVendedores(datos);
    })


};

function initView(){
    getView();
    addListeners();

  
};


function getDataVendedores(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/empresas/getVentasVendedores?empresas=${parametrosEmpresas}&mes=${parametrosMes}&anio=${parametrosAnio}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};

function getTblVentasVendedores(data){
    
    
    let container = document.getElementById('tblTablaV');
    container.innerHTML = getLoader();

    let totaldevoluciones = 0; let totalventa = 0; let totalutilidad = 0;
    let conteo = 0;

    let head = `<h5 class="text-danger">VENTAS POR VENDEDOR</h5>
            <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tblTablaV')">Expandir</button>
                <table class="table table-responsive table-bordered table-striped  col-12"  style="font-size:80%;" id="tblTablaVendedores">
                    <thead class="bg-danger text-white">
                        <tr>
                            <td>VENDEDOR</td>
                            <td>VENTAS</td>
                            <td>DEVOLUCIONES</td>
                            <td>TOTALNETO</td>
                            <td>DEV%</td>
                            <td>PART</td>
                        </tr>
                    </thead>
                    <tbody>`;

    let dat = '';

    data.map((r)=>{
        conteo += 1;
        totaldevoluciones += Number(r.DEVOLUCIONES);
        totalventa += Number(r.VENTAS);
    })

    totalutilidad = Number(totalventa + totaldevoluciones);
   
    data.map((r)=>{
        let totalneto = Number(r.VENTAS) + Number(r.DEVOLUCIONES);
        dat += `
            <tr class="hand border-bottom border-dark" ondblclick="gotoVendedor('${r.CODVEN}','${r.NOMVEN}')">
                <td>${GlobalIconoDobleClick} ${r.NOMVEN}
                    <br>
                    <small class="negrita">${r.CODSUCURSAL}</small>
                </td>
                <td class="currSign">${funciones.setMoneda(r.VENTAS,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.DEVOLUCIONES,'')}</td>
                <td class="currSign">${funciones.setMoneda(totalneto,'')}</td>
                <td>${((Number(r.DEVOLUCIONES *-1)/Number(r.VENTAS))*100).toFixed(2)}%</td>
                <td>${((totalneto / totalventa)* 100).toFixed(2)}%</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="text-danger bg-foot-table table-bordered">
                        <tr>
                            <td></td>
                            <td>${funciones.setMoneda(totalventa,'Q')}</td>
                            <td>${funciones.setMoneda(totaldevoluciones,'Q')}</td>
                            <td>${funciones.setMoneda(totalutilidad,'Q')}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                `

    container.innerHTML = head + dat + foot
    $('#tblTablaVendedores').DataTable({
                    paging: true,
    });

    getCardsEmpleados(totalventa,totaldevoluciones,totalutilidad);

};

function gotoVendedor(codven, nomven){
   
    //Navegar.analisis_fecha();
};


function getCardsEmpleados(totalventas,totaldevoluciones,totalutilidad){

    let container = document.getElementById('containerTotalesEmpleados');
    
    let view = `
    
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
        <div class="card shadow border-top-rounded border-bottom-rounded p-4">
            <div class="row">
                <div class="col-9">
                    <h6>Total Ventas:</h6>
                    <h5 class="text-success">${funciones.setMoneda(totalventas,'Q')}</h5>
                </div>
                <div class="col-3" style="font-size:40px">
                    <i class="fal fa-shopping-cart text-success"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
        <div class="card shadow border-top-rounded border-bottom-rounded p-4">
            <div class="row">
                <div class="col-9">
                    <h6>Total Devoluciones:</h6>
                    <h5 class="text-danger">${funciones.setMoneda(totaldevoluciones,'Q')}</h5>
                </div>
                <div class="col-3" style="font-size:40px">
                    <i class="fal fa-tag text-danger"></i>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
        <div class="card shadow border-top-rounded border-bottom-rounded p-4">
            <div class="row">
                <div class="col-9">
                    <h6>Utilidad Bruta:</h6>
                    <h5 class="text-info">${funciones.setMoneda(totalutilidad,'Q')}</h5>
                </div>
                <div class="col-3" style="font-size:40px">
                    <i class="fal fa-chart-line text-info"></i>
                </div>
            </div>
        </div>
    </div>

    `

    container.innerHTML = view;


};