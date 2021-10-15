function getView(){
    let view = {
        header: ()=>{
            return `
            <div class="row shadow p-2 border-top-rounded border-bottom-rounded">
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <h3 class="text-danger">ANÁLISIS ${GlobalSelectedDesMarca}</h3>
                </div>
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <button class="btn hidden btn-outline-secondary" id="btnTabHome">
                        Inicio
                    </button>
                    <button class="hidden btn btn-outline-info" id="btnTab2">
                        Tab 2
                    </button>
                </div>
            </div>
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
                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="pills-profile-tab">
                        hola mundo
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="pills-contact-tab">
                    </div>
                </div>
            </div>
            `
        },
        home:()=>{
            return `
            <div class="row">
                <div class="card shadow border-top-rounded border-bottom-rounded col-12" id="containerGraf1"  onclick="expandir('containerGraf1')">
                </div>
            </div>

            <div class="row">
                <div class="card shadow col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive"  id="containerTblMunicipios">
                    </div>
                </div>
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="row">
                        <div class="col-6">
                            <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf2"  onclick="expandir('containerGraf2')">
                            </div>    
                        </div>
                        <div class="col-6">
                        
                        </div>
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
        document.getElementById('tab2').classList.remove('show','active');
    })
    document.getElementById('btnTab2').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab2').classList.add('show','active');
    })
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
        await getLineChartFechas(datos);    
    });

    getDataMunicipios()
    .then(async(datos)=>{
        //getPieChartMunicipios(datos);
        await getTblMunicipios(datos);
    })

    getDataMunicipiosClientes()
    .then((datos)=>{
        getPieChartClientesEmpresas(datos);
    })

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
                <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                <td>${funciones.setMoneda(r.UTILIDAD,'Q')}</td>
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
            label.push(funciones.cleanFecha(r.FECHA));
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
                <table class="table table-responsive" style="font-size:80%;" id="tblVFMunicipios">
                    <thead class="bg-secondary text-white">
                        <tr>
                            <td>MUNICIPIO</td>
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
                <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                <td>${funciones.setMoneda(r.UTILIDAD,'Q')}</td>
                <td>${funciones.getMargenUtilidad(Number(r.TOTALPRECIO),Number(r.TOTALCOSTO))}</td>
                <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
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

    var table = $('#tblVFMunicipios').DataTable({
        paging: false,
        bFilter:false
    });

    new $.fn.dataTable.Responsive(table);
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
                    text: 'Clientes Alcanzados por Empresa. Porcentaje total: ' + funciones.getParticipacion(total,totaluniversos)
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