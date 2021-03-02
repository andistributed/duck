webpackJsonp([6],{220:function(e,t,i){"use strict";function a(e){i(240)}Object.defineProperty(t,"__esModule",{value:!0});var o=i(227),r=i.n(o);for(var n in o)"default"!==n&&function(e){i.d(t,e,function(){return o[e]})}(n);var l=i(242),s=i(31),d=a,c=s(r.a,l.a,!1,d,"data-v-48781563",null);t.default=c.exports},227:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(89);t.default={data:function(){return{addFormVisible:!1,editFormVisible:!1,viewClientFormVisible:!1,addLoading:!1,editLoading:!1,loading:!1,addFormRules:{name:[{required:!0,message:"请输入任务名称",trigger:"blur"}],remark:[{required:!0,message:"请输入集群备注信息",trigger:"blur"}]},addForm:{name:"",remark:""},editFormRules:{name:[{required:!0,message:"请输入任务名称",trigger:"blur"}],remark:[{required:!0,message:"请输入集群备注信息",trigger:"blur"}]},editForm:{name:"",remark:""},groups:[],clients:[]}},methods:{addSubmit:function(){var e=this;this.$refs.addForm.validate(function(t){t&&e.$confirm("确认要新增此集群配置信息吗？","友情提示",{}).then(function(){e.addLoading=!0;var t=Object.assign({},e.addForm);(0,a.groupAdd)(t).then(function(t){e.addLoading=!1,e.$message({message:"添加成功",type:"success"}),e.$refs.addForm.resetFields(),e.addFormVisible=!1,e.groupList()}).catch(function(t){e.addLoading=!1})})})},openAddGroup:function(){this.addFormVisible=!0},handleEdit:function(e,t){this.editForm=Object.assign({},t),this.editFormVisible=!0},editSubmit:function(){var e=this;this.$refs.editForm.validate(function(t){t&&e.$confirm("确认要修改此集群信息吗？","友情提示",{}).then(function(){e.editLoading=!0;var t=Object.assign({},e.editForm);(0,a.groupEdit)(t).then(function(t){e.editLoading=!1,e.$message({message:"修改成功",type:"success"}),e.$refs.editForm.resetFields(),e.editFormVisible=!1,e.groupList()}).catch(function(t){e.editLoading=!1})})})},handleClientView:function(e,t){var i=this;this.viewClientFormVisible=!0;var o={group:t.name};this.clients=[],(0,a.clientList)(o).then(function(e){i.loading=!1,i.clients=e.data})},handleDelete:function(e,t){var i=this;this.$confirm("确认要删除此集群信息吗？","友情提示",{}).then(function(){i.addLoading=!0;var e={name:t.name};(0,a.groupDelete)(e).then(function(e){i.addLoading=!1,0==e.code?(i.$message({message:"删除成功",type:"success"}),i.groupList()):i.$message({message:e.message,type:"error"})})})},groupList:function(){var e=this,t={};(0,a.groupConfList)(t).then(function(t){e.groups=t.data})}},mounted:function(){this.groupList()}}},240:function(e,t,i){var a=i(241);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(18)("03a8776e",a,!0,{})},241:function(e,t,i){t=e.exports=i(17)(!1),t.push([e.i,"",""])},242:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[e._v("任务集群配置")]),e._v(" "),i("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:e.openAddGroup}},[e._v("新增任务集群")])],1),e._v(" "),i("div",{staticClass:"text item"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.groups,"highlight-current-row":"",stripe:""}},[i("el-table-column",{attrs:{type:"index",width:"60"}}),e._v(" "),i("el-table-column",{attrs:{prop:"name",label:"集群名称",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"remark",label:"备注"}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"250",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(i){return e.handleClientView(t.$index,t.row)}}},[e._v("节点")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1)]),e._v(" "),i("el-dialog",{attrs:{title:"新增集群",visible:e.addFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[i("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"100px",rules:e.addFormRules}},[i("el-form-item",{attrs:{label:"集群名称",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off",maxlength:"15"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"备注",prop:"remark"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入备注信息"},model:{value:e.addForm.remark,callback:function(t){e.$set(e.addForm,"remark",t)},expression:"addForm.remark"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.addFormVisible=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.addSubmit(t)}}},[e._v("提交")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"修改集群",visible:e.editFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.editFormVisible=t}}},[i("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"100px",rules:e.editFormRules}},[i("el-form-item",{attrs:{label:"集群名称",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off",maxlength:"15",disabled:""},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"备注",prop:"remark"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入备注信息"},model:{value:e.editForm.remark,callback:function(t){e.$set(e.editForm,"remark",t)},expression:"editForm.remark"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.editFormVisible=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.editLoading},nativeOn:{click:function(t){return e.editSubmit(t)}}},[e._v("提交")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"任务节点",visible:e.viewClientFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.viewClientFormVisible=t}}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.clients,"highlight-current-row":""}},[i("el-table-column",{attrs:{prop:"group",label:"集群",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"name",label:"client",width:"150"}}),e._v(" "),i("el-table-column",{attrs:{prop:"path",label:"path"}})],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.viewClientFormVisible=!1}}},[e._v("关闭")])],1)],1)],1)},o=[],r={render:a,staticRenderFns:o};t.a=r}});
//# sourceMappingURL=6.build.js.map