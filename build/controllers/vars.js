let root = document.getElementById('root');

function getLoader(texto){
    return `
        <div class="preloader">
            <div class="lds-ripple">
                <div class="lds-pos"></div>
                <div class="lds-pos"></div>
            </div>
        </div>
    `
}