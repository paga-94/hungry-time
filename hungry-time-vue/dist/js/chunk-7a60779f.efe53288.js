(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a60779f"],{"11c8":function(t,r,e){"use strict";var n=e("473f"),s=e.n(n);s.a},"1a6b":function(t,r,e){"use strict";e.r(r);var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ul",{staticClass:"user"},[e("li",{staticClass:"user-profiles-list-minimal"},[t._m(0),e("p",{staticClass:"user-name"},[e("a",{on:{click:t.paginaPersonale}},[t._v(t._s(t.currentUser.username))]),e("br"),e("a",{staticClass:"nav-link",attrs:{href:""},on:{click:function(r){return r.preventDefault(),t.logOut(r)}}},[t._v(" Logout ")])])])])},s=[function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"user-avatar"},[n("a",{attrs:{href:"#"}},[n("img",{attrs:{src:e("926e"),width:"41",alt:"Profile of Tracey Parker"}})])])}],a=(e("caad"),e("2532"),{name:"user-minimal",computed:{currentUser:function(){return this.$store.state.auth.user}},mounted:function(){this.currentUser||this.$router.push("/login")},methods:{logOut:function(){this.$store.dispatch("auth/logout"),this.$router.push("/")},paginaPersonale:function(){if(this.currentUser.roles.includes("ROLE_UTENTE")){var t=this.currentUser.id;this.$router.push({name:"paginaUtente",params:{idUtente:t}})}else if(this.currentUser.roles.includes("ROLE_RISTORATORE")){var r=this.currentUser.idRistorante;this.$router.push({name:"paginaRistoratore",params:{IDristorante:r}})}}}}),i=a,u=(e("11c8"),e("2877")),c=Object(u["a"])(i,n,s,!1,null,"50b6d166",null);r["default"]=c.exports},2532:function(t,r,e){"use strict";var n=e("23e7"),s=e("5a34"),a=e("1d80"),i=e("ab13");n({target:"String",proto:!0,forced:!i("includes")},{includes:function(t){return!!~String(a(this)).indexOf(s(t),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,r,e){var n=e("861d"),s=e("c6b6"),a=e("b622"),i=a("match");t.exports=function(t){var r;return n(t)&&(void 0!==(r=t[i])?!!r:"RegExp"==s(t))}},"473f":function(t,r,e){},"5a34":function(t,r,e){var n=e("44e7");t.exports=function(t){if(n(t))throw TypeError("The method doesn't accept regular expressions");return t}},"926e":function(t,r,e){t.exports=e.p+"img/5.00647cf4.jpg"},ab13:function(t,r,e){var n=e("b622"),s=n("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[s]=!1,"/./"[t](r)}catch(n){}}return!1}}}]);
//# sourceMappingURL=chunk-7a60779f.efe53288.js.map