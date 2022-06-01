function getView(){
    let view = {
        header: ()=>{
            return `
            <div class="row shadow p-2 border-top-rounded border-bottom-rounded">
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <h3 class="text-danger">${GlobalSelectedDesMarca}</h3>
                </div>
                
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <button class="btn btn-outline-secondary" id="btnTabHome">
                        <i class="fal fa-chart-pie"></i>Sales Overview
                    </button>
                    <button class="btn btn-outline-danger" id="btnTab1">
                        <i class="fal fa-shopping-cart"></i>Products
                    </button>
                    <button class="btn btn-outline-info" id="btnTab2">
                        <i class="fal fa-address-book"></i>Customers
                    </button>
                    <button class="btn btn-outline-success" id="btnTab3">
                        <i class="fal fa-briefcase"></i>Routes
                    </button>
                    <button class="btn btn-outline-success" id="btnTab4">
                        <i class="fal fa-calendar"></i>Monthly
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
                    <div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="pills-contact-tab">
                        ${view.month()}
                    </div>
                </div>
            </div>
            `
        },
        home:()=>{
            return `
            <div class="row">
                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf7"  ondblclick="expandir('containerGraf7')">
                    
                    </div>
                </div>
                
                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf2"  ondblclick="expandir('containerGraf2')">
                
                    </div>    
                </div>
            
                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf8"  ondblclick="expandir('containerGraf8')">
                    
                    </div>
                </div>

                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf6"  ondblclick="expandir('containerGraf6')">
                    
                    </div>
                </div>

            

            </div>

            <div class="row">
                <div class="card shadow border-top-rounded border-bottom-rounded col-12" id="containerGraf1"  ondblclick="expandir('containerGraf1')">
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
        },
        month:()=>{
            return `
            <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGrafMesGen">
                    
            </div
            <div class="row">
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="">
                    
                    </div>   
                </div>
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive card shadow border-top-rounded border-bottom-rounded" id="">
                        
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
        document.getElementById('tab4').classList.remove('show','active');
        

      
    })
    document.getElementById('btnTab1').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.add('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.remove('show','active');
        document.getElementById('tab4').classList.remove('show','active');
        
        //aplica el formato de datatable ya que no funciona si está oculto
        try {
            $('#tblMarcaProductos').DataTable({paging: false, bFilter:true, order: [[6, 'desc']] });
            //$("#tblMarcaProductos").DataTable().fnDestroy();    
        } catch (error) {
            
        }
         

    })
    document.getElementById('btnTab2').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.add('show','active');
        document.getElementById('tab3').classList.remove('show','active');
        document.getElementById('tab4').classList.remove('show','active');
        
        try {
            //customers
            $('#tblVFMunicipios').DataTable({ paging: false, bFilter:false, order: [[5, 'desc']] });
        } catch (error) {
            
        }

   
    })
    document.getElementById('btnTab3').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.add('show','active');
        document.getElementById('tab4').classList.remove('show','active');
        

        //routes
        try {
            $('#tblVVendedores').DataTable({paging: false, bFilter:false, order: [[6, 'desc']] });    
        } catch (error) {
            
        }
        
    })
    
    document.getElementById('btnTab4').addEventListener('click',()=>{
       
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.remove('show','active');
        document.getElementById('tab4').classList.add('show','active');
        
        getDataMesGeneral()
        .then((datos)=>{
            getBarCharMesesGeneral(datos);
        })
    });

    funciones.slideAnimationTabs();

};

function initView(){
    getView();
    addListeners();
    getDataMarca();
};

function getDataMarca(){

    getDataFechas()
    .then(async(datos)=>{
        //getTblFechas(datos)
        getLineChartFechas(datos);    
    });

    
    getDataMunicipiosClientes()
    .then((datos)=>{
        getPieChartClientesEmpresas(datos);
        getPieChartClientesEmpresasConteo(datos);
    });

    getDataVentasMarca()
    .then(async (datos)=>{
        getPieChartVentasEmpresa(datos);
        getPieChartOportunidadEmpresa(datos);
    })

    
    getDataProductos()
    .then(async(datos)=>{
        await getTblProductos(datos);
    });


    getDataMunicipios()
    .then(async(datos)=>{
        //getPieChartMunicipios(datos);
        await getTblMunicipios(datos);
    });

    getDataVendedores()
    .then(async(datos)=>{
        await getTblVendedores(datos);
    });

    

};




function getDataFechas(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/empresas/getFechaMarca?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
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

function getLineChartFechas(data){
   
    let container = document.getElementById('containerGraf1');
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


function getDataMunicipios(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/marcas/getMunicipiosMarca?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};

function getDataMunicipiosClientes(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/marcas/getClientesMarca?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};

function getTblMunicipios(data){

       
    let container = document.getElementById('containerTblMunicipios');
    container.innerHTML = getLoader();
    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;

    let head = `<h5>VENTAS POR MUNICIPIO</h5>
    <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tab2')">Expandir</button>
                <table class="table table-responsive" style="font-size:80%;" id="tblVFMunicipios">
                    <thead class="bg-secondary text-white">
                        <tr>
                            <td>MUNICIPIO</td>
                            <td>COSTO</td>
                            <td>VENTA</td>
                            <td>UTILIDAD</td>
                            <td>MARG</td>
                            <td>PART</td>
                            <td>ALCANCE</td>
                        </tr>
                    </thead>
                    <tbody>`;

 

    let dat = '';

    data.map((r)=>{
        totalventa += Number(r.TOTALPRECIO);
        totalcosto += Number(r.TOTALCOSTO);
        totalutilidad += Number(r.UTILIDAD);
    })

    data.map((r)=>{
        dat += `
            <tr class="hand border-bottom border-secondary" onclick="getDataProductosMunicipio('${r.DEPARTAMENTO}','${r.MUNICIPIO}')">
                <td><i class="fal fa-hand-point-up"></i>${r.MUNICIPIO}
                    <br>               
                    <small class="negrita">${r.DEPARTAMENTO}</small>
                </td>
                <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.UTILIDAD,'')}</td>
                <td>${funciones.getMargenUtilidad(Number(r.TOTALPRECIO),Number(r.TOTALCOSTO))}</td>
                <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
                <td class="text-danger">${funciones.getParticipacion(Number(r.CONTEO), Number(r.TOTALMUNICIPIO))}
                    <br>
                    <small>${r.CONTEO}/${Number(r.TOTALMUNICIPIO)}</small>               
                </td>
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

    return;

    let tim6= setTimeout(() => {
        $('#tblVFMunicipios').DataTable({
            paging: false,
            bFilter:false
        });
        clearTimeout(tim6);
    },3000)

};

function getPieChartClientesEmpresas(data){
   
    let container = document.getElementById('containerGraf2');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart2" width="50" height="50"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0; let totaluniversos = 0;
    data.map((r)=>{
        total = total + Number(r.CONTEO);
        totaluniversos += Number(r.UNIVERSO);
    });
   
    data.map((r)=>{
            label.push(r.CODSUCURSAL);
            valor.push(((Number(r.CONTEO)/Number(r.UNIVERSO))*100).toFixed(2));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                data:valor,
                borderColor: 'white',
                backgroundColor:bgColor
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Universo Logrado Clientes. Porcentaje total: ' + funciones.getParticipacion(total,totaluniversos)
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
                    return value + '%';
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

function getPieChartClientesEmpresasConteo(data){
   
    let container = document.getElementById('containerGraf6');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart6" width="50" height="50"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0; let totaluniversos = 0;
    data.map((r)=>{
        total = total + Number(r.CONTEO);
        totaluniversos += Number(r.UNIVERSO);
    });
   
    data.map((r)=>{
            label.push(r.CODSUCURSAL);
            valor.push(Number(r.CONTEO));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart6').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: label,

            datasets: [{
                label:'Clientes Efectivos',
                data:valor,
                borderColor: 'white',
                backgroundColor:bgColor
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Clientes Efectivos. Total: ' + total.toString() + '/' + totaluniversos.toString()
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
                    return value;
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


function getDataVentasMarca(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/marcas/getVentasMesMarca?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};
function getPieChartVentasEmpresa(data){
   
    let container = document.getElementById('containerGraf7');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart7" width="50" height="50"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0; let totaluniversos = 0;
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
        totaluniversos += Number(r.UNIVERSO);
    });
   
    data.map((r)=>{
            label.push(r.CODSUCURSAL);
            valor.push(Number(r.TOTALPRECIO));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart7').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                data:valor,
                borderColor: 'white',
                backgroundColor:bgColor
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Ventas por Sucursal. Total: ' + funciones.setMoneda(total,'Q')
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
function getPieChartOportunidadEmpresa(data){
   
    let container = document.getElementById('containerGraf8');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart8" width="50" height="50"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0; let totaluniversos = 0;
    data.map((r)=>{
        total = total + ((Number(r.TOTALPRECIO)/Number(r.CONTEO))* Number(r.UNIVERSO))-Number(r.CONTEO);
        totaluniversos += Number(r.UNIVERSO);
    });
   
    data.map((r)=>{
            label.push(r.CODSUCURSAL);
            valor.push(((Number(r.TOTALPRECIO)/Number(r.CONTEO))* Number(r.UNIVERSO))-Number(r.CONTEO));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart8').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                data:valor,
                borderColor: 'white',
                backgroundColor:bgColor
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Oportunidad Perdida. Total: ' + funciones.setMoneda(total,'Q')
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



function getDataProductosMunicipio(departamento,municipio){

   
    let container = document.getElementById('containertblMunicipiosProductos2');
    container.innerHTML = getLoader();

    
    location.hash = "#containertblMunicipiosProductos2"; 

    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;
    let totalcajas = 0;

    axios.get(`/marcas/getProductosMarcaMunicipio?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}&municipio=${municipio}&departamento=${departamento}`)
    .then(res => {
        const data = res.data.recordset;
       
        let head = `<h5>PRODUCTOS VENDIDOS</h5>
                <h5 class="text-danger">${municipio},${departamento}</h5>
                <table class="table table-responsive" style="font-size:70%;" id="tblVProductosM">
                    <thead class="bg-info text-white">
                        <tr>
                            <td>PRODUCTO</td>
                            <td>FARDOS</td>
                            <td>VENTA</td>
                            <td>PART</td>
                        </tr>
                    </thead>
                    <tbody>`;

        let dat = '';

        data.map((r)=>{
            totalcajas += Number(r.FARDOS);
            totalventa += Number(r.TOTALPRECIO);
            totalcosto += Number(r.TOTALCOSTO);
            totalutilidad += Number(r.UTILIDAD);
        })

        data.map((r)=>{
            dat += `
                <tr class="hand border-bottom border-secondary">
                    <td>${r.PRODUCTO}
                        <br>
                        <small class="negrita text-danger">${r.CODPRODUCTO}</small>
                    </td>
                    <td>${Number(r.FARDOS).toFixed(2)}</td>
                    <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                    <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
                </tr>
            `
        })

        let foot = `</tbody>
                        <tfoot class="negrita bg-foot-table text-danger">
                            <tr>
                                <td></td>
                                <td>${totalcajas.toFixed(2)}</td>
                                <td>${funciones.setMoneda(totalventa,'Q')}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    `

        container.innerHTML = head + dat + foot 

        $('#tblVProductosM').DataTable({
            paging: false,
            bFilter:false
        });

    })
    .catch(()=>{
        container.innerHTML = `No se pudieron cargar los datos...`
    })



};



function getDataVendedores(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/marcas/getVendedoresMarca?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};

function getTblVendedores(data){

       
    let container = document.getElementById('containertblVendedores');
    container.innerHTML = getLoader();

    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;
    let totalfardos = 0;

    let head = `<h5>VENTAS POR VENDEDOR</h5>
                <div class="col-3">
                    <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('containertblVendedores')">Expandir</button>            
                </div>
    
                <table class="table table-responsive" style="font-size:80%;" id="tblVVendedores">
                    <thead class="bg-secondary text-white">
                        <tr>
                            <td>VENDEDOR</td>
                            <td>FARDOS</td>
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
        totalfardos += Number(r.FARDOS);
        totalventa += Number(r.TOTALPRECIO);
        totalcosto += Number(r.TOTALCOSTO);
        totalutilidad += Number(r.UTILIDAD);
    })

    data.map((r)=>{
        dat += `
            <tr class="hand border-bottom border-secondary" onclick="getDataProductosVendedor('${r.CODRUTA}','${r.VENDEDOR}')">
                <td><i class="fal fa-hand-point-up"></i>${r.VENDEDOR}</td>
                <td>${r.FARDOS.toFixed(2)}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.UTILIDAD,'')}</td>
                <td>${funciones.getMargenUtilidad(Number(r.TOTALPRECIO),Number(r.TOTALCOSTO))}</td>
                <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="negrita bg-gris text-danger">
                        <tr>
                            <td></td>
                            <td>${totalfardos.toFixed(2)}</td>
                            <td>${funciones.setMoneda(totalcosto,'Q')}</td>
                            <td>${funciones.setMoneda(totalventa,'Q')}</td>
                            <td>${funciones.setMoneda(totalutilidad,'Q')}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                `

    container.innerHTML = head + dat + foot 


    return;
    let tim5 = setTimeout(() => {
        $('#tblVVendedores').DataTable({
            paging: false,
            bFilter:false,
            order: [[4, 'desc']]
        });
        clearTimeout(tim5);
    },3000)

};

function getDataProductosVendedor(codruta,nomven){

    let container = document.getElementById('containertblVendedoresProductos');
    container.innerHTML = getLoader();

    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;
    let totalcajas = 0;

    axios.get(`/marcas/getProductosMarcaVendedor?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}&codruta=${codruta}`)
    .then(res => {
        const data = res.data.recordset;
       
        let head = `<h5>PRODUCTOS VENDIDOS</h5>
                <h5 class="text-danger">${nomven}</h5>
                <table class="table table-responsive" style="font-size:80%;" id="tblVProductosV">
                    <thead class="bg-info text-white">
                        <tr>
                            <td>PRODUCTO</td>
                            <td>FARDOS</td>
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
            totalcajas += Number(r.FARDOS);
            totalventa += Number(r.TOTALPRECIO);
            totalcosto += Number(r.TOTALCOSTO);
            totalutilidad += Number(r.UTILIDAD);
        })

        data.map((r)=>{
            dat += `
                <tr class="hand border-bottom border-secondary">
                    <td>${r.PRODUCTO}
                        <br>
                        <small class="negrita text-danger">${r.CODPRODUCTO}</small>
                    </td>
                    <td>${Number(r.FARDOS).toFixed(2)}</td>
                    <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                    <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                    <td class="currSign">${funciones.setMoneda(r.UTILIDAD,'')}</td>
                    <td>${funciones.getMargenUtilidad(Number(r.TOTALPRECIO),Number(r.TOTALCOSTO))}</td>
                    <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
                </tr>
            `
        })

        let foot = `</tbody>
                        <tfoot class="negrita bg-foot-table text-danger">
                            <tr>
                                <td></td>
                                <td>${totalcajas.toFixed(2)}</td>
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


        let tim2 = setTimeout(() => {
           
            $('#tblVProductosV').DataTable({
                paging: false,
                bFilter:true
            });
            clearTimeout(tim2);
        }, 3000);
    
    })
    .catch(()=>{
        container.innerHTML = `No se pudieron cargar los datos...`
    })



};



function getDataProductos(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/marcas/getProductosMarca?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};

function getTblProductos(data){

         
    let container = document.getElementById('containertblProductos');
    container.innerHTML = ''; //getLoader();
    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;
    let totalcajas = 0;

    let head = `<h5>VENTAS POR PRODUCTOS</h5>
                <div class="col-3">
                    <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tab1')">Expandir</button>
                </div>
                   
                <table class="table table-responsive" style="font-size:90%;" id="tblMarcaProductos">
                    <thead class="bg-info text-white">
                        <tr>
                            <td>PRODUCTO</td>
                            <td>FARDOS</td>
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
        totalcajas += Number(r.FARDOS);
        totalventa += Number(r.TOTALPRECIO);
        totalcosto += Number(r.TOTALCOSTO);
        totalutilidad += Number(r.UTILIDAD);
    })

    data.map((r)=>{
        dat += `
            <tr class="hand border-bottom border-secondary" onclick="getTblMunicipiosProducto('${r.CODPRODUCTO}','${r.PRODUCTO}')">
                <td><i class="fal fa-hand-point-up"></i>${r.PRODUCTO}
                    <br>
                    <small class="negrita text-danger">${r.CODPRODUCTO}</small>
                </td>
                <td>${Number(r.FARDOS).toFixed(2)}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.UTILIDAD,'')}</td>
                <td>${funciones.getMargenUtilidad(Number(r.TOTALPRECIO),Number(r.TOTALCOSTO))}</td>
                <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="negrita bg-foot-table text-danger">
                        <tr>
                            <td></td>
                            <td>${totalcajas.toFixed(2)}</td>
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

    
    return;
    let tim = setTimeout(() => {
        $('#tblMarcaProductos').DataTable({paging: false, bFilter:true, order: [[4, 'desc']] });
        clearTimeout(tim);
    }, 5000);


  

};


function getTblMunicipiosProducto(codprod,desprod){

    location.hash = "#containertblMunicipiosProductos"; 
       
    let container = document.getElementById('containertblMunicipiosProductos');
    container.innerHTML = getLoader();
    let totalventa = 0;
    let totalcosto = 0;
    let totalutilidad = 0;
    let totalfardos = 0;

    axios.get(`/marcas/getMunicipiosMarcaProd?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}&codprod=${codprod}`)
    .then(res => {
        const data = res.data.recordset;
       
        let head = `<h5>VENTAS POR MUNICIPIO</h5>
        <h5 class="text-danger">${desprod} (${codprod})</h5>
        <table class="table table-responsive" style="font-size:80%;" id="tblVFMunicipiosP">
            <thead class="bg-success text-white">
                <tr>
                    <td>MUNICIPIO</td>
                    <td>CAJAS</td>
                    <td>COSTO</td>
                    <td>VENTA</td>
                    <td>UTILIDAD</td>
                    <td>MARG</td>
                    <td>PART</td>
                    <td>ALCANCE</td>
                </tr>
            </thead>
            <tbody>`;

        let dat = '';

        data.map((r)=>{
            totalfardos += Number(r.FARDOS);
            totalventa += Number(r.TOTALPRECIO);
            totalcosto += Number(r.TOTALCOSTO);
            totalutilidad += Number(r.UTILIDAD);
        })

        data.map((r)=>{
            dat += `
            <tr class="hand border-bottom border-secondary">
                <td>${r.MUNICIPIO}
                    <br>               
                    <small class="negrita">${r.DEPARTAMENTO}</small>
                </td>
                <td>${Number(r.FARDOS).toFixed(2)}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.UTILIDAD,'')}</td>
                <td>${funciones.getMargenUtilidad(Number(r.TOTALPRECIO),Number(r.TOTALCOSTO))}</td>
                <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
                <td class="text-danger">${funciones.getParticipacion(Number(r.CONTEO), Number(r.TOTALMUNICIPIO))}
                    <br>
                    <small>${r.CONTEO}/${Number(r.TOTALMUNICIPIO)}</small>               
                </td>
            </tr>
        `
        })

        let foot = `</tbody>
                    <tfoot class="negrita bg-gris text-danger">
                        <tr>
                            <td></td>
                            <td>${Number(totalfardos).toFixed(2)}</td>
                            <td>${funciones.setMoneda(totalcosto,'Q')}</td>
                            <td>${funciones.setMoneda(totalventa,'Q')}</td>
                            <td>${funciones.setMoneda(totalutilidad,'Q')}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                `
        container.innerHTML = head + dat + foot 

        $('#tblVFMunicipiosP').DataTable({
        paging: false,
        bFilter:false
        });

    })
    .catch(()=>{
        container.innerHTML = 'No se pudieron cargar los datos...';
    })


    
};






//grafica de mes y años

function getDataMesGeneral(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/marcas/getMesesMarcaGen?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}&codmarca=${GlobalSelectedCodMarca}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};

function getBarCharMesesGeneral(data){
   
    let container = document.getElementById('containerGrafMesGen');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart15" width="100" height="35"></canvas>';
   
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
    });
   
    data.map((r)=>{
            label.push(r.NOMMES);
            valor.push(Number(r.TOTALPRECIO).toFixed(2));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart15').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                data:valor,
                borderColor: 'white',
                backgroundColor:bgColor
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Ventas por Mes Generales: ' + funciones.setMoneda(total,'Q')
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
                    return funciones.setMoneda2(Number(value));
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