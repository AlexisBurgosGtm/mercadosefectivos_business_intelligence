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
                <div class="col-sm-6 col-md-8 col-lg-8 col-xl-8">
                    

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