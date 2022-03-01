function getView(){
    let view = {
        header: ()=>{
            return `
            <div class="row shadow p-2 border-top-rounded border-bottom-rounded">
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <h3 class="text-danger negrita">${GlobalSelectedCodSucursal}</h3>
                </div>
                
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <button class="btn btn-outline-secondary shadow" id="btnTabHome">
                        <i class="fal fa-chart-pie"></i>Sales Overview
                    </button>
                    <button class="btn btn-outline-danger shadow" id="btnTab1">
                        <i class="fal fa-shopping-cart"></i>Products
                    </button>
                    <button class="btn btn-outline-info shadow" id="btnTab2">
                        <i class="fal fa-address-book"></i>Customers
                    </button>
                    <button class="btn btn-outline-success shadow" id="btnTab3">
                        <i class="fal fa-briefcase"></i>Routes(Employees)
                    </button>
                </div>
            </div>
            <hr class="solid">
            `
        },
        body:()=>{
            return `
            <br>
            <div class="row">
                <div class="tab-content col-12" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="tabHome" role="tabpanel" aria-labelledby="pills-home-tab">
                        ${view.home()}
                    </div>
                    <div class="tab-pane fade" id="tab1" role="tabpanel" aria-labelledby="pills-profile-tab">
                        ${view.products()}
                    </div>
                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="pills-profile-tab">
                        ${view.customers()}
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="pills-contact-tab">
                        ${view.routes()}
                    </div>
                </div>
            </div>
            `
        },
        home:()=>{
            return `
            <div class="row">
                <div class="col-sm-6 col-md-4 col-xl-3 col-lg-3">
                
                    <div class="card p-4 shadow border-top-rounded border-bottom-rounded" id="containerCardE1"  ondblclick="expandir('containerCardE1')">

                    </div>
                </div>
                
                <div class="col-sm-6 col-md-8 col-xl-9 col-lg-9">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGrafE2"  ondblclick="expandir('containerGrafE2')">
                    

                    </div>
                </div>           

            </div>

            <div class="row">
                <div class="card shadow border-top-rounded border-bottom-rounded col-12" id="containerGrafE1"  ondblclick="expandir('containerGrafE1')">
                </div>
            </div>`
        },
        products:()=>{
            return `
            <div class="row">
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">

                    <div class="card shadow table-responsive col-12"  id="containertblProductos">
                    
                    </div>
                </div>
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">

                    <div class="card shadow table-responsive col-12"  id="containertblMunicipiosProductos">
                    
                    </div>
                </div>
            </div>
           `
        },
        customers:()=>{
            return `
            <div class="row">
                <div class="card shadow col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive"  id="containerTblMunicipios">
                    </div>
                </div>

                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="row">
                        <div class="col-6">
                            <div class="table-responsive"  id="containertblMunicipiosProductos2">
                            </div>      
                        </div>
                        <div class="col-6">
                            <div class="table-responsive"  id="containertblMunicipiosClientes">
                            </div>  
                        </div>
                    </div>  
                    
                </div>
                    
            </div>
            `
        },
        routes:()=>{
            return `
            <div class="row">
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive card shadow border-top-rounded border-bottom-rounded" id="containertblVendedores">
                    
                    </div>   
                </div>
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive card shadow border-top-rounded border-bottom-rounded" id="containertblVendedoresProductos">
                        
                    </div>            
                </div>
                    
            </div>
            `
        }
        
    }

    root.innerHTML = view.header() + view.body();
    funciones.slideAnimationTabs();
};

function addListeners(){
    document.getElementById('btnTabHome').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.add('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.remove('show','active');
    })
    document.getElementById('btnTab1').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.add('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.remove('show','active');
        //PRODUCTOS
        try {
            
        } catch (error) {
            
        }
    })
    document.getElementById('btnTab2').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.add('show','active');
        document.getElementById('tab3').classList.remove('show','active');
          //CLIENTES
          try {
            
        } catch (error) {
            
        }
    })
    document.getElementById('btnTab3').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.add('show','active');
          //RUTAS - EMPLEADOS
          try {
            
        } catch (error) {
            
        }
    });

    funciones.slideAnimationTabs();
    
};

function initView(codsucursal,ventas,devoluciones,universo){
    getView();
    addListeners();

    getCardInicio(ventas,devoluciones,universo);

    getEmpresaData();

};

function getEmpresaData(){

    getDataEmpresaFechas()
    .then((datos)=>{
        getLineChartFechasEmpresa(datos);
    })
    .catch(()=>{
        
    });


};

function getCardInicio(ventas,devoluciones,universo){
    let container = document.getElementById('containerCardE1');

    let view = `
        <div class="row">
            <div class="col-9">

                <label>Ventas:</label>
                <label class="negrita text-success">${funciones.setMoneda(ventas,'Q')}</label>
                <br>
                <label>Devoluciones:</label>
                <label class="negrita text-danger">${funciones.setMoneda(devoluciones,'Q')}</label>
                <h5 class="negrita text-danger">${(((devoluciones * -1) / ventas) * 100).toFixed(2)} %</h5>
                
                <label>Total Bruto:</label>
                <h5 class="negrita text-info">${funciones.setMoneda((Number(ventas)+Number(devoluciones)),'Q')}</h5>

            </div>
            <div class="col-3" style="font-size:30px">
                <i class="bx bx-dollar"></i>
            </div>
        </div>
    `
    container.innerHTML = view;

};
function getDataCardInicio(data){

    let totalventa = 0; let totaldevoluciones = 0; let universo = 0;
    
    data.map((r)=>{
        totalventa += Number(r.TOTALPRECIO);
        totaldevoluciones += Number(r.TOTALDEVOLUCIONES);
    })

    getCardInicio(totalventa,totaldevoluciones,universo);
}

// FECHAS ----------------------------
function getDataEmpresaFechas(){
    return new Promise((resolve, reject)=>{
        
        let data = {
            empresa:GlobalSelectedCodSucursal,
            anio:parametrosAnio,
            mes:parametrosMes
        };

        axios.post(`/empresas/getVentasFechas`, data)
        .then(res => {
            const datos = res.data.recordset;   
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })

    })
};

function getTblFechas(data){

       
    let container = document.getElementById('containerFechas');
    container.innerHTML = getLoader();
    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;

    let head = `<h5>VENTAS POR FECHA</h5>
    <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('containerFechas')">Expandir</button>
                <table class="table table-responsive table-hover table-striped" style="font-size:80%;" id="tblVFMarcas">
                    <thead class="bg-secondary text-white">
                        <tr>
                            <td>FECHA</td>
                            <td>COSTO</td>
                            <td>VENTA</td>
                            <td>UTILIDAD</td>
                            <td>MARG</td>
                        </tr>
                    </thead>
                    <tbody>`;

 

    let dat = '';

    data.map((r)=>{
        totalventa += Number(r.TOTALPRECIO);
        totalcosto += Number(r.TOTALCOSTO);
        totalutilidad += Number(r.UTILIDAD);
        dat += `
            <tr class="hand">
                <td>${funciones.cleanFecha(r.FECHA)}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.UTILIDAD,'')}</td>
                <td>${funciones.setMargen(((Number(r.UTILIDAD)/Number(r.TOTALPRECIO))*100).toFixed(2),'%')}</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="negrita bg-gris text-danger">
                        <tr>
                            <td></td>
                            <td>${funciones.setMoneda(totalcosto,'Q')}</td>
                            <td>${funciones.setMoneda(totalventa,'Q')}</td>
                            <td>${funciones.setMoneda(totalutilidad,'Q')}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                `

    container.innerHTML = head + dat + foot 

    $('#tblVFMarcas').DataTable({
        paging: false
    });
};

function getLineChartFechasEmpresa(data){
   
    let container = document.getElementById('containerGrafE1');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart1" width="100" height="40"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
    });
   
    data.map((r)=>{
            label.push(funciones.convertDateNormal(r.FECHA));
            valor.push(Number(r.TOTALPRECIO.toFixed(2)));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label:"Ventas",
                data:valor,
                backgroundColor:bgColor
            }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Ventas por Fecha. Total: ' + funciones.setMoneda(total,'Q')
            },
            // Change options for ALL labels of THIS CHART
            datalabels: {
                anchor:'end',
                align:'end',
                listeners: {
                  click: function(context) {
                    // Receives `click` events only for labels of the first dataset.
                    // The clicked label index is available in `context.dataIndex`.
                    console.log(context);
                  }
                },
                formatter: function(value) {
                  return funciones.setMoneda(value,'Q');
                  // eq. return ['line1', 'line2', value]
                },
                color: function(context) {
                  return context.dataset.backgroundColor;
                },
                borderColor: 'white',
                borderRadius: 25,
                borderWidth: 0,
                font: {
                  weight: 'bold'
                }
              }
          }
        }
    });



};
// FECHAS -----------------