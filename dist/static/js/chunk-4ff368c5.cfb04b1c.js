(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ff368c5"],{"2fdb":function(t,e,a){"use strict";var i=a("5ca1"),n=a("d2c8"),r="includes";i(i.P+i.F*a("5147")(r),"String",{includes:function(t){return!!~n(this,t,r).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},3760:function(t,e,a){"use strict";a("a6de")},5147:function(t,e,a){var i=a("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[i]=!1,!"/./"[t](e)}catch(n){}}return!0}},6762:function(t,e,a){"use strict";var i=a("5ca1"),n=a("c366")(!0);i(i.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a("9c6c")("includes")},"910e":function(t,e,a){"use strict";a.r(e);var i,n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"axure-edit-wrapper"},[e("div",{staticClass:"upload-wrapper"},[e("el-form",{attrs:{"label-position":"top"}},[e("el-form-item",{attrs:{label:"上传Axure zip文件："}},[e("div",{staticClass:"paddingL60 text-area-wrapper"},[e("el-upload",{staticClass:"user-image-upload-input",attrs:{action:"/","before-upload":t.beforeUpload,accept:"application/zip"}},[e("div",[e("el-button",{attrs:{type:"primary",size:"small"}},[t._v("上传文件")]),e("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传zip文件，且不超过50m")])],1)])],1)]),e("el-form-item",{attrs:{label:"默认访问入口："}},[e("div",{attrs:{slot:"label"},slot:"label"},[e("span",{staticClass:"inline-block marginR20"},[t._v("默认访问入口：")]),e("el-button",{attrs:{size:"small"},on:{click:t.setDefaultUrl}},[t._v("设置当前预览页面为入口页面")])],1),e("div",{staticClass:"text-area-wrapper"},[t._v("\n          "+t._s(t.reGetUrl(t.axureUrl))+"\n        ")])])],1)],1),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"axure-preview-wrapper"},[e("iframe",{ref:"iframe",staticStyle:{"background-color":"transparent",width:"100%","min-height":"100%"},attrs:{src:t.reGetUrl(t.axureUrl),frameborder:"0"}}),t.axureUrl?t._e():e("div",{staticClass:"preview-tips-wrapper"},[e("div",{staticClass:"preview-tips"},[t._v("\n        上传原型图zip包预览\n      ")])])])])},r=[],s=(a("a481"),a("6762"),a("2fdb"),a("bd86")),o=(a("0c67"),a("450d"),a("299c")),c=a.n(o),l=(a("f225"),a("89a9")),u=a.n(l),d=(a("1951"),a("eedf")),p=a.n(d),f=(a("eca7"),a("3787")),h=a.n(f),v=(a("7f7f"),a("425f"),a("4105")),m=a.n(v),b={name:"axure-edit",props:{content:{type:String,default:""}},components:(i={},Object(s["a"])(i,m.a.name,m.a),Object(s["a"])(i,h.a.name,h.a),Object(s["a"])(i,p.a.name,p.a),Object(s["a"])(i,u.a.name,u.a),Object(s["a"])(i,c.a.name,c.a),i),data:function(){return{loading:!1,axureUrl:"",editorHasReady:!0}},created:function(){},mounted:function(){this.initEditor()},watch:{content:function(t){this.setContent(t)}},methods:{initEditor:function(){},getContent:function(){return this.axureUrl},setContent:function(t){this.axureUrl=t},destroy:function(){},beforeUpload:function(t){if(!(t.size>52428800))return this.saveAxureZip(t),!1;this.$message.error("上传图片不能超过50mb！")},saveAxureZip:function(t){var e=this,a=new FormData;a.append("file",t),this.loading=!0,this.$API.docsUplaodAxure(a).then((function(t){e.loading=!1,e.setContent(t.body.url)})).catch((function(){e.loading=!1}))},setDefaultUrl:function(){if(this.axureUrl)try{var t=this.$refs.iframe.contentWindow.location.href;t.includes(window.location.origin)&&(t=t.replace(window.location.origin,"")),this.axureUrl=t}catch(e){this.$message.error("axuer预览地址与当前系统地址不同源，无法获取url")}},reGetUrl:function(t){return t?t.includes("http://")||t.includes("https://")?t:window.location.origin+t:""}},destroyed:function(){}},w=b,g=(a("3760"),a("2877")),x=Object(g["a"])(w,n,r,!1,null,"2758fa26",null);e["default"]=x.exports},a6de:function(t,e,a){},d2c8:function(t,e,a){var i=a("aae3"),n=a("be13");t.exports=function(t,e,a){if(i(e))throw TypeError("String#"+a+" doesn't accept regex!");return String(n(t))}}}]);