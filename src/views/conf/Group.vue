<template>
  <section>

      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>任务集群配置</span>
    <el-button style="float: right; padding: 3px 0" type="text" v-on:click="openAddGroup">新增任务集群</el-button>
  </div>
  <div  class="text item">

    <!--列表-->
      <el-table :data="groups" highlight-current-row v-loading="loading"  stripe style="width: 100%;">
          <el-table-column type="index" width="60">
      </el-table-column>
        <el-table-column prop="name" label="集群名称" width="150">
        </el-table-column>
        <el-table-column prop="remark" label="备注" >
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
      <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          @click="handleClientView(scope.$index, scope.row)">节点</el-button>
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</el-card>

    <!--新增界面-->
    <el-dialog title="新增集群" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="集群名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" maxlength="15"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
             <el-input v-model="addForm.remark" auto-complete="off" placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--修改界面-->
    <el-dialog title="修改集群" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="集群名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" maxlength="15" disabled></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
             <el-input v-model="editForm.remark" auto-complete="off" placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

     <!--查看界面-->
    <el-dialog title="任务节点" :visible.sync="viewClientFormVisible" :close-on-click-modal="false">

       <!--列表-->
      <el-table :data="clients" highlight-current-row v-loading="loading"  style="width: 100%;">
        <el-table-column prop="group" label="集群" width="150">
        </el-table-column>
        <el-table-column prop="name" label="client" width="150">
        </el-table-column>
        <el-table-column prop="path" label="path">
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="viewClientFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { groupConfList,groupAdd,groupEdit,groupDelete,clientList } from '@/api/api'
export default {
  data () {
    return {
      addFormVisible: false, // 新增界面是否显示
      editFormVisible: false,
      viewClientFormVisible:false,
      addLoading: false,
      editLoading: false,
      loading:false,
      addFormRules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
         remark: [
          { required: true, message: '请输入集群备注信息', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        remark:''
      },
      editFormRules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
         remark: [
          { required: true, message: '请输入集群备注信息', trigger: 'blur' }
        ]
      },
      editForm: {
        name: '',
        remark:''
      },
      groups:[],
      clients:[]
    }
  },
  methods: {
   addSubmit(){

     this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认要新增此集群配置信息吗？', '友情提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
            groupAdd(para).then((res) => {
              this.addLoading = false
              this.$message({
                    message: "添加成功",
                    type: 'success'
                  })
              // reset the form
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.groupList()
            }).catch((error)=>{
                 this.addLoading = false
            })
          })
        }
      })
   },
   openAddGroup(){
      this.addFormVisible =true
   },
   handleEdit(index, row){
     this.editForm = Object.assign({}, row)
     this.editFormVisible =true
   },
   editSubmit(){

      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认要修改此集群信息吗？', '友情提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            groupEdit(para).then((res) => {
              this.editLoading = false
              this.$message({
                    message: "修改成功",
                    type: 'success'
                  })
              // reset the form
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.groupList()
            }).catch((error)=>{
                 this.editLoading = false
            })
          })
        }
      })

   },
   handleClientView(index, row){
      this.viewClientFormVisible =true
      let param ={
          group:row.name
      }
        this.clients =[]
       clientList(param).then((res) => {
         this.loading = false
        this.clients = res.data
      })


   },
   handleDelete(index, row){

     this.$confirm('确认要删除此集群信息吗？', '友情提示', {}).then(() => {
            this.addLoading = true

            let para = {name:row.name}
            groupDelete(para).then((res) => {
              this.addLoading = false
              // NProgress.done();

              if(res.code ==0){
                  this.$message({
                message: "删除成功",
                type: 'success'
              })
              this.groupList()
              }else{
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }

            })
          })
   },
    groupList(){

      let para = {}
      groupConfList(para).then((res) => {
        this.groups = res.data
      })
    }
  },
  mounted () {
    this.groupList()
  }
}

</script>

<style scoped>

</style>
