function getView(){
    let view = {
        body:()=>{
            return `
            <div class="panel-content">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link btn-md active" data-toggle="tab" href="#tabHome" role="tab">
                            <i class="fal fa-home mr-1"></i>Quick View
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-md" data-toggle="tab" href="#tab3" role="tab">
                            <i class="fal fa-calendar-alt mr-1"></i>Daily
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-md" data-toggle="tab" href="#tab4" role="tab">
                            <i class="fal fa-chart-bar mr-1"></i>Monthly
                        </a>
                    </li>
                   
                </ul>
                <div class="tab-content border border-top-0 border-bottom-0 border-right-0 border-left-0 p-3">
                    <div class="tab-pane fade show active"  id="tabHome"  role="tabpanel">
                        ${view.resumen()}
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel">            
                        ${view.fechas()}
                    </div>
                    <div class="tab-pane fade" id="tab4" role="tabpanel">            
                        ${view.meses()}
                    </div>
                </div>
            </div>
            `
        },
        resumen:()=>{
            return `
            <div class="row" id="containerCardsResumen">
            
            </div>

            <div class="row">
                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf1"  ondblclick="expandir('containerGraf1')"></div>
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf2"  ondblclick="expandir('containerGraf2')"></div>
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf3"  ondblclick="expandir('containerGraf3')"></div>
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">                       
                    ${GlobalIconoDobleClick}   
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf4" ondblclick="expandir('containerGraf4')"></div>
                </div>
            </div>

            
            `
        },
        fechas:()=>{
            return `
                <div class="table-responsive card-shadow col-12" id="tblTabla">
                
                </div>
            `
        },
        meses:()=>{
            return `                 
                <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf5" ondblclick="expandir('containerGraf5')">
                </div>

                <hr class="solid">

                <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGrafMesSuc" ondblclick="expandir('containerGrafMesSuc')">
                </div>
            `
        },
        modalExpandir:()=>{
            return `
            <div class="modal fade" id="modalExpandir" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        
                        </div>
                        <div class="modal-body" id="containerExpandir">
                        
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary form-control" data-dismiss="modal" onclick="$('#modalExpandir').modal('hide')">Cerrar</button>
            
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.body() + view.modalExpandir();

}; 

function addListeners(){


    //getParametros();
   
    viewInicioObtenerDatos();

  

    funciones.slideAnimationTabs();
};

async function viewInicioObtenerDatos(){
  

    await getDataResumen()
    .then((empresas)=>{
        getPieCharVentas(empresas);
        getPieCharDevoluciones(empresas);
        getBarCharUtilidades(empresas);
        getCarsEmpresas(empresas);
    })

    await getDataFechas()
    .then((datos)=>{
        getTblVentasFecha(datos)
    })
    .catch(()=>{
        
    })


    await getDataClientes()
    .then((datos)=>{
        getBarCharClientesAlcanzados(datos)
    })
    .catch(()=>{
        
    });

    await getDataMeses()
    .then((datos)=>{
        getLineChartMeses(datos);
    })

    await getDataMesesGeneral()
    .then((datos)=>{
        getBarCharMesesGeneral(datos);
    })
 


};


function initView(){
    getView();
    addListeners();
};


function getDataResumen(){

    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        //axios.get(`/empresas/getempresas?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}`)
        axios.post(`/empresas/getempresas`,{
                empresas:parametrosEmpresas,
                anio:parametrosAnio,
                mes:parametrosMes})
        .then(res => {
            const empresas = res.data.recordset;
           
            resolve(empresas);
        })
        .catch(()=>{
            reject();
        })


    })
     

};

function getDataFechas(){

    return new Promise((resolve, reject)=>{
      
        axios.get(`/empresas/getVentasFechaEmpresas?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })
     

};

function getDataMarcas(){

    return new Promise((resolve, reject)=>{
      
        axios.get(`/empresas/getVentasMarcas?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })
     

};

function getDataClientes(){

    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/empresas/getClientesVisitados?anio=${parametrosAnio}&mes=${parametrosMes}`)
        .then(res => {
            const empresas = res.data.recordset;    
            resolve(empresas);
        })
        .catch(()=>{
            reject();
        })


    })
     
};


function getPieCharVentas(data){
   
    let container = document.getElementById('containerGraf1');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart" width="40" height="40"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.VENTAS);
    });
   
    data.map((r)=>{
            label.push(r.EMPNIT);
            valor.push(Number(((Number(r.VENTAS)/total))*100).toFixed(2));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart').getContext('2d');
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
                    text: 'VENTAS por Sede. Total: ' + funciones.setMoneda(total,'Q')
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

function getPieCharDevoluciones(data){

    let container = document.getElementById('containerGraf2');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart2" width="40" height="40"></canvas>';
  

    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.DEVOLUCIONES);
    });
   
    data.map((r)=>{
            label.push(r.EMPNIT);
            valor.push( Number(((Number(r.DEVOLUCIONES)/total))*100).toFixed(2));
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
                    text: 'DEVOLUCIONES por Sede. Total: ' + funciones.setMoneda(total,'Q')
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

function getBarCharUtilidades(data){
   
    let container = document.getElementById('containerGraf3');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart3" width="40" height="40"></canvas>';
  
    
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.UTILIDAD);
    });
   
    data.map((r)=>{
            label.push(r.EMPNIT);
            valor.push( Number(r.UTILIDAD).toFixed(2));
            bgColor.push(getRandomColor())
    })


    var ctx = document.getElementById('myChart3').getContext('2d');
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
                    text: 'Utilidad por Sede: ' + funciones.setMoneda(total,'Q')
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
                    return 'Q' + value;
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

function getCarsEmpresas(data){
    let f = new Date();

    let dia = f.getDate();
    //let dia = f.getDate();
    console.log(f.getDate())

    let porcentajeDiaActual = (dia / 30);

    let container = document.getElementById('containerCardsResumen');
    let view = '';

    let totalventa =0; let totaldevoluciones = 0; let totalobjetivo = 0; let totalproyeccionmes = 0;
    data.map((r)=>{
        let strClassCard = '';
        totalventa += Number(r.VENTAS);
        totaldevoluciones += Number(r.DEVOLUCIONES);
        totalobjetivo += Number(r.OBJETIVO);
        let dev = Number(r.DEVOLUCIONES);
        let vent = Number(r.VENTAS);
        let porcdev = ((dev * -1) / vent) * 100;
        let logrado = (Number(r.VENTAS)+Number(r.DEVOLUCIONES))/Number(r.OBJETIVO);
        let objetivologrado = funciones.getParticipacion((Number(r.VENTAS)+Number(r.DEVOLUCIONES)),Number(r.OBJETIVO));
        let logroactual = (logrado / porcentajeDiaActual) * 100;
        let proyeccionmes = ((vent + dev) / dia) * 30
        totalproyeccionmes += proyeccionmes;
        let porcProyeccionMes = ((proyeccionmes / Number(r.OBJETIVO)) * 100).toFixed(2)
        if(logroactual>94.99999){strClassCard='bgverde'};
        if(logroactual>90 && logroactual<95){strClassCard='bgamarillo'};
        if(logroactual<90){strClassCard='bgrojo'};
        view += `
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6">
            <div class="card shadow card-rounded p-4 hand ${strClassCard}" style="font-size:80%" ondblclick="gotoEmpresa('${r.EMPNIT}','${r.VENTAS}','${r.DEVOLUCIONES}','${r.UNIVERSO}')">
                <div class="row">
                    <div class="col-7">
                        <span class="text-primary negrita">${r.EMPNIT}</span>
                    </div>

                    <div class="col-5 text-danger" style="font-size:11px;" >
                        <b>${objetivologrado}</b>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive">
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>Total Ventas:</label></td><td><label class="negrita text-info">${funciones.setMoneda(r.VENTAS,'Q')}</label></td>
                                </tr>
                                <tr>
                                    <td> <label>Total Devoluciones:</label></td><td><label class="negrita text-danger">${funciones.setMoneda(r.DEVOLUCIONES,'Q')} (${porcdev.toFixed(2)} %)</label></td>
                                </tr>
                                <tr>
                                    <td><label>Total Bruto:</label></td><td><label class="negrita text-secondary">${funciones.setMoneda((Number(r.VENTAS)+Number(r.DEVOLUCIONES)),'Q')}</label></td>
                                </tr>
                                <tr>
                                    <td><label>Objetivo:</label></td><td><label class="negrita text-info">${funciones.setMoneda(Number(r.OBJETIVO),'Q')}</label></td>
                                </tr>
                                <tr>
                                    <td><label>Logrado:</label></td>
                                    <td><label class="negrita text-danger">${objetivologrado}</label></td>
                                </tr>
                                <tr>
                                    <td><label>Proyección (30ds):</label></td>
                                    <td><label class="negrita text-danger">${funciones.setMoneda(proyeccionmes,'Q')} (${porcProyeccionMes}%)</label></td>
                                </tr>
                                <tr>
                                    <td> <label>Total Compras:</label></td><td><label class="negrita">${funciones.setMoneda(Number(r.COMPRAS),'Q')}</label></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>                   
            
                </div>
                <div class="row">
                    <small>Updated: ${funciones.convertDateNormal(r.LASTUPDATE)}</small> ${GlobalIconoDobleClick}
                </div>
            </div>
        </div>
        `
    });

    totaldevoluciones = totaldevoluciones * -1;
    let totalscard = `
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-6">
            <div class="card shadow border-top-rounded border-bottom-rounded p-4 bg-primary  text-white" style="font-size:80%">
                <div class="row">
                    <div class="col-9">

                        <label>Ventas:</label>
                        <label class="negrita">${funciones.setMoneda(totalventa,'Q')}</label>
                        <br>
                        <label>Devoluciones:</label>
                        <label class="negrita">${funciones.setMoneda(totaldevoluciones,'Q')}</label>
                        <h5 class="negrita">${((totaldevoluciones / totalventa) * 100).toFixed(2)} %</h5>
                        <br>
                        <label>Total Bruto:</label>
                        <label class="negrita">${funciones.setMoneda((Number(totalventa)-Number(totaldevoluciones)),'Q')}</label>
                        <br>
                        <h5 class="negrita">Logro: ${funciones.getParticipacion((Number(totalventa)-Number(totaldevoluciones)),Number(totalobjetivo))}</h5>
                        <br>
                        <label>Proyección:</label>
                        <label class="negrita">${funciones.setMoneda(totalproyeccionmes,'Q')} (${((totalproyeccionmes / totalobjetivo)*100).toFixed(2)}%)</label>
                    </div>
                    <div class="col-3" style="font-size:50px">
                        <i class="fal fa-dollar-sign"></i>
                    </div>
                </div>
                
            </div>
        </div>
    `
    container.innerHTML = totalscard + view;

   
};

function gotoEmpresa(codsucursal,ventas,devoluciones,universo){

    GlobalSelectedCodSucursal = codsucursal;
    Navegar.analisis_empresa(ventas,devoluciones,universo);

};



function getBarCharClientesAlcanzados(data){
   
    let container = document.getElementById('containerGraf4');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart4" width="40" height="40"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.VISITADOS);
    });
   
    data.map((r)=>{
            label.push(r.CODSUCURSAL);
            valor.push(Number(((Number(r.VISITADOS)/Number(r.UNIVERSO)))*100).toFixed(2));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart4').getContext('2d');
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
                    text: 'Efectividad de Clientes. Total: ' + total.toString()
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


function getLineChartFechas(data){
   
    document.getElementById('myChart4').innerHTML = '';
    

    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.UTILIDAD);
    });
   
    data.map((r)=>{
            label.push(r.EMPNIT);
            valor.push( Number(r.UTILIDAD).toFixed(2));
            bgColor.push(getRandomColor())
    })


    var ctx = document.getElementById('myChart4').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'line',
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
                    text: 'Ventas por Fecha por Sede: ' + funciones.setMoneda(total,'Q')
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
                    return 'Q' + value;
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



function getTblVentasFecha(data){
    
    let container = document.getElementById('tblTabla');
    container.innerHTML = getLoader();

    let totalcosto=0; let totalventa =0; let totalutilidad=0;

    let head = `<h5 class="text-info">VENTAS POR FECHA</h5>
            <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tblTabla')">Expandir</button>
            <table class="table table-responsive table-bordered table-striped  col-12"  style="font-size:90%;" id="tblFVentas">
                    <thead class="bg-info text-white">
                        <tr>
                            <td>FECHA</td>
                            <td>COSTO</td>
                            <td>VENTA</td>
                            <td>UTILIDAD</td>
                        </tr>
                    </thead>
                    <tbody>`;


    let dat = '';

    data.map((r)=>{
        totalcosto += Number(r.TOTALCOSTO);
        totalventa += Number(r.TOTALPRECIO);
        totalutilidad += Number(r.TOTALUTILIDAD);
        dat += `
            <tr class="hand border-bottom border-info" ondblclick="gotoFecha('${funciones.cleanFecha(r.FECHA)}')">
                <td>${GlobalIconoDobleClick} ${funciones.convertDateNormal(r.FECHA)}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALCOSTO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                <td class="currSign">${funciones.setMoneda(r.TOTALUTILIDAD,'')}</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="negrita text-danger bg-foot-table">
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
    var table = $('#tblFVentas').DataTable({
        paging: true, 
        bFilter:false
    });

    new $.fn.dataTable.Responsive(table, {
        details: true
    } );
  
};

function gotoFecha(fecha){
    GlobalSelectedFecha = fecha;
    Navegar.analisis_fecha();
};





function getDataMeses(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/empresas/getHistorialVenta?empresas=${parametrosEmpresas}&anio=${parametrosAnio}`)
        .then(res => {
            const datos = res.data.recordset;
           
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })

};


function dsEmpresaData(obj){
   console.log(obj);
    let venta = [];
    GlobalSelectedAnioMes.forEach(function(mes, index) {
        obj.map((r)=>{
            venta.push(Number(r.TOTALPRECIO.toFixed(2)));
        })
    })
};

function getLineChartMeses(data){
   
    let container = document.getElementById('containerGraf5');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart5" width="100" height="35"></canvas>';
  
    //--------------------------------------------------------------
    //--------------------------------------------------------------


    let label = [];
    let total = 0; 

    let ds = [];
    let datas = [];


    GlobalSelectedEmpresas.forEach(function(empr, index) {
        var V = []; 
        data.map((r2)=>{
            if(r2.CODSUCURSAL==empr){
               
                V.push(Number(r2.TOTALPRECIO.toFixed(2)));
            } 
        });
        let color = getRandomColor();
        ds = {label: empr, borderColor:color, backgroundColor:color,data:V}
        datas.push(ds);    
    });
   

    //--------------------------------------------------------------
    //--------------------------------------------------------------
    
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
        label.push(r.NOMMES);
    });
   
   
  
    var ctx = document.getElementById('myChart5').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: GlobalSelectedAnioMes,
            datasets: datas
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Ventas por Mes. Total: ' + funciones.setMoneda(total,'Q'),
              font: {size: 30}
            }
          }
        }
    });



};



function getLineChartMeses2(data){
   
    let container = document.getElementById('containerGraf5');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart5" width="100" height="35"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
    });
   
    data.map((r)=>{
            label.push(funciones.cleanFecha(r.NOMMES));
            valor.push(Number(r.TOTALPRECIO.toFixed(2)));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart5').getContext('2d');
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
              text: 'Ventas por Mes. Total: ' + funciones.setMoneda(total,'Q')
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




function getDataMesesGeneral(){
    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/empresas/getHistorialVentaGeneral?empresas=${parametrosEmpresas}&anio=${parametrosAnio}`)
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
   
    let container = document.getElementById('containerGrafMesSuc');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart20" width="100" height="35"></canvas>';
   
  
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

  
    var ctx = document.getElementById('myChart20').getContext('2d');
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
                    text: 'Ventas por Mes Generales: ' + funciones.setMoneda(total,'Q'),
                    font: {size: 30}
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
                    weight: 'bold',
                    size: 15
                  }
                }
            }
        }
    });
    

};




function BACKUP_getLineChartMeses(data){
   
    let container = document.getElementById('containerGraf5');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart5" width="100" height="35"></canvas>';
  
    //--------------------------------------------------------------
    //--------------------------------------------------------------


    let label = [];
    let total = 0; 

    let ds = [];
    let datas = [];


    GlobalSelectedEmpresas.forEach(function(empr, index) {
        var V = []; 
        data.map((r2)=>{
            if(r2.CODSUCURSAL==empr){
               
                V.push(Number(r2.TOTALPRECIO.toFixed(2)));
            } 
        });
        let color = getRandomColor();
        ds = {label: empr, borderColor:color, backgroundColor:color,data:V}
        datas.push(ds);    
    });
   

    //--------------------------------------------------------------
    //--------------------------------------------------------------
    
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
        label.push(r.NOMMES);
    });
   
   
  
    var ctx = document.getElementById('myChart5').getContext('2d');
    var myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: GlobalSelectedAnioMes,
            datasets: datas
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Ventas por Mes. Total: ' + funciones.setMoneda(total,'Q')
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