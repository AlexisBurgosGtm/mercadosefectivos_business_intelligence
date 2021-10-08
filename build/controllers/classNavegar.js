let Navegar = {
    login:()=>{
        funciones.loadScript('../views/viewLogin.js','root')
        .then(()=>{
            initView();
        })
    },
    inicio:()=>{
        funciones.Aviso('Hola mundo')
    }
}