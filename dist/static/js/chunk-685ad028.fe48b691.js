(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-685ad028"],{"09ff":function(t,e,n){"use strict";n("bec9")},"10cb":function(t,e,n){},"172a":function(t,e,n){"use strict";n.r(e);var o,a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"page page-login"},[e("page-background",{staticClass:"login-background"}),e("div",{staticClass:"login-page-inner"},[e("p",{staticClass:"title"},[t._v("水墨知识文档库")]),e("el-form",{ref:"loginForm",attrs:{model:t.formData,rules:t.formRules,"label-width":"0px"}},[e("el-form-item",{attrs:{prop:"username"}},[e("el-input",{attrs:{name:"userName",placeholder:"请输入用户名"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doLogin.apply(null,arguments)}},model:{value:t.formData.username,callback:function(e){t.$set(t.formData,"username",e)},expression:"formData.username"}},[e("i",{staticClass:"iconfont icon-zhanghao",attrs:{slot:"prefix"},slot:"prefix"})])],1),"register"===t.type?e("el-form-item",{attrs:{prop:"email"}},[e("el-input",{attrs:{autocomplete:"off",placeholder:"请输入邮箱"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doLogin.apply(null,arguments)}},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}},[e("span",{staticClass:"iconfont icon-mail-copy",attrs:{slot:"prefix"},slot:"prefix"})])],1):t._e(),e("el-form-item",{attrs:{prop:"password"}},["password"===t.inputType?e("el-input",{attrs:{name:"password",placeholder:"请输入密码",type:t.inputType},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doLogin.apply(null,arguments)}},model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}},[e("i",{staticClass:"iconfont icon-mima",attrs:{slot:"prefix"},slot:"prefix"}),e("span",{staticClass:"cursor-pointer",attrs:{slot:"suffix"},on:{mousedown:t.mousedownPassword},slot:"suffix"},[e("i",{staticClass:"iconfont icon-yincangmima"})])]):e("el-input",{attrs:{name:"password",placeholder:"请输入密码",type:t.inputType},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.doLogin.apply(null,arguments)}},model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}},[e("i",{staticClass:"iconfont icon-mima",attrs:{slot:"prefix"},slot:"prefix"}),e("span",{staticClass:"cursor-pointer",attrs:{slot:"suffix"},on:{mousedown:t.mousedownText},slot:"suffix"},[e("i",{staticClass:"iconfont icon-xianshimima"})])])],1),e("el-form-item",[e("div",{staticClass:"btn-hover",on:{click:t.doSubmit}},[t._v(t._s("login"===t.type?"登录":"注册"))])])],1),e("div",{staticClass:"switch-do-type marginB20"},[e("p",{on:{click:t.switchType}},[e("i",{staticClass:"iconfont icon-iconfontzhizuobiaozhun47"}),e("span",[t._v(t._s("login"===t.type?"立即注册":"马上登录"))])])]),t._m(0)],1)],1)},s=[function(){var t=this,e=t._self._c;return e("p",{staticClass:"login-page-bottom"},[t._v("Copyright © 2020 "),e("span",{staticClass:"black"},[t._v("水墨文档版权所有")])])}],r=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),i=(n("10cb"),n("450d"),n("f3ad")),c=n.n(i),l=(n("eca7"),n("3787")),p=n.n(l),u=(n("7f7f"),n("425f"),n("4105")),f=n.n(u),m=function(){var t=this;t._self._c;return t._m(0)},d=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"components-page-background"},[e("img",{staticClass:"bg-0 not-select",attrs:{src:n("2fca"),alt:""}}),e("img",{staticClass:"bg-1 not-select",attrs:{src:n("4c02"),alt:""}}),e("img",{staticClass:"bg-2 not-select",attrs:{src:n("bd03"),alt:""}})])}],g={name:"page-background"},y=g,b=(n("3871"),n("2877")),h=Object(b["a"])(y,m,d,!1,null,"46b00986",null),w=h.exports,k=n("ce7d");function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var x={components:(o={},Object(r["a"])(o,f.a.name,f.a),Object(r["a"])(o,p.a.name,p.a),Object(r["a"])(o,c.a.name,c.a),Object(r["a"])(o,"pageBackground",w),o),data:function(){return{loading:!1,loadingVerify:!1,inputType:"password",type:"login",formData:{email:"",username:"",password:""},formRules:{username:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}]}}},created:function(){this.fromUrl=this.$route.query.from?window.decodeURIComponent(this.$route.query.from):""},methods:{doSubmit:function(){var t=this;this.$refs.loginForm.validate((function(e){var n="login"===t.type?"doLogin":"doRegister";if(!e)return t.$store.dispatch("showMassage",{type:"error",message:"请正确填写表单！"}),!1;t[n]()}))},doLogin:function(){var t=this,e=O({},this.formData);k["a"].doLogin(e).then((function(){t.fromUrl?t.$router.push(t.fromUrl):k["a"].goBeforeLoginUrl()}))},doRegister:function(){var t=this,e=O({},this.formData);k["a"].doRegister(e).then((function(){t.fromUrl?t.$router.push(t.fromUrl):k["a"].goBeforeLoginUrl()}))},switchType:function(){"login"===this.type?this.type="register":this.type="login"},mousedownPassword:function(){this.inputType="text"},mousedownText:function(){this.inputType="password"},mouseup:function(){this.inputType="password"}}},C=x,_=(n("09ff"),Object(b["a"])(C,a,s,!1,null,"78831884",null));e["default"]=_.exports},"2fca":function(t,e,n){t.exports=n.p+"static/img/0.94004942.png"},3871:function(t,e,n){"use strict";n("c6e2")},"4c02":function(t,e,n){t.exports=n.p+"static/img/1.0158d918.png"},"7f7f":function(t,e,n){var o=n("86cc").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,r="name";r in a||n("9e1e")&&o(a,r,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},bd03:function(t,e,n){t.exports=n.p+"static/img/2.2cc79c96.png"},bec9:function(t,e,n){},c6e2:function(t,e,n){}}]);