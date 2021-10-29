function getView(){
    let view = {
        body:()=>{
            return `
            <div class="row">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#tabHome" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Resume</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#tab1" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Trademarks</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#tab2" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Employees</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#tab3" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Daily</button>
                    </li>
                </ul>
                <div class="tab-content col-12" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="tabHome" role="tabpanel" aria-labelledby="pills-home-tab">
                        ${view.resumen()}
                    </div>
                    <div class="tab-pane fade" id="tab1" role="tabpanel" aria-labelledby="pills-profile-tab">
                        ${view.marcas()}
                    </div>
                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="pills-profile-tab">
                        ${view.empleados()}
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="pills-contact-tab">
                        ${view.fechas()}
                    </div>
                </div>
            </div>
            `
        },
        resumen:()=>{
            return `
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

            <div class="row">
                ${GlobalIconoDobleClick}   
                <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf5" ondblclick="expandir('containerGraf5')"></div>
            </div>
            `
        },
        marcas:()=>{
            return `
            
               
                <div class="table-responsive card-shadow col-12" id="tblTabla2">
                
                </div>
            
            `
        },
        empleados:()=>{
            return `
            <div class="row">
                
                <div class="table-responsive card-shadow col-sm-12 col-lg-6 col-xl-6 col-md-6" id="tblTablaV">
                
                </div>
            
            </div>
            `
        },
        fechas:()=>{
            return `
            <div class="row">
                <div class="table-responsive card-shadow col-sm-12 col-lg-6 col-xl-6 col-md-6" id="tblTabla">
                
                </div>
           
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


    getParametros();
   
    viewInicioObtenerDatos();

};

async function viewInicioObtenerDatos(){
  

    await getDataResumen()
    .then((empresas)=>{
        getPieCharVentas(empresas);
        getPieCharDevoluciones(empresas);
        getBarCharUtilidades(empresas);
    })

    await getDataFechas()
    .then((datos)=>{
        getTblVentasFecha(datos)
    })
    .catch(()=>{
        
    })

    await getDataMarcas()
    .then((datos)=>{
        getTblVentasMarcas(datos)
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

    await getDataVendedores()
    .then((datos)=>{
        getTblVentasVendedores(datos);
    })

};


function initView(){
    getView();
    addListeners();
};


function getDataResumen(){

    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.get(`/empresas/getempresas?empresas=${parametrosEmpresas}&anio=${parametrosAnio}&mes=${parametrosMes}`)
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




function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


function getTblVentasFecha(data){
    
    let container = document.getElementById('tblTabla');
    container.innerHTML = getLoader();

    let totalcosto=0; let totalventa =0; let totalutilidad=0;

    let head = `<h5 class="text-info">VENTAS POR FECHA</h5>
            <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tblTabla')">Expandir</button>
            <table class="table table-responsive table-bordered table-striped"  style="font-size:90%;" id="tblFVentas">
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
                <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALUTILIDAD,'Q')}</td>
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

    let totalcosto = 0; let totalventa = 0; let totalutilidad = 0;
    let conteo = 0;

    let head = `<h5 class="text-danger">VENTAS POR VENDEDOR</h5>
            <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tblTablaV')">Expandir</button>
                <table class="table table-condensed table-bordered"  style="font-size:80%;" id="tblTablaVendedores">
                    <thead class="bg-danger text-white">
                        <tr>
                            <td>VENDEDOR</td>
                            <td>COSTO</td>
                            <td>VENTA</td>
                            <td>UTILIDAD</td>
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
            <tr class="hand border-bottom border-dark" ondblclick="gotoVendedor('${r.CODVEN}','${r.NOMVEN}')">
                <td>${GlobalIconoDobleClick} ${r.NOMVEN}
                    <br>
                    <small class="negrita">${r.CODSUCURSAL}</small>
                </td>
                <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                <td>${funciones.setMoneda(r.UTILIDAD,'Q')}</td>
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
                        </tr>
                    </tfoot>
                </table>
                `

    container.innerHTML = head + dat + foot
    $('#tblTablaVendedores').DataTable({
                    paging: true,
    });
};

function gotoVendedor(codven, nomven){
   
    //Navegar.analisis_fecha();
};



function getTblVentasMarcas(data){
    
    let container = document.getElementById('tblTabla2');
    container.innerHTML = getLoader();

    let totalcosto = 0; let totalventa = 0; let totalutilidad = 0;
    let conteo = 0;

    let head = `<h5>VENTAS POR MARCA</h5>
    <button class="btn btn-sm btn-outline-warning hand" onclick="expandir('tblTabla2')">Expandir</button>
                <table class="table table-responsive table-bordered"  style="font-size:85%;" id="tblVMarcas">
                    <thead class="bg-secondary text-white">
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
            <tr class="hand border-bottom border-dark" ondblclick="gotoMarca('${r.CODMARCA}','${r.DESMARCA}')">
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
    $('#tblVMarcas').DataTable({
                    paging: false,
                    bFilter:false
    });
};

function gotoMarca(codigo, descripcion){
    GlobalSelectedCodMarca = codigo;
    GlobalSelectedDesMarca = descripcion;
    Navegar.analisis_marca();
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