function getView(){
    let view = {
        encabezado:()=>{
            return `
            <div class="row">
                <div class="col-sm-12 col-lg-4 col-xl-4 col-md-4 card shadow border-top-rounded border-bottom-rounded">
                    aaa
                </div>

                <div class="col-sm-12 col-lg-4 col-xl-4 col-md-4 card shadow border-top-rounded border-bottom-rounded">
                    aaa
                </div>

                <div class="col-sm-12 col-lg-4 col-xl-4 col-md-4 card shadow border-top-rounded border-bottom-rounded">
                    aaa
                </div>
            </div>
            `
        },
        listado:()=>{

        }
    }

    root.innerHTML = view.encabezado() + view.listado();
}; 

function addListeners(){


};

function initView(){
    getView();
    addListeners();
};


function getPieChar(){

    const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Ventas por Empresas'
            }
          }
        },
      };



}