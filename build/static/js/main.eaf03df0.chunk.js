(this.webpackJsonpreactesting=this.webpackJsonpreactesting||[]).push([[0],{208:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),o=a(73),s=a.n(o),i=a(1),r=a(2),l=a(8),d=a(5),u=a(4),b=a(14),h=a.n(b),j=a(44),p=a.n(j),m=a(74),O={getApiUrl:function(){return"https://mercadosefectivos-bi-api.herokuapp.com"},setMoneda:function(e,t){e=e.toString().replace(/\$|\,/g,""),isNaN(e)&&(e="0");var a=e==(e=Math.abs(e)),n=(e=Math.floor(100*e+.50000000001))%100;e=Math.floor(e/100).toString(),n<10&&(n="0"+n);for(var c=0;c<Math.floor((e.length-(1+c))/3);c++)e=e.substring(0,e.length-(4*c+3))+","+e.substring(e.length-(4*c+3));return((a?"":"-")+t+" "+e+("00"==n?"":"."+n)).toString()},setPorcentaje:function(e,t){e=e.toString().replace(/\$|\,/g,""),isNaN(e)&&(e="0");var a=e==(e=Math.abs(e)),n=(e=Math.floor(100*e+.50000000001))%100;e=Math.floor(e/100).toString(),n<10&&(n="0"+n);for(var c=0;c<Math.floor((e.length-(1+c))/3);c++)e=e.substring(0,e.length-(4*c+3))+","+e.substring(e.length-(4*c+3));return((a?"":"-")+" "+e+("00"==n?"":"."+n)).toString()+t},hablar:function(e){var t=new SpeechSynthesisUtterance(e);return window.speechSynthesis.speak(t)},FiltrarTabla:function(e,t){for(var a=document.getElementById(e),n=document.getElementById(t).value.toLowerCase(),c="",o=!1,s="",i=1;i<a.rows.length;i++){c=a.rows[i].getElementsByTagName("td"),o=!1;for(var r=0;r<c.length&&!o;r++)s=c[r].innerHTML.toLowerCase(),(0==n.length||s.indexOf(n)>-1)&&(o=!0);a.rows[i].style.display=o?"":"none"}},OcultarRows:function(e){for(var t=document.getElementById(e),a=1;a<t.rows.length;a++)a>15&&(t.rows[a].style.display="none")},ObtenerUbicacion:function(){var e=Object(m.a)(p.a.mark((function e(t,a){var n,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=document.getElementById(t),c=document.getElementById(a);try{navigator.geolocation.getCurrentPosition((function(e){n.innerText=e.coords.latitude.toString(),c.innerText=e.coords.longitude.toString()}))}catch(o){O.AvisoError(o.toString())}case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),ComboMeses:function(){return"<option value='1'>Enero</option>\n                      <option value='2'>Febrero</option>\n                      <option value='3'>Marzo</option>\n                      <option value='4'>Abril</option>\n                      <option value='5'>Mayo</option>\n                      <option value='6'>Junio</option>\n                      <option value='7'>Julio</option>\n                      <option value='8'>Agosto</option>\n                      <option value='9'>Septiembre</option>\n                      <option value='10'>Octubre</option>\n                      <option value='11'>Noviembre</option>\n                      <option value='12'>Diciembre</option>"},ComboAnio:function(){return"<option value='2017'>2017</option>\n                      <option value='2018'>2018</option>\n                      <option value='2019'>2019</option>\n                      <option value='2020'>2020</option>\n                      <option value='2021'>2021</option>\n                      <option value='2022'>2022</option>\n                      <option value='2023'>2023</option>\n                      <option value='2024'>2024</option>\n                      <option value='2025'>2025</option>\n                      <option value='2026'>2026</option>\n                      <option value='2027'>2027</option>\n                      <option value='2028'>2028</option>\n                      <option value='2029'>2029</option>\n                      <option value='2030'>2030</option>"},getFecha:function(){var e=new Date,t=e.getDate(),a=e.getUTCMonth()+1;switch(t.toString()){case"30":case"31":a=e.getMonth()+1}var n="0"+t,c="0"+a;return e.getFullYear()+"-"+(3==c.length?a:c)+"-"+(3==n.length?t:n)},devuelveFecha:function(e){var t=new Date(document.getElementById(e).value);return t.getFullYear()+"-"+(t.getUTCMonth()+1)+"-"+t.getUTCDate()},exportTableToExcel:function(e){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="application/vnd.ms-excel;charset=UTF-8",c=document.getElementById(e),o=c.outerHTML.replace(/ /g,"%20");if(a=a?a+".xls":"excel_data.xlsx",t=document.createElement("a"),document.body.appendChild(t),navigator.msSaveOrOpenBlob){var s=new Blob(["ufeff",o],{type:"text/plain;charset=utf-8;"});navigator.msSaveOrOpenBlob(s,a)}else t.href="data:"+n+", "+o,t.download=a,t.click()},getHora:function(){var e=new Date,t=e.getHours(),a=e.getMinutes();return"".concat(t.toString(),":").concat(a.toString())},gotoGoogleMaps:function(e,t){window.open("https://www.google.com/maps?q=".concat(e,",").concat(t))}},v=O,g=a(0),f=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).menu=c.a.createRef(),n.state={empresas:[],menu:"circular-menu",loading:!1},n}return Object(r.a)(a,[{key:"render",value:function(){return Object(g.jsx)("div",{children:Object(g.jsxs)("h3",{className:"text-info",children:[Object(g.jsx)("i",{className:"fas fa-spinner fa-spin"})," \xa0Cargando datos..."]})})}}]),a}(n.Component),x=a(27),N=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).onLogout=function(){n.props.vista("LOGIN")},n.onGetMenu=function(e){n.props.vista(e)},n.onGetEmpresa=function(e){n.props.empnit(e),n.props.vista("ANALISIS_EMPRESA")},n.toggleMenu=function(){var e="";e="circular-menu"===n.state.menu?"circular-menu active":"circular-menu",n.setState({menu:e})},n.rand=function(){return Math.floor(255*Math.random())},n.handleClick=function(e){var t=n.Pie.getChart();console.log(t.getElementsAtEvent(e))},n.state={empresas:[],menu:"circular-menu",loading:!1},n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),h.a.get("".concat("https://mercadosefectivos-bi-api.herokuapp.com","/getempresas")).then((function(t){var a=t.data.recordset;e.setState({empresas:a,loading:!1})})).catch((function(){e.setState({loading:!1})}))}},{key:"render",value:function(){var e=this,t=[],a=[],n=[];this.state.empresas.map((function(c){t.push(c.EMPNIT),a.push(Number(c.VENTAS)),n.push("rgb(".concat(e.rand(),", ").concat(e.rand(),", ").concat(e.rand(),")"))}));var c={labels:t,datasets:[{data:a,backgroundColor:n,borderWidth:1}]};return 1==this.state.loading?Object(g.jsx)(f,{}):Object(g.jsxs)("div",{children:[Object(g.jsx)("div",{className:"row",children:this.state.empresas.map((function(t){return Object(g.jsx)("div",{className:"col-sm-12 col-md-6 col-lg-6 col-xl-6",children:Object(g.jsx)("div",{className:"card border-top-rounded border-bottom-rounded shadow hand p-10 mb-3 px-3 text-secondary border-secondary ",onClick:function(){e.onGetEmpresa(t.EMPNIT)},children:Object(g.jsxs)("div",{className:"card-body",children:[Object(g.jsxs)("div",{className:"row",children:[Object(g.jsx)("div",{className:"col-3",children:Object(g.jsx)("img",{src:"./favicon.png",width:"50",height:"50"})}),Object(g.jsxs)("div",{className:"col-9",children:[Object(g.jsx)("br",{}),Object(g.jsx)("h3",{className:"text-secondary",children:t.NOMBRE})]})]}),Object(g.jsxs)("div",{className:"row border-bottom border-gris",children:[Object(g.jsx)("div",{className:"col-4",children:Object(g.jsx)("label",{children:"Ventas:"})}),Object(g.jsx)("div",{className:"col-8",children:Object(g.jsx)("label",{children:Object(g.jsx)("b",{children:v.setMoneda(t.VENTAS,"Q")})})})]}),Object(g.jsxs)("div",{className:"row border-bottom border-gris",children:[Object(g.jsx)("div",{className:"col-4",children:Object(g.jsx)("label",{children:"Costo:"})}),Object(g.jsx)("div",{className:"col-8",children:Object(g.jsx)("label",{children:Object(g.jsx)("b",{children:v.setMoneda(t.COSTO,"Q")})})})]}),Object(g.jsxs)("div",{className:"row border-bottom border-gris",children:[Object(g.jsx)("div",{className:"col-3",children:Object(g.jsx)("label",{children:"Utilidad:"})}),Object(g.jsx)("div",{className:"col-7",children:Object(g.jsx)("label",{children:Object(g.jsx)("b",{children:v.setMoneda(t.UTILIDAD,"Q")})})}),Object(g.jsx)("div",{className:"col-2",children:Object(g.jsx)("label",{className:"text-danger",children:Object(g.jsx)("b",{children:v.setPorcentaje(t.MARGEN,"%")})})})]})]})})},t.EMPNIT)}))}),Object(g.jsx)("div",{className:"card col-12 p-4",children:Object(g.jsx)("h5",{className:"text-info"})}),Object(g.jsx)(x.b,{data:c,options:{legend:{display:!0,position:"right"},onClick:function(e,t){try{e.chart.legend.legendItems.map((function(e){e.index==t[0].element.$context.dataIndex&&(console.log(e.text),console.log(t[0].element.$context.parsed))}))}catch(a){}}}}),Object(g.jsx)("div",{}),Object(g.jsxs)("div",{className:this.state.menu,children:[Object(g.jsx)("a",{className:"floating-btn",onClick:function(){e.toggleMenu()},children:Object(g.jsx)("i",{className:"fas fa-plus"})}),Object(g.jsxs)("menu",{className:"items-wrapper",children:[Object(g.jsx)("a",{href:"#","data-toggle":"tooltip","data-placement":"left",title:"An\xe1lisis de Productos",className:"menu-item  fas fa-box",onClick:function(){e.onGetMenu("ANALISIS_PRODUCTOS")},children:"P"}),Object(g.jsx)("a",{href:"#","data-toggle":"tooltip","data-placement":"left",title:"An\xe1lisis de Marcas",className:"menu-item  fas fa-briefcase",onClick:function(){e.onGetMenu("ANALISIS_MARCAS")},children:"M"}),Object(g.jsx)("a",{href:"#","data-toggle":"tooltip","data-placement":"left",title:"An\xe1lisis por Municipio",className:"menu-item  fas fa-map-marker-alt",onClick:function(){e.onGetMenu("ANALISIS_MAPA")},children:"U"}),Object(g.jsx)("a",{href:"#","data-toggle":"tooltip","data-placement":"left",title:"Historial",className:"menu-item  fas fa-chart-line",onClick:function(){e.onGetMenu("ANALISIS_HISTORICO")},children:"H"})]})]})]})}}]),a}(n.Component),M=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).user=c.a.createRef(),n.pass=c.a.createRef(),n.login=n.login.bind(Object(l.a)(n)),n.state={vista:"LOGIN"},n}return Object(r.a)(a,[{key:"login",value:function(){this.setState({vista:"INICIO"})}},{key:"render",value:function(){return"LOGIN"==this.state.vista?Object(g.jsx)("div",{className:"card col-sm-12 col-md-4 col-lg-4 col-xl-3 shadow",children:Object(g.jsxs)("div",{className:"card-body",children:[Object(g.jsx)("div",{className:"form-group text-center",children:Object(g.jsx)("img",{src:"./favicon.png",width:"50",height:"50"})}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("label",{children:"Usuario"}),Object(g.jsx)("input",{ref:this.user,type:"text",className:"form-control",placeholder:"Escriba su Usuario"})]}),Object(g.jsxs)("div",{className:"form-group",children:[Object(g.jsx)("label",{children:"Usuario"}),Object(g.jsx)("input",{ref:this.pass,type:"password",className:"form-control",placeholder:"Escriba su Contrase\xf1a",id:"txtPass"})]}),Object(g.jsx)("div",{className:"form-group",children:Object(g.jsx)("button",{className:"btn btn-info text-white shadow btn-lg",onClick:this.login,children:"Ingresar"})})]})}):Object(g.jsx)(y,{user:this.user.current.value,vista:"INICIO"})}}]),a}(n.Component),S=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).setBack=function(){n.props.vista("INICIO")},n.state={},n}return Object(r.a)(a,[{key:"render",value:function(){return Object(g.jsx)("div",{className:"circular-menu",children:Object(g.jsx)("a",{className:"floating-btn",onClick:this.setBack,children:Object(g.jsx)("i",{className:"fas fa-home"})})})}}]),a}(n.Component),I="https://mercadosefectivos-bi-api.herokuapp.com",C=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).getDataMarca=function(e,t){n.setState({chartvisible:!1,codmarca:e,desmarca:t}),n.getMarcaDetalles()},n.getTblMarcas=function(){n.setState({loading:!0}),h.a.get("".concat(I,"/getmarcas?empnit=").concat(n.props.empnit,"&anio=",2021,"&mes=",9)).then((function(e){var t=e.data.recordset;n.setState({tblMarcas:t,loading:!1})})).catch((function(){n.setState({tblMarcas:[],loading:!1})}))},n.getMarcaDetalles=function(){n.setState({loading:!0}),h.a.get("".concat(I,"/getmarcasfecha?empnit=").concat(n.props.empnit,"&anio=",2021,"&mes=",9,"&codmarca=").concat(n.state.codmarca)).then((function(e){var t=e.data.recordset;n.setState({tblMarcaFechas:t,loading:!1})})).catch((function(){n.setState({tblMarcaFechas:[],loading:!1})})),h.a.get("".concat(I,"/getmarcasmunicipio?empnit=").concat(n.props.empnit,"&anio=",2021,"&mes=",9,"&codmarca=").concat(n.state.codmarca)).then((function(e){var t=e.data.recordset;n.setState({tblMarcaMunicipios:t,loading:!1})})).catch((function(){n.setState({tblMarcaMunicipios:[],loading:!1})})),h.a.get("".concat(I,"/getmarcasvendedor?empnit=").concat(n.props.empnit,"&anio=",2021,"&mes=",9,"&codmarca=").concat(n.state.codmarca)).then((function(e){var t=e.data.recordset;n.setState({tblMarcaVendedores:t,loading:!1})})).catch((function(){n.setState({tblMarcaVendedores:[],loading:!1})}))},n.setBack=function(){n.props.vista("INICIO")},n.rand=function(){return Math.floor(255*Math.random())},n.state={loading:!1,chartvisible:!0,codmarca:0,desmarca:"",universo:0,tblMarcas:[],tblMarcaMunicipios:[],tblMarcaVendedores:[],tblMarcaFechas:[]},n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.getTblMarcas()}},{key:"render",value:function(){var e=this,t=this.state.tblMarcas,a=[],n=[],c=[];this.state.tblMarcas.map((function(t){a.push(t.DESMARCA),n.push(Number(t.TOTALPRECIO)),c.push("rgb(".concat(e.rand(),", ").concat(e.rand(),", ").concat(e.rand(),")"))}));var o={labels:a,datasets:[{data:n,backgroundColor:c,borderWidth:1}]};return 1==this.state.chartvisible?Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{className:"row",children:[Object(g.jsxs)("div",{className:"card shadow border-top-rounded border-bottom-rounded col-sm-12 col-md-6 col-xl-6 col-lg-6",children:[Object(g.jsxs)("div",{className:"card-header",children:[Object(g.jsx)("h3",{children:"Ventas por Marca"}),Object(g.jsx)("button",{className:"btn btn-outline-secondary btn-md btn-circle",onClick:function(){e.getTblMarcas()},children:Object(g.jsx)("i",{className:"fas fa-sync"})})]}),Object(g.jsx)("div",{className:"card-body",children:Object(g.jsx)(x.a,{height:400,data:o,options:{indexAxis:"y",legend:{display:!0,position:"right"},onClick:function(e,t){try{e.chart.legend.legendItems.map((function(e){e.index==t[0].element.$context.dataIndex&&(console.log(e.text),console.log(t[0].element.$context.parsed))}))}catch(a){}}}})})]}),Object(g.jsx)("div",{className:"card shadow border-top-rounded border-bottom-rounded col-sm-12 col-md-6 col-xl-6 col-lg-6",children:Object(g.jsx)("div",{className:"table-responsive",children:Object(g.jsxs)("table",{className:"table table-hover ",children:[Object(g.jsx)("thead",{className:"bg-secondary text-white ",children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("td",{children:"Marca"}),Object(g.jsx)("td",{children:"Importe"})]})}),Object(g.jsx)("tbody",{children:t.map((function(t){return Object(g.jsxs)("tr",{className:"hand",onClick:function(){e.getDataMarca(t.CODMARCA,t.DESMARCA)},children:[Object(g.jsx)("td",{children:t.DESMARCA}),Object(g.jsx)("td",{children:v.setMoneda(t.TOTALPRECIO,"Q")})]},"row-".concat(t.CODMARCA))}))})]})})})]}),Object(g.jsx)("div",{className:"",children:Object(g.jsx)(S,{vista:this.setBack})})]}):Object(g.jsxs)("div",{children:[Object(g.jsxs)("div",{className:"card shadow border-top-rounder",children:[Object(g.jsxs)("div",{className:"card-header bg-secondary text-white",children:[Object(g.jsxs)("h3",{children:["Detalle de la Marca ",this.state.desmarca]}),Object(g.jsxs)("button",{className:"btn btn-sm btn-secondary border-white",onClick:function(){e.setState({chartvisible:!0})},children:[Object(g.jsx)("i",{className:"fas fa-arrow-left"}),"Regresar"]})]}),Object(g.jsx)("div",{className:"card-body",children:Object(g.jsx)("ul",{children:this.state.tblMarcaMunicipios.map((function(e){return"<li>".concat(e.MUNICIPIO,"</li>")}))})})]}),Object(g.jsx)(S,{vista:this.setBack})]})}}]),a}(n.Component),A=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).setBack=function(){n.props.vista("INICIO")},n.state={tblMarcas:[]},n}return Object(r.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(g.jsxs)("div",{children:[Object(g.jsx)("h3",{children:"An\xe1lisis por Marcas"}),Object(g.jsx)(S,{vista:this.setBack})]})}}]),a}(c.a.Component),y=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).setEmpnit=function(e){n.setState({empnit:e})},n.setVista=n.setVista.bind(Object(l.a)(n)),n.state={vista:n.props.vista,empnit:n.props.empnit},n}return Object(r.a)(a,[{key:"setVista",value:function(e){console.log(e),this.setState({vista:e})}},{key:"render",value:function(){switch(this.state.vista){case"LOGIN":return Object(g.jsx)(M,{usuario:""});case"INICIO":return Object(g.jsx)(N,{usuario:this.props.user,vista:this.setVista,empnit:this.setEmpnit});case"ANALISIS_EMPRESA":return Object(g.jsx)(C,{empnit:this.state.empnit,vista:this.setVista});case"ANALISIS_PRODUCTOS":return Object(g.jsx)("h2",{children:"Navegando a PRODUCTOS"});case"ANALISIS_MARCAS":return Object(g.jsx)(A,{vista:this.setVista});case"ANALISIS_MAPA":return Object(g.jsx)("h2",{children:"'Navegando a MAPA'"});case"ANALISIS_HISTORICO":return Object(g.jsx)("h2",{children:"'Navegando a HISTORICO'"})}}}]),a}(n.Component),w=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,209)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,o=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),o(e),s(e)}))};s.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(y,{vista:"LOGIN"})}),document.getElementById("root")),w()}},[[208,1,2]]]);
//# sourceMappingURL=main.eaf03df0.chunk.js.map