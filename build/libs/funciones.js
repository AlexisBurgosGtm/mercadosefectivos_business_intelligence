let funciones = {
  filtrarJson:(my_object, my_criteria)=>{

    return my_object.filter(function(obj) {
      return Object.keys(my_criteria).every(function(c) {
        return obj[c] == my_criteria[c];
      });
    });
  
  },
    convertDateNormal(date) {
      const [yy, mm, dd] = date.split(/-/g);
      return `${dd}/${mm}/${yy}`.replace('T00:00:00.000Z', '');
    },
    imprimirSelec:(nombreDiv)=>{
      var contenido= document.getElementById(nombreDiv).innerHTML;
      var contenidoOriginal= document.body.innerHTML;
 
      document.body.innerHTML = contenido;
 
      window.print();
 
      document.body.innerHTML = contenidoOriginal;
    },
    getMargenUtilidad:(venta,costo)=>{
      let utilidad = venta-costo;
      return Number((utilidad/venta) * 100).toFixed(2) + '%'
    },
    getParticipacion:(valor,total)=>{
      let peso = (valor / total) * 100;
      return peso.toFixed(2) + '%'
    },
    animateCSS: (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = document.getElementById(element);

      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    }),
    getStringParametros:(data)=>{
      let param = data;
      let str = '';
      for (let i = 0; i < param.length; i++) {
          str = str + "'" + param[i].toString() + "'" + ','
      }
      var n = str.lastIndexOf(",");
      str = str.substring(0,n); 
      return str;
    },
    rand:()=>{
        return Math.floor(Math.random() * 255)
    },
    enviarPedidoWhatsapp2: function(fecha,coddoc,correlativo){
    swal({
      text: 'Escriba el número a donde se enviará:',
      content: "input",
      button: {
        text: "Whatsapp",
        closeModal: true,
      },
    })
    .then(numero => {
      if (!numero) throw null;
        let stn = '502' + numero.toString();
        apigen.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
    })
    },
    enviarPedidoWhatsapp:(fecha,coddoc,correlativo)=>{

    var apiwha = (navigator.contacts || navigator.mozContacts);
      
    if (apiwha && !!apiwha.select) { // new Chrome API
      apiwha.select(['name', 'email', 'tel'], {multiple: false})
        .then(function (contacts) {
          //console.log('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            apigen.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed 1 : ' +  err.toString())
        });
        
    } else if (apiwha && !!apiwha.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      apiwha.find(criteria)
        .then(function (contacts) {
          //console.log('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            apigen.digitadorDetallePedidoWhatsapp(fecha,coddoc,correlativo,stn);
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed 2 : ' + err.toString())
        });
        
    } else {
      console.log('Contacts API not supported.');
    }
    },
    readContacts:(idResult)=>{

    let container = document.getElementById(idResult);

    var api = (navigator.contacts || navigator.mozContacts);
      
    if (api && !!apigen.select) { // new Chrome API
      apigen.select(['name', 'email', 'tel'], {multiple: false})
        .then(function (contacts) {
          console.log('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            funciones.Aviso(stn);
            container.innerHTML = JSON.stringify(contacts);
            
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed: ' + err.name)
        });
        
    } else if (api && !!apigen.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      apigen.find(criteria)
        .then(function (contacts) {
          console.log('Found ' + contacts.length + ' contacts.');
          container.innerHTML = JSON.stringify(contacts);
          if (contacts.length) {
            let numero = contacts[0].tel.toString()
            numero = numero.replace('+502','');
            let stn = '502' + numero.toString();
            stn = stn.replace(' ','');
            funciones.Aviso(stn);
            container.innerHTML = JSON.stringify(contacts);
            
          }
        })
        .catch(function (err) {
          console.log('Fetching contacts failed: ' + err.name);
          funciones.AvisoError('Fetching contacts failed: ' + err.name)
        });
        
    } else {
      console.log('Contacts API not supported.');
      container.innerHTML = 'Contacts API not supported.'
    }
    },
    GetDataNit: async (idNit,idCliente,idDireccion)=>{

      return new Promise((resolve, reject) => {
        let nit = document.getElementById(idNit).value;                    
        let url = 'https://free.feel.com.gt/api/v1/obtener_contribuyente';
        
        axios.post(url,{nit: nit})
        .then((response) => {
            let json = response.data;
            console.log(response.data);
            
            //document.getElementById(idCliente).value = json.descripcion;
            //document.getElementById(idDireccion).value = json.direcciones.direccion;    

            resolve(json);
        }, (error) => {
            console.log(error);
            reject();
        });
  


      });

    },
    GetDataNIS: async (NIS,idTxtPropietario,idTxtDireccion)=>{

      return new Promise((resolve, reject) => {
        
        let url = 'https://oficinavirtual.energuate.com/mifactura/GetHistorial?nisrad=' + NIS;
        
        axios.get(url)
        .then((response) => {
            let json = response.data.dataPersonBill;
            //console.log(response.data.dataPersonBill);
            
            //document.getElementById(idTxtPropietario).value = json.TITULAR_SERVICIO;
            //document.getElementById(idTxtDireccion).value = json.DIRECCION_SERVICIO;    
  
            resolve(json);
        }, (error) => {
            console.log(error);
            reject(error);
        });
  
  
  
      });

    },
    instalationHandlers: (idBtnInstall)=>{
      //INSTALACION APP
      let btnInstalarApp = document.getElementById(idBtnInstall);
      btnInstalarApp.hidden = true;

      let capturedInstallEvent;
      window.addEventListener('beforeinstallprompt',(e)=>{
        e.preventDefault();
        btnInstalarApp.hidden = false;
        capturedInstallEvent = e;
      });
      btnInstalarApp.addEventListener('click',(e)=>{
        capturedInstallEvent.prompt();
      capturedInstallEvent.userChoice.then((choice)=>{
          //solicita al usuario confirmacion para instalar
      })
    })
    //INSTALACION APP
    },
    instalationHandlers2: (idContainer,idBtnInstall)=>{
      //INSTALACION APP
      let btnInstalarApp = document.getElementById(idBtnInstall);
      btnInstalarApp.hidden = true;

      let container = document.getElementById(idContainer);

      let capturedInstallEvent;
      window.addEventListener('beforeinstallprompt',(e)=>{
        e.preventDefault();
        container.hidden = false;
        capturedInstallEvent = e;
      });
      btnInstalarApp.addEventListener('click',(e)=>{
        capturedInstallEvent.prompt();
        capturedInstallEvent.userChoice.then((choice)=>{
          //solicita al usuario confirmacion para instalar
        })
      })
      //INSTALACION APP
    },
    Confirmacion: function(msn){
        return swal({
            title: 'Confirme',
            text: msn,
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
              }})
    },
    Aviso: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "success",
            buttons: false
            });

        try {
            navigator.vibrate(500);
        } catch (error) {
            
        }
    },
    AvisoError: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "error",
            buttons: false
            });
        try {
            navigator.vibrate([100,200,500]);
        } catch (error) {
            
        }
    },
    FiltrarListaProductos: function(idTabla){
        swal({
          text: 'Escriba para buscar...',
          content: "input",
          button: {
            text: "Buscar",
            closeModal: true,
          },
        })
        .then(name => {
          if (!name) throw null;
            funciones.FiltrarTabla(idTabla,name);

            //'tblProductosVentas'
        })
    },
    solicitarClave: function(){
      return new Promise((resolve,reject)=>{
          swal({
            text: 'Escriba su contraseña de usuario',
            content: "input",
            button: {
              text: "Contraseña",
              closeModal: true,
            },
          })
          .then(name => {
            if (!name) throw null;
                resolve(name);
          })
          .catch(()=>{
            reject('no');
          })
      })     
    },
    setMoneda: function(num,signo) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num)) num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        let cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10) cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + signo + ' ' + num + ((cents == "00") ? '' : '.' + cents)).toString();
    },
    setMargen: function(num,signo) {
      
      num = num.toString().replace(/\$|\,/g, '');
      if (isNaN(num)) num = "0";
      let sign = (num == (num = Math.abs(num)));
      num = Math.floor(num * 100 + 0.50000000001);
      let cents = num % 100;
      num = Math.floor(num / 100).toString();
      if (cents < 10) cents = "0" + cents;
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
          num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      return ( ((sign) ? '' : '-') +  num + ((cents == "00") ? '' : '.' + cents) + ' ' + signo  ).toString();
    },
    loadScript: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          script.src = url;
    
          script.onload = resolve;
          script.onerror = reject;
             
          document.getElementById(idContainer).appendChild(script)
        });
    },
    loadCss: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var link = document.createElement('link');
          //script.async = true;
          link.href = url;
          link.rel = "stylesheet"
    
          link.onload = resolve;
          link.onerror = reject;
             
          document.getElementById(idContainer).appendChild(link)
        });
    },
    fetchData: (url)=>{
        fetch(url)
            .then(function(response) {
                return response.json();
                                    })
            .catch();
    },
    loadView: (url, idContainer)=> {
        return new Promise((resolve, reject) => {
            
            let contenedor = document.getElementById(idContainer);

            axios.get(url)
            .then((response) => {
                contenedor.innerHTML ='';
                contenedor.innerHTML = response.data;
                resolve();
            }, (error) => {
                console.log(error);
                reject();
            });
      
          });
    },   
    hablar: function(msn){
        var utterance = new SpeechSynthesisUtterance(msn);
        return window.speechSynthesis.speak(utterance); 
    },
    CompaniaTelefono: function(numero,hablado){
        var rangos = [[30000000,32289999,"TIGO"],
        [32290000,32299999,"CLARO"],
        [32300000,33099999,"TIGO"],
        [34000000,34499999,"MOVISTAR"],
        [40000000,40999999,"TIGO"],
        [41000000,42999999,"CLARO"],
        [43000000,44759999,"MOVISTAR"],
        [44760000,46999999,"TIGO"],
        [47000000,47729999,"CLARO"],
        [47730000,48199999,"TIGO"],
        [48200000,48219999,"UNITEL"],
        [48220000,50099999,"TIGO"],
        [50100000,50199999,"CLARO"],
        [50200000,50299999,"MOVISTAR"],
        [50300000,50699999,"TIGO"],
        [50700000,51099999,"MOVISTAR"],
        [51100000,51399999,"CLARO"],
        [51400000,51499999,"MOVISTAR"],
        [51500000,51999999,"TIGO"],
        [52000000,52099999,"TIGO"],
        [52100000,52999999,"MOVISTAR"],
        [53000000,53099999,"TIGO"],
        [53100000,53119999,"CLARO"],
        [53120000,53139999,"MOVISTAR"],
        [53140000,53899999,"TIGO"],
        [53900000,54099999,"MOVISTAR"],
        [54100000,54999999,"CLARO"],
        [55000000,55099999,"MOVISTAR"],
        [55100000,55179999,"CLARO"],
        [55180000,55199999,"MOVISTAR"],
        [55210000,55299999,"TIGO"],
        [55310000,55399999,"CLARO"],
        [55400000,55429999,"MOVISTAR"],
        [55430000,55449999,"CLARO"],
        [55450000,55499999,"MOVISTAR"],
        [55500000,55539999,"TIGO"],
        [55540000,55799999,"CLARO"],
        [55800000,55819999,"TIGO"],
        [55820000,55999999,"CLARO"],
        [56000000,56089999,"MOVISTAR"],
        [56100000,56399999,"CLARO"],
        [56400000,56899999,"MOVISTAR"],
        [56900000,56999999,"CLARO"],
        [57000000,57099999,"TIGO"],
        [57100000,57189999,"CLARO"],
        [57190000,57899999,"TIGO"],
        [57900000,57999999,"MOVISTAR"],
        [58000000,58099999,"TIGO"],
        [58100000,58189999,"CLARO"],
        [58190000,58199999,"TIGO"],
        [58200000,58799999,"CLARO"],
        [58800000,59099999,"TIGO"],
        [59100000,59149999,"CLARO"],
        [59150000,59179999,"MOVISTAR"],
        [59180000,59199999,"TIGO"],
        [59200000,59899999,"CLARO"],
        [59900000,59999999,"TIGO"]],

    lengthRangos = rangos.length;

    var num = numero;
    let len = num.length; 
    let nnum = parseInt(num,10);
    let found;

    if (len == 8 ) {
    for (var i = lengthRangos - 1; i >= 0; i--) {
    if (rangos[i][0] <= nnum && nnum <= rangos[i][1]) {
        if (hablado=='SI'){     
            funciones.hablar("Su línea telefónica es " + rangos[i][2]);
        }else{
            return rangos[i][2];
        }
        found = true;
    }
    };

    if (!found) {
    if (hablado=='SI'){ 
        funciones.hablar("El número indicado no aparece en la lista");
    }else{
        return "No Disponible";
    }
    }

    } else {
    return "Ingrese 8 dígitos";
    }
    },
    crearBusquedaTabla: function(idTabla,idBusqueda){
    var tableReg = document.getElementById(idTabla);
    var searchText = document.getElementById(idBusqueda).value.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
    },
    FiltrarTabla: function(idTabla,idfiltro){
    var tableReg = document.getElementById(idTabla);
    let filtro = document.getElementById(idfiltro).value;

    var searchText = filtro.toLowerCase();
      var cellsOfRow="";
      var found=false;
      var compareWith="";
   
      // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
                {
                  cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
                    found = false;
                    // Recorremos todas las celdas
                    for (var j = 0; j < cellsOfRow.length && !found; j++)
                    {
                      compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                      // Buscamos el texto en el contenido de la celda
                      if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
                      {
                          found = true;
                      }
                  }
                  if(found)
                  {
                      tableReg.rows[i].style.display = '';
                  } else {
                      // si no ha encontrado ninguna coincidencia, esconde la
                      // fila de la tabla
                      tableReg.rows[i].style.display = 'none';
                  }
              }
        //funciones.scrollUp(1000, 'easing');
    },
    OcultarRows: function(idTabla){
    var tableReg = document.getElementById(idTabla);
        // Recorremos todas las filas con contenido de la tabla
        for (var i = 1; i < tableReg.rows.length; i++)
        {
            if(i>15){
                tableReg.rows[i].style.display = 'none';
            }
        }
    },
    PingInternet: async (url)=>{
    var peticion = new Request(url, {
        method: 'POST',
        headers: new Headers({
            // Encabezados
           'Content-Type': 'application/json'
        })
      });

      await fetch(peticion)
         .then(function(res) {
           if (res.status==200)
               {
                   funciones.hablar('parece que ya hay internet');
                }
      })
      .catch(
          ()=>{
            funciones.hablar('por lo visto no hay señal');
          }
      )
    },
    NotificacionPersistent : (titulo,msn)=>{

    function InicializarServiceWorkerNotif(){
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () =>
       navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(err => 'SW registration failed'));
      };
      
      requestPermission();
    }
    
    if ('Notification' in window) {};
    
    function requestPermission() {
      if (!('Notification' in window)) {
        funciones.Aviso('Notification API not supported!');
        return;
      }
      
      Notification.requestPermission(function (result) {
        //$status.innerText = result;
      });
    }

    InicializarServiceWorkerNotif();
    
    const options = {
        body : titulo,
        icon: "../favicon.png",
        vibrate: [1,2,3],
      }
      //image: "../favicon.png",
         if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
          console.log('Persistent Notification API not supported!');
          return;
        }
        
        try {
          navigator.serviceWorker.getRegistration()
            .then(reg => 
                    reg.showNotification(msn, options)
                )
            .catch(err => console.log('Service Worker registration error: ' + err));
        } catch (err) {
          console.log('Notification API error: ' + err);
        }
      
    },
    ObtenerUbicacion: async(idlat,idlong)=>{
        let lat = document.getElementById(idlat);
        let long = document.getElementById(idlong);
        
        try {
            navigator.geolocation.getCurrentPosition(function (location) {
                lat.innerText = location.coords.latitude.toString();
                long.innerText = location.coords.longitude.toString();
            })
        } catch (error) {
            funciones.AvisoError(error.toString());
        }
    },
    ComboSemana :(letnum)=>{
      let str = '';
      if(letnum=="LETRAS"){
        str =  `<option value="LUNES">LUNES</option>
                <option value="MARTES">MARTES</option>
                <option value="MIERCOLES">MIERCOLES</option>
                <option value="JUEVES">JUEVES</option>
                <option value="VIERNES">VIERNES</option>
                <option value="SABADO">SABADO</option>
                <option value="DOMINGO">DOMINGO</option>
                <option value="OTROS">OTROS</option>
                `
      }else{
        str =  `<option value="1">LUNES</option>
                <option value="2">MARTES</option>
                <option value="3">MIERCOLES</option>
                <option value="4">JUEVES</option>
                <option value="5">VIERNES</option>
                <option value="6">SABADO</option>
                <option value="7">DOMINGO</option>
                <option value="0">OTROS</option>
                `
      };

      return str;
      
    },
    getDiaSemana:(numdia)=>{
      switch (numdia) {
        case 0:
          return 'DOMINGO';
          break;
        case 1:
          return 'LUNES';
          break;
        case 2:
          return 'MARTES';
          break;
        case 3:
          return 'MIERCOLES';
          break;
        case 4:
          return 'JUEVES';
          break;
        case 5:
          return 'VIERNES';
          break;
        case 6:
          return 'SABADO';
          break;
      
        default:
          break;
      }
    },
    ComboMeses: ()=>{
    let str =`<option value='1'>Enero</option>
              <option value='2'>Febrero</option>
              <option value='3'>Marzo</option>
              <option value='4'>Abril</option>
              <option value='5'>Mayo</option>
              <option value='6'>Junio</option>
              <option value='7'>Julio</option>
              <option value='8'>Agosto</option>
              <option value='9'>Septiembre</option>
              <option value='10'>Octubre</option>
              <option value='11'>Noviembre</option>
              <option value='12'>Diciembre</option>`
    return str;
    },
    ComboAnio: ()=>{
    let str =`<option value='2017'>2017</option>
              <option value='2018'>2018</option>
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
              <option value='2030'>2030</option>`
    return str;
    },
    getFecha(){
      let fecha
      let f = new Date(); 
      let d = f.getDate(); 
      let m = f.getUTCMonth()+1; 

      switch (d.toString()) {
        case '30':
          m = f.getMonth()+1; 
          break;
        case '31':
          m = f.getMonth()+1; 
            break;
      
        default:

          break;
      }

      
      let y = f.getFullYear();
     
      di = d;
      var D = '0' + di;
      let DDI 
      if(D.length==3){DDI=di}else{DDI=D}
      
      ma = m;
      var MA = '0' + ma;
      let DDM 
      if(MA.length==3){DDM=ma}else{DDM=MA}


      fecha = y + '-' + DDM + '-' + DDI;
      return fecha;
    },
    limpiarTexto: (texto) =>{
      var ignorarMayMin = true;
      var reemplazarCon = " pulg";
      var reemplazarQue = '"';
      reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
      reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
      modif = "g" + (ignorarMayMin ? "i" : ""),
      regex = new RegExp(reemplazarQue, modif);
      return texto.replace(regex,reemplazarCon);
    },
    quitarCaracteres: ( texto, reemplazarQue, reemplazarCon, ignorarMayMin) =>{
      var reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
      reemplazarCon = reemplazarCon.replace(/\$(?=[$&`"'\d])/g, "$$$$"),
      modif = "g" + (ignorarMayMin ? "i" : ""),
      regex = new RegExp(reemplazarQue, modif);
      return texto.replace(regex,reemplazarCon);
    },
    devuelveFecha: (idInputFecha)=>{
      let fe = new Date(document.getElementById(idInputFecha).value);
      let ae = fe.getFullYear();
      let me = fe.getUTCMonth()+1;
      let de = fe.getUTCDate() 
      let fret = ae + '-' + me + '-' + de;
      return fret;
    },
    getComboTipoEmpleados: (idcontainer)=>{
      let str = `
        <option value="VENDEDOR">VENDEDORES</option>
        <option value="SUPERVISOR">SUPERVISOR</option>
        <option value="REPARTIDOR">REPARTIDORES</option>
      `
      document.getElementById(idcontainer).innerHTML = str;

    },
    showToast: (text)=>{
      //depente de la libreria noty
      new Noty({
        type: 'info',
        layout: 'topRight',
        timeout: '500',
        theme: 'metroui',
        progressBar: false,
        text,
      }).show();
    },
    setReminder: async (msg,minutos)=>{

      
        if (!('Notification' in window)) {
          alert('Notification API not supported');
          return;
        }
        if (!('showTrigger' in Notification.prototype)) {
          alert('Notification Trigger API not supported');
          return;
        }
        
        await Notification.requestPermission()
          .then(() => {
            if (Notification.permission !== 'granted') {
              throw 'Notification permission is not granted';
            }
          })
          .then(() => navigator.serviceWorker.getRegistration())
          .then((reg) => {
            reg.showNotification(msg, {
                showTrigger: new TimestampTrigger(new Date().getTime() + Number(minutos) * 60000)
            })
          })
          .catch((err) => {
            alert('Notification Trigger API error: ' + err);
          });
      
    
    },
    getComboSucursales: ()=>{
      let str = '';
      let data = [
        {codsucursal:"ME-ZACAPA",nomsucursal:"SUCURSAL ZACAPA",color:"success"},
        {codsucursal:"ME-IZABAL",nomsucursal:"SUCURSAL IZABAL",color:"primary"},
        {codsucursal:"ME-JUTIAPA",nomsucursal:"SUCURSAL JUTIAPA",color:"info"},
        {codsucursal:"ME-COBAN",nomsucursal:"SUCURSAL COBAN",color:"warning"},
        {codsucursal:"ME-PETEN",nomsucursal:"SUCURSAL PETEN",color:"danger"},
      ];

      data.map((rows)=>{
        str = str + `<option value='${rows.codsucursal}'>${rows.nomsucursal}</option>`;
      });

      return str;
      
    },
    getComboTipoClientes:()=>{
      return `
        <option value="TIENDITA">TIENDITA</option>
        <option value="ABARROTERIA">ABARROTERIA</option>
        <option value="FARMACIA">FARMACIA</option>
        <option value="LIBRERIA">LIBRERIA</option>
        <option value="PIÑATERIA">PIÑATERIA</option>
        <option value="MUNDO DE 3">MUNDO DE 3</option>
        <option value="RESTAURANTE">RESTAURANTE</option>
        <option value="COMEDOR">COMEDOR</option>
        <option value="PAPEROS">PAPEROS</option>
        <option value="HOTEL">HOTEL</option>
        <option value="AUTOHOTEL">AUTOHOTEL</option>
        <option value="CARNICERIA">CARNICERIA</option>
        <option value="MERCERIA">MERCERIA</option>
        <option value="BAR">BAR</option>
        <option value="BARBERIA">BARBERIA</option>
        <option value="SALON DE BELLEZA">SALON DE BELLEZA</option>
        <option value="COLEGIO">COLEGIO</option>
        <option value="MINISUPER">MINISUPER</option>
        <option value="SUPERMERCADO">SUPERMERCADO</option>
        <option value="RUTEROS">RUTEROS</option>
        <option value="OTROS">OTROS</option>
      `
    },
    slideAnimationTabs: ()=>{
      //inicializa el slide de las tabs en censo
      $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
          var $old_tab = $($(e.target).attr("href"));
          var $new_tab = $($(e.relatedTarget).attr("href"));
  
          if($new_tab.index() < $old_tab.index()){
              $old_tab.css('position', 'relative').css("right", "0").show();
              $old_tab.animate({"right":"-100%"}, 300, function () {
                  $old_tab.css("right", 0).removeAttr("style");
              });
          }
          else {
              $old_tab.css('position', 'relative').css("left", "0").show();
              $old_tab.animate({"left":"-100%"}, 300, function () {
                  $old_tab.css("left", 0).removeAttr("style");
              });
          }
      });
  
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
          var $new_tab = $($(e.target).attr("href"));
          var $old_tab = $($(e.relatedTarget).attr("href"));
  
          if($new_tab.index() > $old_tab.index()){
              $new_tab.css('position', 'relative').css("right", "-2500px");
              $new_tab.animate({"right":"0"}, 500);
          }
          else {
              $new_tab.css('position', 'relative').css("left", "-2500px");
              $new_tab.animate({"left":"0"}, 500);
          }
      });
  
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
          // your code on active tab shown
      });
    },
    exportTableToExcel: (tableID, filename = '')=>{
      var downloadLink;
      var dataType = 'application/vnd.ms-excel;charset=UTF-8';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
      
      // Specify file name
      filename = filename?filename+'.xls':'excel_data.xlsx';
      
      // Create download link element
      downloadLink = document.createElement("a");
      
      document.body.appendChild(downloadLink);
      
      if(navigator.msSaveOrOpenBlob){
          var blob = new Blob(['ufeff', tableHTML], {
              type: "text/plain;charset=utf-8;"//dataType
          });
          navigator.msSaveOrOpenBlob( blob, filename);
      }else{
          // Create a link to the file
          downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      
          // Setting the file name
          downloadLink.download = filename;
          
          //triggering the function
          downloadLink.click();
      }
    },
    getTipoPrecio: (tipo)=>{
      let str = '';
      switch (tipo) {
        case 'A':
            str = 'MAYOREO';
            break;
        case 'B':
            str = 'PRECIO A';
            break;
        case 'C':
            str = 'PRECIO B';
            break;
        case 'K':
            str = 'CAMBIO';
            break;
      };
      return str;
    },
    getHora:()=>{
      let hoy = new Date();
      let hora = hoy.getHours();
      let minuto = hoy.getMinutes();
      return `${hora.toString()}:${minuto.toString()}`;
    },
    gotoGoogleMaps:(lat,long)=>{
      window.open(`https://www.google.com/maps?q=${lat},${long}`);
    },
    cleanFecha:(f)=>{
      return f.replace('T00:00:00.000Z','')
    }
};

//export default funciones;