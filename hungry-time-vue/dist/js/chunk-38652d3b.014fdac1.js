(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38652d3b"],{"2c2e":function(t,a,e){t.exports=e.p+"img/ristorante.1d25685e.jpg"},"3a2b":function(t,a,e){"use strict";var n=e("d4ec"),s=e("bee2"),o=e("c427"),i=function(){function t(){Object(n["a"])(this,t)}return Object(s["a"])(t,[{key:"getAll",value:function(){return o["a"].get("/home")}},{key:"getID",value:function(t){return o["a"].get("/ristorante/".concat(t))}},{key:"getByNome",value:function(t){return o["a"].get("/cerca?nome=".concat(t))}},{key:"aggiornaRistorante",value:function(t,a){return o["a"].put("/ristoratore/".concat(t),a)}}]),t}();a["a"]=new i},"85c0":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{attrs:{id:"about","data-stellar-background-ratio":"0.5"}},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6 col-sm-12"},[e("div",{staticClass:"about-info"},[e("div",{staticClass:"section-title wow fadeInUp",attrs:{"data-wow-delay":"0.2s"}},[e("h1",[t._v(t._s(t.Ristorante.nome))]),e("h2",[t._v("descrizione")])]),e("div",{staticClass:"wow fadeInUp",attrs:{"data-wow-delay":"0.4s"}},[e("p",[t._v(t._s(t.Ristorante.descrizione))])]),e("router-view",{attrs:{name:"nPersone"}})],1)]),t._m(0)])]),e("router-view",{attrs:{name:"menu"}})],1)},s=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"col-md-6 col-sm-12"},[n("div",{staticClass:"wow fadeInUp about-image",attrs:{"data-wow-delay":"0.6s"}},[n("img",{staticClass:"img-responsive",attrs:{src:e("2c2e"),alt:""}})])])}],o=e("3a2b"),i={name:"pagina-ristorante",data:function(){return{Ristorante:{}}},mounted:function(){this.risto()},methods:{risto:function(){var t=this;o["a"].getID(this.$route.params.IDristorante).then((function(a){t.Ristorante=a.data,console.log(a.data)})).catch((function(t){console.log(t)}))}},watch:{"$route.params.IDristorante":function(){this.risto()}}},r=i,c=e("2877"),u=Object(c["a"])(r,n,s,!1,null,"5bd52f75",null);a["default"]=u.exports},c427:function(t,a,e){"use strict";var n=e("bc3a"),s=e.n(n);a["a"]=s.a.create({baseURL:"http://localhost:8080/api",headers:{"Content-type":"application/json"}})}}]);
//# sourceMappingURL=chunk-38652d3b.014fdac1.js.map