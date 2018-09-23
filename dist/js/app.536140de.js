(function(t){function e(e){for(var o,n,a=e[0],l=e[1],u=e[2],d=0,p=[];d<a.length;d++)n=a[d],i[n]&&p.push(i[n][0]),i[n]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);c&&c(e);while(p.length)p.shift()();return r.push.apply(r,u||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],o=!0,a=1;a<s.length;a++){var l=s[a];0!==i[l]&&(o=!1)}o&&(r.splice(e--,1),t=n(n.s=s[0]))}return t}var o={},i={app:0},r=[];function n(e){if(o[e])return o[e].exports;var s=o[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=o,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(s,o,function(e){return t[e]}.bind(null,o));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=e,a=a.slice();for(var u=0;u<a.length;u++)e(a[u]);var c=l;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"18aa":function(t,e,s){"use strict";var o=s("9245"),i=s.n(o);i.a},2267:function(t,e,s){},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("097d");var o=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("Notifs"),s("Header"),s("router-view"),s("Footer")],1)},r=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("Shops")],1)},a=[],l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"shops"},[s("FilterShop"),s("div",{staticClass:"container"},[s("h2",[t._v("Shops from our DB")]),s("div",{staticClass:"row"},t._l(t.loadShops,function(e){return s("div",{key:e.id,staticClass:"col-md-4"},[s("div",{staticClass:"box"},[s("h3",[t._v(t._s(e.name)+" "),s("span",[t._v("Votes: "+t._s(e.vote_count))])]),t._m(0,!0),s("div",{staticClass:"box_foot"},[s("address",[t._v(t._s(e.address))]),s("div",{staticClass:"like_duskike"},[s("span",[s("i",{staticClass:"material-icons ",on:{click:function(s){t.Like(e.id)}}},[t._v("\n                                       favorite_border\n                                       ")])]),s("span",[s("i",{staticClass:"material-icons ",class:1==e.shops_i_hate?"disliked":"waiting",on:{click:function(s){t.disLike(e.id)}}},[t._v("\n                                       sentiment_very_dissatisfied\n                                       ")]),s("small",[t._v(t._s(e.dislikes_count))])])]),s("p",[t._v("Distance : "),s("b",[t._v(t._s(e.distance))]),t._v(" km")])])])])}))])],1)},u=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"imgs"},[s("img",{attrs:{src:"https://www.soc.tas.edu.au/wp-content/uploads/college-shop-internal.jpg",alt:""}})])}],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"filter"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.distance,expression:"distance"}],attrs:{placeholder:"filter by distance ex:{ 20 } km ",type:"text"},domProps:{value:t.distance},on:{input:[function(e){e.target.composing||(t.distance=e.target.value)},t.getDistance]}}),s("span",{directives:[{name:"show",rawName:"v-show",value:t.showReset,expression:"showReset"}]},[s("i",{staticClass:"material-icons",on:{click:function(e){t.ResetFilter()}}},[t._v("\n                          sync_disabled\n                          ")])])])},d=[],p=(s("7f7f"),{name:"FilterShop",data:function(){return{distance:"",showReset:!1,dataArray:[],url:"/shops"}},methods:{getDistance:function(){"PreferredShop"==this.$options.parent.$options.name&&(this.url="/account/preferred"),this.showReset=!0,this.distance>0&&(this.dataArray={distance:this.distance,url:this.url+"/"}),this.$store.dispatch("FilterShops",this.dataArray,this.url)},ResetFilter:function(){"PreferredShop"==this.$options.parent.$options.name?this.$store.dispatch("PreferredShop"):this.$store.dispatch("loadShops"),this.showReset=!this.showReset,this.distance=""}}}),h=p,f=s("2877"),m=Object(f["a"])(h,c,d,!1,null,null,null);m.options.__file="shopFilter.vue";var v=m.exports,g={name:"Shops",components:{FilterShop:v},mounted:function(){this.$store.dispatch("loadShops")},data:function(){return{dislikedShop:!1,dataArray:[]}},computed:{loadShops:function(){return this.$store.getters.loadShops}},methods:{Like:function(t){if(!this.$store.getters.isAuth)return!1;this.$store.dispatch("likeShop",t)},disLike:function(t){if(!this.$store.getters.isAuth)return!1;this.dataArray={id:t,dislike:this.dislikedShop},this.$store.dispatch("disLikeShop",this.dataArray)}}},_=g,S=Object(f["a"])(_,l,u,!1,null,null,null);S.options.__file="Shops.vue";var b=S.exports,w={name:"Home",components:{Shops:b}},k=w,R=Object(f["a"])(k,n,a,!1,null,null,null);R.options.__file="ShopiYa.vue";var y=R.exports,E=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",[s("Navbar"),t._m(0),s("Loading")],1)},O=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("hgroup",[s("h1",[t._v("Shop"),s("strong",[t._v("Yo")])]),s("span",[t._v("Laravel & VueJS Based")])])}],$=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",[s("ul",[s("li",[s("router-link",{attrs:{to:"/"}},[t._v("All Shops")])],1),t.isAuth?s("li",[s("router-link",{attrs:{to:"preferred"}},[t._v("My Preferred Shops")])],1):t._e(),t.isAuth?s("li",[s("router-link",{attrs:{to:"logout"}},[t._v("Logout")])],1):t._e(),t.isAuth?t._e():s("li",[s("router-link",{attrs:{to:"login"}},[t._v("Login")])],1),t.isAuth?t._e():s("li",[s("router-link",{attrs:{to:"register"}},[t._v("Register")])],1)])])},C=[],L={name:"NavBar",computed:{isAuth:function(){return this.$store.getters.isAuth}}},N=L,A=Object(f["a"])(N,$,C,!1,null,null,null);A.options.__file="Navbar.vue";var P=A.exports,x=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"lds-ring"},[s("div"),s("div"),s("div"),s("div")]),t._v("\r\n    "+t._s(t.isLoading)+"\r\n")])},T=[],I={name:"Loading",computed:{isLoading:function(){return this.$store.getters.isLoading}}},j=I,F=(s("18aa"),Object(f["a"])(j,x,T,!1,null,null,null));F.options.__file="spinner.vue";var D=F.exports,H={name:"Header",components:{Navbar:P,Loading:D}},K=H,U=Object(f["a"])(K,E,O,!1,null,null,null);U.options.__file="header.vue";var B=U.exports,G=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},M=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",[s("div",{staticClass:"copyright-info"},[s("strong",[t._v("Ayoub Bousetta")]),s("br"),t._v("Copyright - 2018 Limited.")])])}],Y={name:"Footer"},q=Y,z=Object(f["a"])(q,G,M,!1,null,null,null);z.options.__file="footer.vue";var V=z.exports,J=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.msgNotif?s("div",{directives:[{name:"show",rawName:"v-show",value:!t.hideShow,expression:"!hideShow"}],staticClass:"alert",class:"success"==t.msgNotif[1]?"success":"error"},[s("p",{domProps:{innerHTML:t._s(t.msgNotif[0])}}),s("i",{staticClass:"material-icons",on:{click:t.KillNotifications}},[t._v("\n            clear\n            ")])]):t._e()},W=[],Q=(s("456d"),s("ac6a"),{name:"Notifs",data:function(){return{msg:"",killit:!1}},methods:{KillNotifications:function(){this.$store.dispatch("KillNotifications")}},computed:{hideShow:function(){return this.killit=this.$store.getters.isKillNotifications},msgNotif:function(){var t=this;return"undefined"!==this.$store.getters.Errors&&null!=this.$store.getters.Errors?(Object.keys(this.$store.getters.Errors).forEach(function(){t.msg=t.$store.getters.Errors}),this.msg):this.msg}}}),X=Q,Z=(s("da17"),Object(f["a"])(X,J,W,!1,null,null,null));Z.options.__file="notifications.vue";var tt=Z.exports,et={name:"app",components:{Home:y,Header:B,Footer:V,Notifs:tt}},st=et,ot=(s("c740"),Object(f["a"])(st,i,r,!1,null,"556ce879",null));ot.options.__file="App.vue";var it=ot.exports,rt=(s("5aea"),s("8c4f")),nt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"login"},[s("div",{staticClass:"container"},[s("div",{staticClass:"title_form"},[s("h2",[t._v("Login")]),s("span",[t._v("No Account yet? : "),s("router-link",{attrs:{to:"register"}},[t._v("Create one")])],1)]),s("form",{on:{submit:function(e){return e.preventDefault(),t.logMein(e)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"usr"}},[t._v("Email:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",autocomplete:"",id:"usr"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"pwd"}},[t._v("Password:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",autocomplete:"",id:"pwd"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._m(0)])])])},at=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("button",[t._v("Login")])])}],lt={name:"LogForm",data:function(){return{email:"aubbusta@gmail.com",password:"your password",dataArray:[]}},mounted:function(){this.$store.dispatch("KillNotifications")},methods:{logMein:function(){var t=this;this.dataArray={email:this.email,password:this.password},this.$store.dispatch("AuthRequest",this.dataArray).then(function(){"success"==t.$store.getters.Errors[1]&&t.$router.push("/")})}}},ut=lt,ct=Object(f["a"])(ut,nt,at,!1,null,null,null);ct.options.__file="loginForm.vue";var dt=ct.exports,pt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"login"},[s("div",{staticClass:"container"},[s("div",{staticClass:"title_form"},[s("h2",[t._v("Register ")]),s("span",[t._v("You already ? : "),s("router-link",{attrs:{to:"login"}},[t._v("have one")])],1)]),s("form",{on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"usr"}},[t._v("Email:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",autocomplete:"",id:"usr"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"pwd"}},[t._v("Password:")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",autocomplete:"",id:"pwd"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._m(0)])])])},ht=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"form-group"},[s("button",[t._v("Create Account")])])}],ft={name:"RegForm",data:function(){return{email:"aubbusta@gmail.com",password:"your password",dataArray:[]}},methods:{register:function(){var t=this;this.dataArray={email:this.email,password:this.password},this.$store.dispatch("RegisterUser",this.dataArray).then(function(){"success"==t.$store.getters.Errors[1]&&t.$router.push("/login")})}}},mt=ft,vt=Object(f["a"])(mt,pt,ht,!1,null,null,null);vt.options.__file="regForm.vue";var gt=vt.exports,_t=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"regfor"})},St=[],bt={name:"LogOut",mounted:function(){this.$store.dispatch("LogOut"),this.$store.dispatch("KillNotifications"),this.$router.push("/")}},wt=bt,kt=Object(f["a"])(wt,_t,St,!1,null,null,null);kt.options.__file="Logout.vue";var Rt=kt.exports,yt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"preferred"},[s("FilterShop",{directives:[{name:"show",rawName:"v-show",value:t.shofilter,expression:"shofilter"}]}),s("div",{staticClass:"container"},[s("h2",[t._v("Shops that you liked")]),s("div",{staticClass:"row"},t._l(t.loadShops,function(e){return s("div",{key:e.id,staticClass:"col-md-4"},[s("div",{staticClass:"box"},[s("h3",[t._v(t._s(e.name)+" ")]),t._m(0,!0),s("div",{staticClass:"box_foot"},[s("address",[t._v(t._s(e.address))]),s("div",{staticClass:"like_duskike"},[s("span",[s("i",{staticClass:"material-icons",on:{click:function(s){t.remove(e.id)}}},[t._v("\n                                           remove_circle\n                                           ")])]),s("span",[s("b",[t._v(t._s(e.distance))]),t._v(" km\n                                                   ")])])])])])}))])],1)},Et=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"imgs"},[s("img",{attrs:{src:"https://www.soc.tas.edu.au/wp-content/uploads/college-shop-internal.jpg",alt:""}})])}],Ot={name:"PreferredShop",components:{FilterShop:v},mounted:function(){this.$store.dispatch("PreferredShop"),this.$store.dispatch("KillNotifications")},data:function(){return{shofilter:!1}},computed:{loadShops:function(){if("undefined"!=this.$store.getters.loadShops)return this.shofilter=!0,this.$store.getters.loadShops;this.shofilter=!1}},methods:{remove:function(t){this.$store.dispatch("likeShop",t)}}},$t=Ot,Ct=Object(f["a"])($t,yt,Et,!1,null,null,null);Ct.options.__file="Preferred.vue";var Lt=Ct.exports,Nt=[{path:"/",name:"home",component:y},{path:"/login",name:"login",component:dt,meta:{requiresVisitor:!0}},{path:"/register",name:"register",component:gt,meta:{requiresVisitor:!0}},{path:"/logout",name:"logout",component:Rt,meta:{requiresAuth:!0}},{path:"/preferred",name:"preferred",component:Lt,meta:{requiresAuth:!0}}],At=s("2f62"),Pt=s("bc3a"),xt=s.n(Pt),Tt=s("a7fe"),It=s.n(Tt);o["a"].use(At["a"]),o["a"].use(It.a,xt.a),o["a"].axios.defaults.baseURL="http://shopiyoapi.aubbusta.com/api";var jt=new At["a"].Store({state:{shops:[],likedShop:!1,Dislike:!1,loading:!1,profileUser:localStorage.getItem("user"),userInfo:[],isToken:localStorage.getItem("token"),msgType:[],notification:[],Msg:"",iskillNotif:!1},actions:{loadShops:function(t){var e=t.commit,s=t.state;e("loadingData"),xt.a.get("/shops",{headers:{Authorization:"Bearer "+s.isToken}}).then(function(t){return t.data.shops}).then(function(t){e("GET_SHOPS",t)})},FilterShops:function(t,e){var s=t.commit,o=t.state;s("loadingData"),xt.a.get(e.url+e.distance,{headers:{Authorization:"Bearer "+o.isToken}}).then(function(t){return t.data}).then(function(t){"undefined"!==typeof t.errors&&Object.keys(t.errors).length>0?(o.msg="<b>Oh_No</b> Nothing yet... ",s("ERRORS",[o.msg,"error"]),s("GET_FILTRED_SHOPS",t.shops)):(o.msg="<b>Oh_Yeay</b> Finally we found something... ",s("ERRORS",[o.msg,"success"]),s("GET_FILTRED_SHOPS",t.shops))})},PreferredShop:function(t){var e=t.commit,s=t.state;e("loadingData"),xt.a.get("/account/preferred",{headers:{Authorization:"Bearer "+s.isToken}}).then(function(t){return t.data.shops}).then(function(t){e("PREFERRED_SHOP",t)})},likeShop:function(t,e){var s=t.commit,o=t.state;s("loadingData"),xt.a.get("/account/shop/vote/"+e+"-u",{headers:{Authorization:"Bearer "+o.isToken}}).then(function(t){return t.data}).then(function(t){"delete_vote"==t.sucess?(o.msg="<b>Removed</b> But why, tell us what's wrong . ",s("ERRORS",[o.msg,"success"])):(o.msg="<b>Yeay</b> Shop added to your preferred list",s("ERRORS",[o.msg,"success"])),s("LIKE_SHOP",e)})},disLikeShop:function(t,e){var s=t.commit,o=t.state;s("loadingData"),xt.a.get("/account/shop/vote/"+e.id+"-d",{headers:{Authorization:"Bearer "+o.isToken}}).then(function(t){return t.data}).then(function(t){"delete_vote"==t.sucess?(o.msg="<b>Yeay</b> We know that it was a mistake. ",s("ERRORS",[o.msg,"success"])):(o.msg="<b>A Dislike</b> Tell us what's wrong whit this Store ",s("ERRORS",[o.msg,"success"])),s("DISlIKE_SHOP",[e.id,t.sucess])})},RegisterUser:function(t,e){var s=t.commit,o=t.state;return s("loadingData"),xt.a.post("/create",{email:e.email,password:e.password}).then(function(t){"undefined"!==typeof t.data.errors&&Object.keys(t.data.errors).length>0?(o.msg="<b>Ops</b> Email already taken! Use another one.",s("ERRORS",[o.msg,"error"])):(s("ERRORS",null),s("REGISTER_USER",t.data),o.msg="<b>Yeay</b> See you inside...",s("ERRORS",[o.msg,"success"]))})},AuthRequest:function(t,e){var s=t.commit,o=t.state;return s("loadingData"),xt.a.post("/login",{email:e.email,password:e.password}).then(function(t){"undefined"!==typeof t.data.errors&&Object.keys(t.data.errors).length>0?(o.msg="<b>Ops</b> The Email or Password doesn't match any account.",s("ERRORS",[o.msg,"error"])):(s("LOGIN",t.data),s("PROFILE",t.data.user),o.msg="<b>Yeay</b> Welcome To <strong>ShopiYa</strong>",s("ERRORS",[o.msg,"success"]))})},LogOut:function(t){var e=t.commit,s=t.state;localStorage.removeItem("token"),localStorage.removeItem("user"),localStorage.clear(),s.msg="<b>Bye</b> Hope we can see you soon",e("ERRORS",[s.msg,"success"]),e("loadingData"),e("LOGOUT")},KillNotifications:function(t){var e=t.commit;e("KILL_NOTIF")}},mutations:{GET_SHOPS:function(t,e){t.shops=e.map(function(t){return t.address=t.address.substring(0,30)+"...",t.address=t.address.toLowerCase(),t}),t.loading=!1},GET_FILTRED_SHOPS:function(t,e){var s=30;"undefined"!==typeof e&&e.length>0?t.shops=e.map(function(t){return t.address=t.address.substring(0,s)+"...",t.address=t.address.toLowerCase(),t}):t.shops=e,t.loading=!1},PREFERRED_SHOP:function(t,e){var s=30;t.shops=e.map(function(t){return t.address=t.address.substring(0,s)+"...",t.address=t.address.toLowerCase(),t}),t.loading=!1},LIKE_SHOP:function(t,e){t.shops=t.shops.filter(function(t){return t.id!=e})},DISlIKE_SHOP:function(t,e){t.shops=t.shops.map(function(t){if(t.id==e[0])switch(e[1]){case"delete_vote":t.dislikes_count--,t.vote_count--,t.shops_i_hate=0;break;case"new_vote":t.dislikes_count++,t.vote_count++,t.shops_i_hate=1;break}return t}),t.loading=!1},REGISTER_USER:function(t,e){t.userInfo=e,t.loading=!1},loadingData:function(t){t.loading=!0},LOGIN:function(t,e){localStorage.setItem("token",e.access_token),t.isToken=localStorage.getItem("token")},PROFILE:function(t,e){localStorage.setItem("user",e.id),t.profileUser=localStorage.getItem("user"),t.loading=!1},LOGOUT:function(t){t.isToken=localStorage.getItem("token"),localStorage.clear(),t.loading=!1},ERRORS:function(t,e){t.notification=e,t.loading=!1,t.iskillNotif=!1},KILL_NOTIF:function(t){t.loading=!1,t.iskillNotif=!0}},getters:{loadShops:function(t){return t.shops},likedShop:function(t){return t.likedShop},registerUser:function(t){return t.userInfo},Errors:function(t){return t.notification},isKillNotifications:function(t){return t.iskillNotif},isLoading:function(t){return t.loading},isToken:function(t){return t.isToken},profileUser:function(t){return t.profileUser},isAuth:function(t){return null!=t.isToken}}}),Ft=jt;o["a"].config.productionTip=!1,o["a"].use(rt["a"]);var Dt=new rt["a"]({routes:Nt,mode:"history"});Dt.beforeEach(function(t,e,s){t.matched.some(function(t){return t.meta.requiresAuth})?Ft.getters.isAuth?s():s({name:"login"}):t.matched.some(function(t){return t.meta.requiresVisitor})&&Ft.getters.isAuth?s({name:"home"}):s()}),new o["a"]({router:Dt,store:Ft,render:function(t){return t(it)}}).$mount("#app")},"5aea":function(t,e,s){},9245:function(t,e,s){},bfff:function(t,e,s){},c740:function(t,e,s){"use strict";var o=s("bfff"),i=s.n(o);i.a},da17:function(t,e,s){"use strict";var o=s("2267"),i=s.n(o);i.a}});
//# sourceMappingURL=app.536140de.js.map