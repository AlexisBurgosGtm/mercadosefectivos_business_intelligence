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
                            <i class="fal fa-calendar-alt mr-1"></i>2
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-md" data-toggle="tab" href="#tab4" role="tab">
                            <i class="fal fa-chart-bar mr-1"></i>3
                        </a>
                    </li>
                   
                </ul>
                <div class="tab-content border border-top-0 border-bottom-0 border-right-0 border-left-0 p-3">
                    <div class="tab-pane fade show active"  id="tabHome"  role="tabpanel">
                       ${view.home()}
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel">            
                        
                    </div>
                    <div class="tab-pane fade" id="tab4" role="tabpanel">            
                        
                    </div>
                </div>
            </div>
            `
        },
        home:()=>{
          return `
            <div class="row">
                <div class="col-6">

                    <div class="card shadow card-rounded" id="mapContenedor">
                    </div>
                
                </div>
                <div class="col-6">
                    <div class="card shadow card-rounded" id="">
                        <div class="card-body">
                            <h3>Totales de ventas dividido por departamento</h3>
                        </div>
                    </div>
                </div>
            </div>                  
          `
        }
    }


    root.innerHTML = view.body();

};

function addListeners(){

    funciones.showLocation()
    .then((location)=>{
            let lat = location.coords.latitude.toString();
            let longg = location.coords.longitude.toString();
            
            mapaCobertura('mapContenedor', lat, longg);
    });    

   
    funciones.slideAnimationTabs();

};


function initView(){
    getView();
    addListeners();
};


function mapaCobertura(idContenedor, lt, lg){

    let container = document.getElementById(idContenedor);
    container.innerHTML = GlobalLoader;
    
    let tbl = `<div class="mapcontainer4" id="mapcontainer"></div>`;        
    
    container.innerHTML = tbl;
    
    let mapcargado = 0;
    var map;
    map = funciones.Lmap(lt, lg);

    getDataCobertura()
    .then((datos) => {
        const data = datos;

        data.map((rows)=>{
            
            if(f==funciones.getFecha()){}else{
                L.marker([rows.LAT, rows.LONG])
                .addTo(map)
                .bindPopup(`${rows.MUNICIPIO} <br><small>Vendido: ${funciones.setMoneda(rows.TOTALPRECIO,'Q')}</small>`, {closeOnClick: true, autoClose: true})   
                .on('click', function(e){
                    //console.log(e.sourceTarget._leaflet_id);
                    //GlobalMarkerId = Number(e.sourceTarget._leaflet_id);
                    //getMenuCliente(rows.CODIGO,rows.NOMCLIE,rows.DIRCLIE,rows.TELEFONO,rows.LAT,rows.LONG,rows.NIT);
                })
            }
        })

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
       
}

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