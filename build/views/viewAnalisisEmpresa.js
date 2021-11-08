function getView(){
    let view = {
        header: ()=>{
            return `
            <div class="row shadow p-2 border-top-rounded border-bottom-rounded">
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <h3 class="text-danger negrita">${GlobalSelectedCodSucursal}</h3>
                </div>
                
                <div class="col-sm-12 col-md-6 col-xl-6 col-lg-6">
                    <button class="btn btn-outline-secondary shadow" id="btnTabHome">
                        <i class="fas fa-chart"></i>Sales Overview
                    </button>
                    <button class="btn btn-outline-danger shadow" id="btnTab1">
                        <i class="fas fa-shopping-cart"></i>Products
                    </button>
                    <button class="btn btn-outline-info shadow" id="btnTab2">
                        <i class="fas fa-address-book"></i>Customers
                    </button>
                    <button class="btn btn-outline-success shadow" id="btnTab3">
                        <i class="fas fa-briefcase"></i>Routes(Employees)
                    </button>
                </div>
            </div>
            <hr class="solid">
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
                    <div class="tab-pane fade" id="tab1" role="tabpanel" aria-labelledby="pills-profile-tab">
                        ${view.products()}
                    </div>
                    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="pills-profile-tab">
                        ${view.customers()}
                    </div>
                    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="pills-contact-tab">
                        ${view.routes()}
                    </div>
                </div>
            </div>
            `
        },
        home:()=>{
            return `
            <div class="row">
                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf7"  ondblclick="expandir('containerGraf7')">
                    
                    </div>
                </div>
                
                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf2"  ondblclick="expandir('containerGraf2')">
                
                    </div>    
                </div>
            
                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf8"  ondblclick="expandir('containerGraf8')">
                    
                    </div>
                </div>

                <div class="col-sm-6 col-md-3 col-xl-3 col-lg-3">
                    ${GlobalIconoDobleClick}
                    <div class="card shadow border-top-rounded border-bottom-rounded" id="containerGraf6"  ondblclick="expandir('containerGraf6')">
                    
                    </div>
                </div>

            

            </div>

            <div class="row">
                <div class="card shadow border-top-rounded border-bottom-rounded col-12" id="containerGraf1"  ondblclick="expandir('containerGraf1')">
                </div>
            </div>`
        },
        products:()=>{
            return `
            <div class="row">
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">

                    <div class="card shadow table-responsive col-12"  id="containertblProductos">
                    
                    </div>
                </div>
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">

                    <div class="card shadow table-responsive col-12"  id="containertblMunicipiosProductos">
                    
                    </div>
                </div>
            </div>
           `
        },
        customers:()=>{
            return `
            <div class="row">
                <div class="card shadow col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive"  id="containerTblMunicipios">
                    </div>
                </div>

                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="row">
                        <div class="col-6">
                            <div class="table-responsive"  id="containertblMunicipiosProductos2">
                            </div>      
                        </div>
                        <div class="col-6">
                            <div class="table-responsive"  id="containertblMunicipiosClientes">
                            </div>  
                        </div>
                    </div>  
                    
                </div>
                    
            </div>
            `
        },
        routes:()=>{
            return `
            <div class="row">
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive card shadow border-top-rounded border-bottom-rounded" id="containertblVendedores">
                    
                    </div>   
                </div>
                <div class="col-sm-12 col-xl-6 col-lg-6 col-md-6">
                    <div class="table-responsive card shadow border-top-rounded border-bottom-rounded" id="containertblVendedoresProductos">
                        
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
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.remove('show','active');
    })
    document.getElementById('btnTab1').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.add('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.remove('show','active');
    })
    document.getElementById('btnTab2').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.add('show','active');
        document.getElementById('tab3').classList.remove('show','active');
    })
    document.getElementById('btnTab3').addEventListener('click',()=>{
        document.getElementById('tabHome').classList.remove('show','active');
        document.getElementById('tab1').classList.remove('show','active');
        document.getElementById('tab2').classList.remove('show','active');
        document.getElementById('tab3').classList.add('show','active');
    })
};

function initView(){
    getView();
    addListeners();
  
};
