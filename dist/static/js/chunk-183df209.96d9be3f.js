(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-183df209"],{"28d2":function(t,a,s){},d9ea:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t._self._c;return a("div",{staticClass:"page-my-document"},[t._m(0),a("div",{staticClass:"docs-list-wrapper scroll-wrapper"},[t._m(1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"list-wrapper"},[t._l(t.docsList,(function(s,n){return[a("docsThumbnail",{key:n,attrs:{type:s.type,docShowType:"list",docsData:s,showAuthor:!1,showCreateTime:!0,btnList:["openBlank","edit","reName","copyUrl","shareSetting","cooperation","delete"]},on:{"open-folder":function(a){return t.openFolder(s)},refresh:t.getData}})]})),t.noData?a("noFunData"):t._e()],2)])])},i=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"dash-board-operator-wrapper"},[a("div",{staticClass:"dash-board-title"},[t._v("我的文档")])])},function(){var t=this,a=t._self._c;return a("ul",{staticClass:"docs-thumbnail-table-title"},[a("li",{staticClass:"docs-thumbnail-title"},[t._v("标题")]),a("li",{staticClass:"docs-info-date"},[t._v("创建时间")]),a("li",{staticClass:"docs-info-date"},[t._v("更新时间")]),a("li",{staticClass:"docs-info-op"},[t._v("操作")])])}],e=s("b01a"),o=s("66aa"),c={components:{docsThumbnail:e["a"],noFunData:o["a"]},data:function(){return{loading:!1,noData:!1,searchParams:{parentId:""},docsList:[]}},created:function(){this.getData()},methods:{getData:function(){var t=this;this.loading=!0,this.$API.getMyDocumentList().then((function(a){t.docsList=a.body||[],t.loading=!1,t.docsList.length||(t.noData=!0)})).catch((function(){t.loading=!1}))}}},d=c,l=(s("de13"),s("2877")),r=Object(l["a"])(d,n,i,!1,null,"f1bac4dc",null);a["default"]=r.exports},de13:function(t,a,s){"use strict";s("28d2")}}]);