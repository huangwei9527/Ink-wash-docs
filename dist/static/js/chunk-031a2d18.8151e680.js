(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-031a2d18"],{"0eac":function(t,e,n){},2445:function(t,e,n){"use strict";n("0eac")},"25ed":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"sheet-view-page"},[e("div",{staticClass:"excel-edit",attrs:{id:"excel-edit"}}),e("ul",{staticClass:"docment-sub-info-wrapper"},[e("li",[e("span",{staticClass:"paddingR5"},[t._v("作者:")]),e("span",{staticClass:"user-header-wrapper"},[e("authorHead",{attrs:{userData:t.author}})],1)]),e("li",[t._v("\n      更新时间: "+t._s(t._f("formatTime")(t.document.updated,"yyyy-MM-dd"))+"\n    ")]),e("li",[e("el-tooltip",{attrs:{content:"获赞数",placement:"bottom"}},[e("span",[e("i",{staticClass:"iconfont icon-dianzan"})])]),t._v("\n      "+t._s(t.document.star_count||0)+"\n    ")],1),e("li",[e("el-tooltip",{attrs:{content:"阅读数",placement:"bottom"}},[e("span",[e("i",{staticClass:"iconfont icon-ico_yueduliang"})])]),t._v("\n      "+t._s(t.document.visit_count||0)+"\n    ")],1)])])},i=[],o=n("bd86"),s=(n("7f7f"),n("0c67"),n("450d"),n("299c")),c=n.n(s),r=n("8d4a"),u=n("22ce"),d=n.n(u),l=n("d594"),f={props:{author:{type:Object,default:function(){return{}}},document:{type:Object,default:function(){return{}}},content:{type:String,default:""}},components:Object(o["a"])({authorHead:l["a"]},c.a.name,c.a),mounted:function(){this.renderContent()},methods:{renderContent:function(){var t={mode:"read",showToolbar:!0,showGrid:!0,showContextmenu:!0,view:{height:function(){return document.documentElement.clientHeight-70},width:function(){return document.documentElement.clientWidth}},row:{len:100,height:25},col:{len:26,width:100,indexWidth:60,minWidth:60},style:{bgcolor:"#ffffff",align:"left",valign:"middle",textwrap:!1,strike:!1,underline:!1,color:"#0a0a0a",font:{name:"Helvetica",size:10,bold:!1,italic:!1}}};r["a"].locale("zh-cn",d.a),this.editor=new r["a"](document.getElementById("excel-edit"),t),this.editor.validate(),this.setContent(this.content)},setContent:function(t){try{t=JSON.parse(t)}catch(e){console.log(e)}this.editor.loadData(t)}},watch:{content:function(t){this.setContent(t)}}},h=f,m=(n("ea15"),n("2877")),p=Object(m["a"])(h,a,i,!1,null,"a45159c2",null);e["default"]=p.exports},c2aa:function(t,e,n){},d594:function(t,e,n){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"author-head inline-block"},[e("div",{staticClass:"user-img"},[e("img",{attrs:{src:t.userData.avatar||t.userHeadImage,alt:""}})]),e("span",{staticClass:"user-name"},[t._v(t._s(t.userData.name))])])},i=[],o={props:{userData:{type:Object,default:function(){return{}}}},data:function(){return{userHeadImage:n("7724")}}},s=o,c=(n("2445"),n("2877")),r=Object(c["a"])(s,a,i,!1,null,"7d18a370",null);e["a"]=r.exports},ea15:function(t,e,n){"use strict";n("c2aa")}}]);