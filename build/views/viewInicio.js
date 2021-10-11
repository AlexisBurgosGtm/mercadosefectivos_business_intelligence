function getView(){
    let view = {
        encabezado:()=>{
            return `
            <div class="row">
                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-3">
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf1"></div>
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-3">
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf2"></div>
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-3">
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf3"></div>
                </div>

                <div class="col-sm-6 col-lg-3 col-xl-3 col-md-3">
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf4"></div>
                </div>
            </div>
            `
        },
        listado:()=>{
            return `
            <div class="row">
                <div class="table-responsive card-shadow" id="tblTabla">
                
                </div>
            </div>
            `
        }
    }

    root.innerHTML = view.encabezado() + view.listado();
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

    let head = `<table class="table table-responsive table-hover table-striped">
                    <thead>
                        <tr>
                            <td>FECHA</td>
                            <td>COSTO</td>
                            <td>VENTA</td>
                            <td>UTILIDAD</td>
                        </tr>
                    </thead>
                    <tbody>`;

    let foot = `</tbody></table>`

    let dat = '';

    data.map((r)=>{
        dat += `
            <tr>
                <td><i class="fas fa-hand-point-up"></i> ${funciones.cleanFecha(r.FECHA)}</td>
                <td>${funciones.setMoneda(r.TOTALCOSTO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALPRECIO,'Q')}</td>
                <td>${funciones.setMoneda(r.TOTALUTILIDAD,'Q')}</td>
            </tr>
        `
    })

    container.innerHTML = head + dat + foot


}