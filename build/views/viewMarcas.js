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
            <div class="row" id="containerTotalesMarca">
                
            </div>
            <div class="col-12" id="containerTblMarcas">
                
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

    document.getElementById('btnCerrarModalDet').addEventListener('click', ()=>{
        $('#modalDetalles').modal('hide');

    });

};

function initView(){
    getView();
    addListeners();

    getTblVentasMarcas('containerTblMarcas');

};


function getTblVentasMarcas(idcontainer){
    let container = document.getElementById(idcontainer);
    container.innerHTML = GlobalLoader;

    let totalcosto = 0; let totalventa = 0; let totalutilidad = 0;
    let conteo = 0;


    axios.post(`/marcas/get_gen_marcas`,{empresas:parametrosEmpresas,anio:parametrosAnio,mes:parametrosMes})
    .then(res => {
        const data = res.data.recordset;
        
        let head = `
                    <table class="table table-responsive table-bordered table-striped  col-12 scroll-table" id="tblMarcas">
                        <thead class="bg-info text-white">
                            <tr>
                                <td>MARCA</td>
                                <td>COSTO</td>
                                <td>VENTA</td>
                                <td>UTILIDAD</td>
                                <td>MARG</td>
                                <td>PART</td>
                            </tr>
                        </thead>
                        <tbody>`;

        let dat = '';

        data.map((r)=>{
            conteo += 1;
            totalcosto += Number(r.TOTALCOSTO);
            totalventa += Number(r.TOTALPRECIO);
            totalutilidad += Number(r.UTILIDAD);
        })

        data.map((r)=>{
            dat += `
                <tr class="hand border-bottom" ondblclick="getDetallesMarca('${r.CODMARCA}','${r.DESMARCA}')">
                    <td>${GlobalIconoDobleClick} ${r.DESMARCA}</td>
                    <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                    <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                    <td>${funciones.setMoneda(r.UTILIDAD,'Q')}</td>
                    <td>${funciones.setMargen(((Number(r.UTILIDAD)/Number(r.TOTALPRECIO))*100).toFixed(2),'%')}</td>
                    <td>${((Number(r.TOTALPRECIO)/totalventa)*100).toFixed(2)}%</td>
                </tr>
            `
        })

        let foot = `</tbody>
                        <tfoot class="text-danger bg-foot-table table-bordered">
                            <tr>
                                <td></td>
                                <td>${funciones.setMoneda(totalcosto,'Q')}</td>
                                <td>${funciones.setMoneda(totalventa,'Q')}</td>
                                <td>${funciones.setMoneda(totalutilidad,'Q')}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    `

        container.innerHTML = head + dat + foot
        $('#tblMarcas').DataTable({
                        paging: false,
                        bFilter:false
        });

        getCardsMarcas(totalcosto,totalventa,totalutilidad);
       
    })
    .catch((error)=>{
        container.innerHTML = 'No se pudieron cargar los Datos...'
    })


};

function getCardsMarcas(costo,precio,utilidad){
    let container = document.getElementById('containerTotalesMarca');
    
    let view = `
    
    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
        <div class="card shadow border-top-rounded border-bottom-rounded p-4">
            <div class="row">
                <div class="col-9">
                    <h6>Total Costo:</h6>
                    <h5 class="text-secondary">${funciones.setMoneda(costo,'Q')}</h5>
                </div>
                <div class="col-3" style="font-size:40px">
                    <i class="fal fa-tag text-secondary"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
        <div class="card shadow border-top-rounded border-bottom-rounded p-4">
            <div class="row">
                <div class="col-9">
                    <h6>Total Venta:</h6>
                    <h5 class="text-success">${funciones.setMoneda(precio,'Q')}</h5>
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
                    <h6>Utilidad Bruta:</h6>
                    <h5 class="text-info">${funciones.setMoneda(utilidad,'Q')}</h5>
                </div>
                <div class="col-3" style="font-size:40px">
                    <i class="fal fa-chart-line text-info"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
        <div class="card shadow border-top-rounded border-bottom-rounded p-4">
            <div class="row">
                <div class="col-9">
                    <h6>Márgen:</h6>
                    <h5 class="text-danger">${funciones.getMargenUtilidad(precio,costo)}</h5>
                </div>
                <div class="col-3" style="font-size:40px">
                    <i class="fal fa-tag text-danger"></i>
                </div>
            </div>
        </div>
    </div>
    `

    container.innerHTML = view;

};


function getDetallesMarca(codmarca,desmarca){
    
    document.getElementById('lbDesMarca').innerText = 'Resumen: ' + desmarca + ' (Cod:' + codmarca + ')';
    $('#modalDetalles').modal('show');
    funciones.animateCSS('modalDetalles','backInRight');

}