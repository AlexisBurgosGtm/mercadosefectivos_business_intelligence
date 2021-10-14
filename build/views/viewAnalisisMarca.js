function getView(){
    let view = {
        header: ()=>{
            return `
            <div class="row">
                <div class="card shadow p-4 border-top-rounded border-bottom-rounded">
                    <h3 class="text-danger">Análisis ${GlobalSelectedDesMarca}</h3>
                </div>
            </div>
            `
        },
        body:()=>{
            return `
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                    <div class="card shadow table-responsive" id="containerFechas">
                    
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf1"  onclick="expandir('containerGraf1')"></div>
                </div>

                <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    
                    <div class="row">
                      
        
                        <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">
                            <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf2"  onclick="expandir('containerGraf2')"></div>
                        </div>
        
                        <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">
                            
                            <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf3"  onclick="expandir('containerGraf3')"></div>
                        </div>
        
                        <div class="col-sm-6 col-lg-3 col-xl-3 col-md-6">
                            
                            <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf4" onclick="expandir('containerGraf4')"></div>
                        </div>
                    </div>
                

                </div>    
            </div>
            `
        }
        
    }

    root.innerHTML = view.header() + view.body();
};

function addListeners(){

};

function initView(){
    getView();
    addListeners();
    getDataMarca();
};

function getDataMarca(){

    getDataFechas()
    .then((datos)=>{
        getTblFechas(datos)
    });

    getDataMunicipios()
    .then((datos)=>{
        getPieChartMunicipios(datos);
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

function getPieChartMunicipios(data){
   
    let container = document.getElementById('containerGraf1');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart" width="100" height="auto"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.VENTAS);
    });
   
    data.map((r)=>{
            label.push(r.MUNICIPIO);
            valor.push(Number(r.TOTALPRECIO.toFixed(2)));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChart').getContext('2d');
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
                    text: 'Ventas por Municipio. Total: ' + funciones.setMoneda(total,'Q')
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