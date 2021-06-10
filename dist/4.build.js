webpackJsonp([4],{224:function(e,t,a){"use strict";function l(e){a(252)}Object.defineProperty(t,"__esModule",{value:!0});var i=a(231),o=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);var s=a(254),n=a(30),m=l,p=n(o.a,s.a,!1,m,"data-v-0f9fe952",null);t.default=p.exports},231:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a(89);t.default={data:function(){return{filters:{id:"",group:"",ip:""},status:[{name:"EXECUTING",value:1},{name:"COMPLETE",value:2},{name:"UNKNOW",value:3},{name:"ERROR",value:-1}],groups:{},total:0,page:1,pageSize:20,loading:!1,viewForm:{},viewFormVisible:!1,viewClientFormVisible:!1,snapshots:[],clients:[]}},methods:{handleSizeChange:function(e){this.pageSize=e,this.getSnapshots()},handleCurrentChange:function(e){this.page=e,this.getSnapshots()},handleView:function(e,t){this.viewForm=Object.assign({},t),this.viewFormVisible=!0},handleDelete:function(e,t){var a=this;this.$confirm("确认要删除此任务任务快照信息吗？","友情提示",{}).then(function(){var e=Object.assign({},t);(0,l.snapshotDelete)(e).then(function(e){a.$message({message:"删除成功",type:"success"}),a.getSnapshots()})})},getSnapshots:function(){var e=this,t=Object.assign({pageNo:this.page,pageSize:this.pageSize},this.filters);this.loading=!0,(0,l.executeSnapshotList)(t).then(function(t){e.loading=!1,e.snapshots=t.data.list,e.total=t.data.totalCount})},groupList:function(){var e=this,t={};(0,l.groupConfList)(t).then(function(t){e.groups=t.data})}},mounted:function(){this.getSnapshots(),this.groupList()}}},252:function(e,t,a){var l=a(253);"string"==typeof l&&(l=[[e.i,l,""]]),l.locals&&(e.exports=l.locals);a(17)("226fe09f",l,!0,{})},253:function(e,t,a){t=e.exports=a(55)(!1),t.push([e.i,"",""])},254:function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("任务快照列表")])]),e._v(" "),a("div",{staticClass:"text item"},[a("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[a("el-form",{attrs:{inline:!0,model:e.filters}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入执行快照id"},model:{value:e.filters.id,callback:function(t){e.$set(e.filters,"id",t)},expression:"filters.id"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入任务名称"},model:{value:e.filters.name,callback:function(t){e.$set(e.filters,"name",t)},expression:"filters.name"}})],1),e._v(" "),a("el-form-item",[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请选择执行状态"},model:{value:e.filters.status,callback:function(t){e.$set(e.filters,"status",t)},expression:"filters.status"}},e._l(e.status,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}),1)],1),e._v(" "),a("el-form-item",[a("el-select",{staticStyle:{width:"100%"},attrs:{clearable:"",placeholder:"请选择任务集群"},model:{value:e.filters.group,callback:function(t){e.$set(e.filters,"group",t)},expression:"filters.group"}},e._l(e.groups,function(e){return a("el-option",{key:e.name,attrs:{label:e.remark,value:e.name}})}),1)],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入ip"},model:{value:e.filters.ip,callback:function(t){e.$set(e.filters,"ip",t)},expression:"filters.ip"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.getSnapshots}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.snapshots,"highlight-current-row":"",stripe:""}},[a("el-table-column",{attrs:{prop:"id",label:"id",width:"200",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"任务名称",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"group",label:"任务集群",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"cron",label:"Cron表达式",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ip",label:"ip",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"执行状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("el-tag",{attrs:{type:"success",size:"mini"}},[e._v("EXECUTING")]):2==t.row.status?a("el-tag",{attrs:{type:"primary",size:"mini"}},[e._v("COMPLETE")]):-1==t.row.status?a("el-tag",{attrs:{type:"danger",size:"mini"}},[e._v("ERROR")]):3==t.row.status?a("el-tag",{attrs:{type:"warning",size:"mini"}},[e._v("UNKNOW")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"耗时",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"danger",size:"mini"}},[e._v(e._s(t.row.times)+"秒")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"target",label:"Target",width:"250"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"startTime",label:"开始时间",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"finishTime",label:"结束时间",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"100",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return e.handleView(t.$index,t.row)}}},[e._v("详情")])]}}])})],1),e._v(" "),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"total,sizes,prev, pager, next","page-size":e.pageSize,"page-sizes":[20,30,50,100],total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)]),e._v(" "),a("el-dialog",{attrs:{title:"任务快照详情",visible:e.viewFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.viewFormVisible=t}}},[a("el-form",{ref:"viewForm",attrs:{model:e.viewForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"快照Id",prop:"id"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.id,callback:function(t){e.$set(e.viewForm,"id",t)},expression:"viewForm.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务Id",prop:"jobId"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.jobId,callback:function(t){e.$set(e.viewForm,"jobId",t)},expression:"viewForm.jobId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务名称",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.name,callback:function(t){e.$set(e.viewForm,"name",t)},expression:"viewForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务集群",prop:"group"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.group,callback:function(t){e.$set(e.viewForm,"group",t)},expression:"viewForm.group"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"Cron表达式",prop:"cron"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.cron,callback:function(t){e.$set(e.viewForm,"cron",t)},expression:"viewForm.cron"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"ip",prop:"cron"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.ip,callback:function(t){e.$set(e.viewForm,"ip",t)},expression:"viewForm.ip"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"目标任务",prop:"target"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.target,callback:function(t){e.$set(e.viewForm,"target",t)},expression:"viewForm.target"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务参数",prop:"params"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.params,callback:function(t){e.$set(e.viewForm,"params",t)},expression:"viewForm.params"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间",prop:"createTime"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.createTime,callback:function(t){e.$set(e.viewForm,"createTime",t)},expression:"viewForm.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"mobile"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.mobile,callback:function(t){e.$set(e.viewForm,"mobile",t)},expression:"viewForm.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态",prop:"status"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.status,callback:function(t){e.$set(e.viewForm,"status",t)},expression:"viewForm.status"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"耗时",prop:"times"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.times,callback:function(t){e.$set(e.viewForm,"times",t)},expression:"viewForm.times"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间",prop:"createTime"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.createTime,callback:function(t){e.$set(e.viewForm,"createTime",t)},expression:"viewForm.createTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"开始时间",prop:"startTime"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.startTime,callback:function(t){e.$set(e.viewForm,"startTime",t)},expression:"viewForm.startTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"完成时间",prop:"finishTime"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.finishTime,callback:function(t){e.$set(e.viewForm,"finishTime",t)},expression:"viewForm.finishTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.remark,callback:function(t){e.$set(e.viewForm,"remark",t)},expression:"viewForm.remark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结果",prop:"result"}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.viewForm.result,callback:function(t){e.$set(e.viewForm,"result",t)},expression:"viewForm.result"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.viewFormVisible=!1}}},[e._v("关闭")])],1)],1)],1)},i=[],o={render:l,staticRenderFns:i};t.a=o}});