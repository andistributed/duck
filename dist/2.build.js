webpackJsonp([2],{223:function(e,t,i){"use strict";function l(e){i(284)}Object.defineProperty(t,"__esModule",{value:!0});var o=i(237),a=i.n(o);for(var r in o)"default"!==r&&function(e){i.d(t,e,function(){return o[e]})}(r);var s=i(286),n=i(31),c=l,m=n(a.a,s.a,!1,c,"data-v-0d14fb74",null);t.default=m.exports},237:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i(89);t.default={data:function(){return{filters:{},groups:{},loading:!1,viewForm:{},viewFormVisible:!1,viewClientFormVisible:!1,snapshots:[],clients:[]}},methods:{handleView:function(e,t){this.viewForm=Object.assign({},t),this.viewFormVisible=!0},handleDelete:function(e,t){var i=this;this.$confirm("确认要删除此任务快照信息吗？","友情提示",{}).then(function(){var e=Object.assign({},t);(0,l.snapshotDelete)(e).then(function(e){i.$message({message:"删除成功",type:"success"}),i.getSnapshots()})})},getSnapshots:function(){var e=this,t=Object.assign({},this.filters);this.loading=!0,(0,l.snapshotList)(t).then(function(t){e.loading=!1,e.snapshots=t.data})},groupList:function(){var e=this,t={};(0,l.groupConfList)(t).then(function(t){e.groups=t.data})}},mounted:function(){this.getSnapshots(),this.groupList()}}},284:function(e,t,i){var l=i(285);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);i(18)("f2cf5472",l,!0,{})},285:function(e,t,i){t=e.exports=i(17)(!1),t.push([e.i,"",""])},286:function(e,t,i){"use strict";var l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("任务快照列表")])]),e._v(" "),i("div",{staticClass:"text item"},[i("el-alert",{attrs:{title:"只展示前500条任务快照信息,带有条件筛选一定选择任务集群...",type:"warning"}}),e._v(" "),i("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[i("el-form",{attrs:{inline:!0,model:e.filters}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入快照id"},model:{value:e.filters.id,callback:function(t){e.$set(e.filters,"id",t)},expression:"filters.id"}})],1),e._v(" "),i("el-form-item",[i("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请选择任务集群"},model:{value:e.filters.group,callback:function(t){e.$set(e.filters,"group",t)},expression:"filters.group"}},e._l(e.groups,function(e){return i("el-option",{key:e.name,attrs:{label:e.remark,value:e.name}})}),1)],1),e._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入客户端ip"},model:{value:e.filters.ip,callback:function(t){e.$set(e.filters,"ip",t)},expression:"filters.ip"}})],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.getSnapshots}},[e._v("查询")])],1)],1)],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.snapshots,"highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{prop:"id",label:"id",width:"200",fixed:""}}),e._v(" "),i("el-table-column",{attrs:{prop:"name",label:"任务名称",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"group",label:"任务集群",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{prop:"cron",label:"Cron表达式",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{prop:"ip",label:"ip",width:"100"}}),e._v(" "),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"target",label:"target"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){return e.handleView(t.$index,t.row)}}},[e._v("详情")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)]),e._v(" "),i("el-dialog",{attrs:{title:"任务快照详情",visible:e.viewFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.viewFormVisible=t}}},[i("el-form",{ref:"viewForm",attrs:{model:e.viewForm,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"任务Id",prop:"id"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.id,callback:function(t){e.$set(e.viewForm,"id",t)},expression:"viewForm.id"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"任务名称",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.name,callback:function(t){e.$set(e.viewForm,"name",t)},expression:"viewForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"任务集群",prop:"group"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.group,callback:function(t){e.$set(e.viewForm,"group",t)},expression:"viewForm.group"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"Cron表达式",prop:"cron"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.cron,callback:function(t){e.$set(e.viewForm,"cron",t)},expression:"viewForm.cron"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"ip",prop:"cron"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.ip,callback:function(t){e.$set(e.viewForm,"ip",t)},expression:"viewForm.ip"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"目标任务",prop:"target"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.target,callback:function(t){e.$set(e.viewForm,"target",t)},expression:"viewForm.target"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"任务参数",prop:"params"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.params,callback:function(t){e.$set(e.viewForm,"params",t)},expression:"viewForm.params"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"创建时间",prop:"createTime"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.createTime,callback:function(t){e.$set(e.viewForm,"createTime",t)},expression:"viewForm.createTime"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"手机号码",prop:"mobile"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.mobile,callback:function(t){e.$set(e.viewForm,"mobile",t)},expression:"viewForm.mobile"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"备注",prop:"remark"}},[i("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.remark,callback:function(t){e.$set(e.viewForm,"remark",t)},expression:"viewForm.remark"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.viewFormVisible=!1}}},[e._v("关闭")])],1)],1)],1)},o=[],a={render:l,staticRenderFns:o};t.a=a}});