(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-273a8ca0"],{"159b":function(t,i,a){var e=a("da84"),n=a("fdbc"),o=a("17c2"),r=a("9112");for(var s in n){var c=e[s],l=c&&c.prototype;if(l&&l.forEach!==o)try{r(l,"forEach",o)}catch(u){l.forEach=o}}},"17c2":function(t,i,a){"use strict";var e=a("b727").forEach,n=a("a640"),o=a("ae40"),r=n("forEach"),s=o("forEach");t.exports=r&&s?[].forEach:function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,i,a){"use strict";var e=a("23e7"),n=a("17c2");e({target:"Array",proto:!0,forced:[].forEach!=n},{forEach:n})},4281:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{attrs:{id:"footer","data-stellar-background-ratio":"0.5"}},[a("div",{staticClass:"container"},[a("h1",[t._v("MENU")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-3 col-sm-8"},[a("div",{staticClass:"footer-info"},[a("div",{staticClass:"section-title"},[a("h2",{staticClass:"wow fadeInUp",attrs:{"data-wow-delay":"0.2s"}},[t._v("Antipasti")]),a("ul",t._l(t.piatti.antipasti,(function(i){return a("li",{key:i},[a("strong",[t._v(t._s(i.nome))]),a("div",{attrs:{align:"right"}},[t._v("€ "+t._s(i.prezzo))])])})),0)])])]),a("div",{staticClass:"col-md-3 col-sm-8"},[a("div",{staticClass:"footer-info"},[a("div",{staticClass:"section-title"},[a("h2",{staticClass:"wow fadeInUp",attrs:{"data-wow-delay":"0.2s"}},[t._v("Primi")]),a("ul",t._l(t.piatti.primi,(function(i){return a("li",{key:i},[a("strong",[t._v(t._s(i.nome))]),a("div",{attrs:{align:"right"}},[t._v("€ "+t._s(i.prezzo))])])})),0)])])]),a("div",{staticClass:"col-md-3 col-sm-8"},[a("div",{staticClass:"footer-info"},[a("div",{staticClass:"section-title"},[a("h2",{staticClass:"wow fadeInUp",attrs:{"data-wow-delay":"0.2s"}},[t._v("Secondi/Contorni")]),a("ul",t._l(t.piatti.secondi,(function(i){return a("li",{key:i},[a("strong",[t._v(t._s(i.nome))]),a("div",{attrs:{align:"right"}},[t._v("€ "+t._s(i.prezzo))])])})),0)])])]),a("div",{staticClass:"col-md-3 col-sm-8"},[a("div",{staticClass:"footer-info"},[a("div",{staticClass:"section-title"},[a("h2",{staticClass:"wow fadeInUp",attrs:{"data-wow-delay":"0.2s"}},[t._v("Dolci")]),a("ul",t._l(t.piatti.dolci,(function(i){return a("li",{key:i},[a("strong",[t._v(t._s(i.nome))]),a("div",{attrs:{align:"right"}},[t._v("€ "+t._s(i.prezzo))])])})),0)])])])])])])},n=[],o=(a("4160"),a("159b"),a("49f6")),r={name:"menuSenzaScelta",data:function(){return{piatti:{antipasti:[],primi:[],secondi:[],dolci:[]}}},mounted:function(){this.trovaPiatti()},methods:{trovaPiatti:function(){var t=this;o["a"].getByRistorante(this.$route.params.IDristorante).then((function(i){var a=i.data;a.forEach((function(i){switch(console.log(i),String(i.tipo)){case"antipasto":t.piatti.antipasti.push(i);break;case"primo":t.piatti.primi.push(i);break;case"secondo":t.piatti.secondi.push(i);break;case"dolce":t.piatti.dolci.push(i);break}})),console.log(i.data)})).catch((function(t){console.log(t)}))},cancellaPiatti:function(){this.piatti={antipasti:[],primi:[],secondi:[],dolci:[]}}},watch:{"$route.params.IDristorante":function(){this.cancellaPiatti(),this.trovaPiatti()}}},s=r,c=a("2877"),l=Object(c["a"])(s,e,n,!1,null,"86fecb52",null);i["default"]=l.exports},"49f6":function(t,i,a){"use strict";var e=a("d4ec"),n=a("bee2"),o=a("c427"),r=function(){function t(){Object(e["a"])(this,t)}return Object(n["a"])(t,[{key:"getByRistorante",value:function(t){return o["a"].get("/ristorante/".concat(t,"/piatti"))}},{key:"deleteById",value:function(t){return o["a"].delete("/piatto/".concat(t))}},{key:"creaPiatto",value:function(t){return o["a"].post("/ristoratore/aggiungiPiatto",t)}},{key:"updatebyRistorante",value:function(t,i){return o["a"].put("ristoratore/".concat(t,"/piatti"),i)}}]),t}();i["a"]=new r},"65f0":function(t,i,a){var e=a("861d"),n=a("e8b5"),o=a("b622"),r=o("species");t.exports=function(t,i){var a;return n(t)&&(a=t.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?e(a)&&(a=a[r],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===i?0:i)}},a640:function(t,i,a){"use strict";var e=a("d039");t.exports=function(t,i){var a=[][t];return!!a&&e((function(){a.call(null,i||function(){throw 1},1)}))}},b727:function(t,i,a){var e=a("0366"),n=a("44ad"),o=a("7b0b"),r=a("50c4"),s=a("65f0"),c=[].push,l=function(t){var i=1==t,a=2==t,l=3==t,u=4==t,f=6==t,d=5==t||f;return function(p,v,h,m){for(var y,g,w=o(p),b=n(w),L=e(v,h,3),C=r(b.length),_=0,S=m||s,k=i?S(p,C):a?S(p,0):void 0;C>_;_++)if((d||_ in b)&&(y=b[_],g=L(y,_,w),t))if(i)k[_]=g;else if(g)switch(t){case 3:return!0;case 5:return y;case 6:return _;case 2:c.call(k,y)}else if(u)return!1;return f?-1:l||u?u:k}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},c427:function(t,i,a){"use strict";var e=a("bc3a"),n=a.n(e);i["a"]=n.a.create({baseURL:"http://localhost:8080/api",headers:{"Content-type":"application/json"}})},e8b5:function(t,i,a){var e=a("c6b6");t.exports=Array.isArray||function(t){return"Array"==e(t)}},fdbc:function(t,i){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-273a8ca0.fd0ac11b.js.map