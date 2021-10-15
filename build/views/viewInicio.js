function getView(){
    let view = {
        encabezado:()=>{
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
            `
        },
        listado:()=>{
            return `
            <div class="row">
                <div class="table-responsive card-shadow col-sm-12 col-lg-6 col-xl-6 col-md-6" id="tblTabla">
                
                </div>
                <div class="table-responsive card-shadow col-sm-12 col-lg-6 col-xl-6 col-md-6" id="tblTabla2">
                
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

    root.innerHTML = view.encabezado() + view.listado() + view.modalExpandir();
}; 

function addListeners(){


    getParametros();
   
    viewInicioObtenerDatos();

};

function viewInicioObtenerDatos(){
  

    getDataResumen()
    .then((empresas)=>{
        getPieCharVentas(empresas);
        getPieCharDevoluciones(empresas);
        getBarCharUtilidades(empresas);
    })

    getDataFechas()
    .then((datos)=>{
        getTblVentasFecha(datos)
    })
    .catch(()=>{
        
    })

    getDataMarcas()
    .then((datos)=>{
        getTblVentasMarcas(datos)
    })
    .catch(()=>{
        
    })

    getDataClientes()
    .then((datos)=>{
        getBarCharClientesAlcanzados(datos)
    })
    .catch(()=>{
        
    });


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

    let head = `<h3>VENTAS POR FECHA</h3>
            <table class="table table-responsive"  style="font-size:80%;" id="tblFVentas">
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
            <tr class="hand" ondblclick="gotoFecha('${funciones.cleanFecha(r.FECHA)}')">
                <td>${GlobalIconoDobleClick} ${funciones.cleanFecha(r.FECHA)}</td>
                <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALUTILIDAD,'Q')}</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="negrita text-danger bg-gris">
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



function getTblVentasMarcas(data){
    
    let container = document.getElementById('tblTabla2');
    container.innerHTML = getLoader();

    let totalcosto = 0; let totalventa = 0; let totalutilidad = 0;
    let conteo = 0;

    let head = `<h3>VENTAS POR MARCA</h3>
                <table class="table display responsive nowrap"  style="font-size:80%;" id="tblVMarcas">
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
            <tr class="hand border-bottom border.secondary" ondblclick="gotoMarca('${r.CODMARCA}','${r.DESMARCA}')">
                <td>${GlobalIconoDobleClick} ${r.DESMARCA}</td>
                <td>Q ${Number(r.TOTALCOSTO.toFixed(2))}</td>
                <td>Q ${Number(r.TOTALPRECIO.toFixed(2))}</td>
                <td>Q ${Number(r.UTILIDAD.toFixed(2))}</td>
                <td>${funciones.setMargen(((Number(r.UTILIDAD)/Number(r.TOTALPRECIO))*100).toFixed(2),'%')}</td>
                <td>${
                    ((Number(r.TOTALPRECIO)/totalventa)*100).toFixed(2)
                    }%</td>
            </tr>
        `
    })

    let foot = `</tbody>
                    <tfoot class="negrita text-danger bg-gris">
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
    });
};

function gotoMarca(codigo, descripcion){
    GlobalSelectedCodMarca = codigo;
    GlobalSelectedDesMarca = descripcion;
    Navegar.analisis_marca();
};

