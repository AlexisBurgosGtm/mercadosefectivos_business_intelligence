function getView(){
    let view = {
        header: ()=>{
            return `
            <div class="row">
                <div class="card p-4 border-top-rounded border-bottom-rounded">
                    
                </div>
            </div>
            `
        }
        
    }

    root.innerHTML = view.header();
};

function addListeners(){

};

function initView(){
    getView();
    addListeners();
};