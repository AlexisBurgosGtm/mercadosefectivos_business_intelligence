function getView(){

    let view = {
        body:()=>{
            return `
            <div class="panel-content">
            
                <div class="tab-content border border-top-0 border-bottom-0 border-right-0 border-left-0 p-3">
                    <div class="tab-pane fade show active"  id="tabHome"  role="tabpanel">

                        ${view.home()}
                    
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel">            
                    
                       

                    </div>
                    <div class="tab-pane fade" id="tab4" role="tabpanel">            
                        
                    </div>
                </div>
                
                <ul class="nav nav-tabs hidden" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link btn-md active" data-toggle="tab" href="#tabHome" role="tab">
                            <i class="fal fa-home mr-1"></i>Overview
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-md" data-toggle="tab" href="#tab3" role="tab">
                            <i class="fal fa-calendar-alt mr-1"></i>Locations
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-md" data-toggle="tab" href="#tab4" role="tab">
                            <i class="fal fa-chart-bar mr-1"></i>
                        </a>
                    </li>
                
                </ul>
            </div>
            `
        },
        home:()=>{
            return `
            <div class="row">
                <div class="card card-rounded shadow bg-info text-white col-12">
                    <h3>Customer's analsys</h3>
                </div>
            </div>
                <div class="row">
                    <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                        <div class="card card-rounded shadow" id="graf001" ondblclick="expandir('graf001')"></div>
                    </div>
                    <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                        <div class="card card-rounded shadow" id="graf002" ondblclick="expandir('graf002')"></div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="table-responsive" id="tblClientesAlcanzados">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>
                </div>

              <div class="row">

                    * CLIENTES ATENDIDOS // GRAFICA DE CLIENTES ATENDIDOS POR MES
                    * CLIENTES PERDIDOS // GRAFICA DE CLIENTES NO VISITADOS POR MES
                    * CLIENTES POR MARCA // GRAFICA DE CLIENTES POR MARCA
                    * CARDS DE CLIENTES VISITADOS POR EMPRESA (VISITADOS, UNIVERSO, NO VISITADOS)
                    * TABLA DE CLIENTES POR DEPARTAMENTO / MUNICIPIO
                    * 
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
  
                      <div class="card shadow card-rounded" id="">
                      </div>
                  
                  </div>
                  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <div class="card shadow card-rounded" id="">
                         
                      </div>
                  </div>
              </div>                  
            `
        },
        mapa:()=>{
          return `
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">

                    <div class="card shadow card-rounded" id="mapContenedor">
                    </div>
                
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="card shadow card-rounded" id="">
                        <div class="card-body">
                            <h3 class="text-danger">Total por Municipio/Departamento</h3>

                            <div class="table-responsive" id="containerMunicipios">
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>                  
          `
        },
        modalMunicipio:()=>{
            return `
                <div class="modal fade shadow card-rounded" id="modalResumenMunicipio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-right modal-lg" role="document">
                        <div class="modal-content">
                    
                            <div class="modal-body p-2">
                                <div class="card card-rounded shadow">
                                    
                                    <div class="card-body">
                                        <h5 class="text-center text-secondary" id="lbMunicipio">Municipio</h5>
                                        <h5 class="text-center text-danger negrita" id="lbTotalVenta">0</h5>
                                        
                                        <hr class="solid">
                                    </div>
                                    
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
                                                <div class="table-responsive"  id="containerTblMarcas">
                                                    
                                                </div>    
                                            </div>
                                            <div class="col-md-6 col-lg-6 col-xl-6 col-sm-12">
                                                <div class="card card-rounded shadow p2" id="containerGraf1">
                                                
                                                </div>
                                            
                                            </div>
                                        </div>
                                    

                                    
                                    </div>  
                                </div>                      
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-outline-secondary btn-xl btn-circle shadow" data-dismiss="modal">
                                    <i class="fal fa-arrow-right"></i>
                                </button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    }


    root.innerHTML = view.body() + view.modalMunicipio();

};

function addListeners(){

   

    //carga los datos con una latitud y longitud en el centro del mapa
    //mapaCobertura('mapContenedor',15.8037849,-89.8683734);

    getDataRoutes();

    funciones.slideAnimationTabs();

};

function initView(){
    getView();
    addListeners();
};



async function getDataRoutes(){
    
    await getDataClientes()
    .then((datos)=>{
        getBarCharClientesAlcanzados(datos);
        getTblClientesAlcanzados(datos);
    })
    .catch(()=>{
        
    });

}



function getDataClientes(){

    return new Promise((resolve, reject)=>{
        //obtiene los datos de la card empresas
      
        axios.post(`/cobertura/get_clientes_efectivos`,{empresas:parametrosEmpresas,anio:parametrosAnio,mes:parametrosMes})
        .then(res => {
            const empresas = res.data.recordset;    
            resolve(empresas);
        })
        .catch(()=>{
            reject();
        })


    })
     
};

function getBarCharClientesAlcanzados(data){
   
    let container = document.getElementById('graf001');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChartR1" width="40" height="40"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.CONTEO);
    });
   
    data.map((r)=>{
            label.push(r.CODSUCURSAL);
            valor.push(Number(((Number(r.CONTEO)/Number(r.UNIVERSO)))*100).toFixed(2));
            bgColor.push(getRandomColor())
    })

  
    var ctx = document.getElementById('myChartR1').getContext('2d');
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

function getTblClientesAlcanzados(data){
    
    let container = document.getElementById('tblClientesAlcanzados');
    container.innerHTML = getLoader();

    let str = '';

    data.map((r)=>{
        str += `
            <tr>
                <td>${r.CODSUCURSAL}</td>
                <td>${r.CONTEO}</td>
                <td>${r.UNIVERSO}</td>
                <td>${Number(((Number(r.CONTEO)/Number(r.UNIVERSO)))*100).toFixed(2)} %</td>
            </tr>
        `
    })
    let tbl = `
        <table class="table table-responsive table-striped">
            <thead class="bg-info text-white">
                <tr>
                    <td>SUCURSAL</td>
                    <td>ALCANZADOS</td>
                    <td>UNIVERSO</td>
                    <td>LOGRO</td>
                </tr>
            </thead>
            <tbody>${str}</tbody>
        </table>
    `;
    container.innerHTML = tbl;
};









function mapaCobertura(idContenedor, lt, lg){

    let container = document.getElementById(idContenedor);
    container.innerHTML = GlobalLoader;
    
    let tbl = `<div class="mapcontainer4" id="mapcontainer"></div>`;  
    
    let containerTabla = document.getElementById('containerMunicipios');
    containerTabla.innerHTML = GlobalLoader;
    let str = '';
    
    container.innerHTML = tbl;
    
    let mapcargado = 0;
    var map;
    map = funciones.Lmap(lt, lg);

    getDataCobertura()
    .then((datos) => {
        const data = datos;

        let totalventa = 0;
        data.map((r)=>{
            totalventa += Number(r.TOTALPRECIO);
        });

        data.map((rows)=>{
                //Carga el marker en el mapa
                L.marker([rows.LAT, rows.LONG])
                .addTo(map)
                .bindPopup(`${rows.MUNICIPIO} <br><small>Vendido: ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</small>`, {closeOnClick: true, autoClose: true})   
                .on('click', function(e){
                    console.log(e);
                    getMenuMunicipio(rows.CODSUCURSAL.toString(),rows.CODMUNICIPIO, rows.MUNICIPIO, rows.CODDEPTO, rows.TOTALPRECIO)
                    //console.log(e.sourceTarget._leaflet_id);
                    //GlobalMarkerId = Number(e.sourceTarget._leaflet_id);
                    //getMenuCliente(rows.CODIGO,rows.NOMCLIE,rows.DIRCLIE,rows.TELEFONO,rows.LAT,rows.LONG,rows.NIT);
                });
                //dibuja la table
                str += `<tr class="hand" onclick="getMenuMunicipio('${rows.CODSUCURSAL}','${rows.CODMUNICIPIO}', '${rows.MUNICIPIO}', '${rows.CODDEPTO}', '${rows.TOTALPRECIO}')">
                            <td>${rows.MUNICIPIO}
                                <br>
                                <small class="negrita">${rows.DEPARTAMENTO}</small>
                            </td>
                            <td class="currSign">${funciones.setMoneda(rows.TOTALPRECIO,'')}</td>
                            <td>${funciones.getParticipacion(Number(rows.TOTALPRECIO), totalventa)}</td>
                        </tr>`
        })

        //carga la tabla
        let tablamun = `
                        <table class="table table-responsive table-hover" id="tblMunicipiosDep">
                            <thead>
                                <tr>
                                    <td>Municipio</td>
                                    <td>Importe</td>
                                    <td>Part</td>
                                </tr>
                            </thead>
                            <tbody id="">${str}</tbody>
                        </table>
        `
        containerTabla.innerHTML = tablamun;
        try {
            var table = $('#tblMunicipiosDep').DataTable({
                paging: false, 
                bFilter:true
            });    
        } catch (error) {
            
        }
        

        //RE-AJUSTA EL MAPA A LA PANTALLA
        setTimeout(function () {
            console.log('timer mapa 1')
            try {
                map.invalidateSize();    
            } catch (error) {
                
            }
        }, 500);

    }, (error) => {
        funciones.AvisoError('Error en la solicitud');
        container.innerHTML = '';
    })
    .catch((error)=>{
        console.log('Error al cargar mapa..')
        console.log(error);
    })
       
};

function getDataCobertura(){

    return new Promise((resolve, reject)=>{
      
        axios.post(`/cobertura/get_cobertura`, {empresas: parametrosEmpresas, anio:parametrosAnio, mes:parametrosMes})
        .then(res => {
            const datos = res.data.recordset;
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })
     

};




function getMenuMunicipio(sucursal,codmun, desmun, coddepto,venta){

    $('#modalResumenMunicipio').modal('show');

    document.getElementById('lbMunicipio').innerText = `${desmun} - (${sucursal})`;
    document.getElementById('lbTotalVenta').innerText = funciones.setMoneda(venta,'Q');

    getDataMunicipio(codmun,coddepto,sucursal)
    .then((datos)=>{
        getTblMarcasMunicipio(datos);
        getPieMarcasMunicipio(datos);
    })
   

};


function getDataMunicipio(codmun,coddepto,sucursal){

    return new Promise((resolve, reject)=>{
      
        axios.post(`/cobertura/get_marcas_municipio`, {
                                                        empresas: sucursal, 
                                                        anio:parametrosAnio, 
                                                        mes:parametrosMes,
                                                        codmun:codmun,
                                                        coddepto:coddepto})
        .then(res => {
            const datos = res.data.recordset;
            resolve(datos);
        })
        .catch(()=>{
            reject();
        })


    })
     

};

function getTblMarcasMunicipio(datos){

    let container = document.getElementById('containerTblMarcas');
    container.innerHTML = getLoader();


    let str = '';
    
    let totalventa = 0;
   
        datos.map((r)=>{
            totalventa += Number(r.TOTALPRECIO);
        })

        datos.map((r)=>{
            str += `
                    <tr class="fontsmall hand">
                        <td>${r.DESMARCA}</td>
                        <td>${r.CLIENTES}</td>
                        <td class="currSign">${funciones.setMoneda(r.TOTALPRECIO,'')}</td>
                        <td class="currSign">${funciones.setMoneda(Number(r.TOTALPRECIO)-Number(r.TOTALCOSTO),'')}</td>
                        <td>${funciones.getParticipacion(Number(r.TOTALPRECIO),totalventa)}</td>
                    </tr>
                    `
        })
        let tablemarcas = ` <table class="table table-responsive table-hover" id="tblMarcasMunicipio">
                                <thead class="bg-trans-gradient text-white fontsmall">
                                    <tr>
                                        <td>MARCA</td>
                                        <td>CLI</td>
                                        <td>VENTA</td>
                                        <td>UTIL</td>
                                        <td>PART</td>
                                    </tr>
                                </thead>
                                <tbody class="fontsmall">
                                    ${str}                
                                </tbody>
                            </table>`;

        container.innerHTML = tablemarcas;

        try {
            var table = $('#tblMarcasMunicipio').DataTable({
                paging: false, 
                bFilter:true
            });    
        } catch (error) {
            
        }
 

};

function getPieMarcasMunicipio(data){
   
    let container = document.getElementById('containerGraf1');
    container.innerHTML = '';
    container.innerHTML = '<canvas id="myChart" width="40" height="40"></canvas>';
  
    let label = []; let valor = []; let bgColor = [];
    let total = 0;
    data.map((r)=>{
        total = total + Number(r.TOTALPRECIO);
    });
   
    data.map((r)=>{
            label.push(r.DESMARCA);
            valor.push(Number(((Number(r.TOTALPRECIO)/total))*100).toFixed(2));
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
                    text: 'Ventas por Marca: ' + funciones.setMoneda(total,'Q')
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