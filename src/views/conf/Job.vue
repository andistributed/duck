<template>
  <section>

      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>任务配置</span>
    <el-button style="float: right; padding: 3px 0" type="text" v-on:click="openAddJob">新增任务</el-button>
  </div>
  <div  class="text item">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入任务配置id...."></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getJobList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
      <el-table :data="jobs" highlight-current-row v-loading="loading"  stripe  style="width: 100%;">
        <el-table-column prop="id" label="id" width="200" fixed>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="250">
        </el-table-column>
        <el-table-column prop="group" label="任务集群" width="100">
        </el-table-column>
        <el-table-column prop="cron" label="Cron表达式" width="100" >
        </el-table-column>

        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
              <el-tag type="success" size="mini" v-if="scope.row.status==1">启用</el-tag>
              <el-tag type="danger" size="mini" v-else-if="scope.row.status==2">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="target" label="target" width="300">
        </el-table-column>
        <el-table-column label="操作" width="320" fixed="right">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="warning"
          @click="handleManual(scope.$index, scope.row)">立即执行</el-button>
         <el-button
          size="mini"
          type="primary"
          @click="handleView(scope.$index, scope.row)">详情</el-button>
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
    <el-dialog title="新增任务" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="任务集群" prop="group">
      <el-select v-model="addForm.group" placeholder="请选择任务集群" style="width:100%;">
          <el-option
            v-for="item in groups"
            :key="item.name"
            :label="item.remark"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cron" class="cron-input-container">
          <el-input v-model="addForm.cron" auto-complete="off">
             <el-button slot="append" v-if="!showCronBox" icon="el-icon-arrow-down" @click="showCronBox = true" title="打开图形配置"></el-button>
             <el-button slot="append" v-else icon="el-icon-arrow-up" @click="showCronBox = false" title="关闭图形配置"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="cron-picker-container">
            <cron v-if="showCronBox" v-model="addForm.cron"></cron>
            <span class="help-block">格式：0/10 * * * * ? 分别代表：秒 分 时 日 月 周</span>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="addForm.status" placeholder="请选择任务状态" style="width:100%;">
          <el-option
            v-for="item in status"
            :key="item.name"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="目标任务" prop="target" class="has-addon">
          <el-input v-model="addForm.target" placeholder="请输入目标任务"></el-input>
        </el-form-item>
         <el-form-item class="input-help-block">
          <span class="help-block">请务必确保目标任务在所选集群内的每一台机器上都存在</span>
        </el-form-item>
         <el-form-item label="任务参数" prop="params">
            <el-input v-model="addForm.params" placeholder="请输入任务参数"></el-input>
        </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addForm.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
            <el-input v-model="addForm.remark" placeholder="请输入任务备注"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>


     <!--编辑界面-->
    <el-dialog title="修改任务" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="任务集群" prop="group">
      <el-select v-model="editForm.group" placeholder="请选择任务集群" style="width:100%;" disabled>
          <el-option
            v-for="item in groups"
            :key="item.name"
            :label="item.remark"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cron" class="cron-input-container">
          <el-input v-model="editForm.cron" auto-complete="off">
             <el-button slot="append" v-if="!showCronBox" icon="el-icon-arrow-down" @click="showCronBox = true" title="打开图形配置"></el-button>
             <el-button slot="append" v-else icon="el-icon-arrow-up" @click="showCronBox = false" title="关闭图形配置"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="cron-picker-container">
            <cron v-if="showCronBox" v-model="editForm.cron"></cron>
            <span class="help-block">格式：0/10 * * * * ? 分别代表：秒 分 时 日 月 周</span>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择任务状态" style="width:100%;">
          <el-option
            v-for="item in status"
            :key="item.name"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="目标任务" prop="target" class="has-addon">
            <el-input v-model="editForm.target" placeholder="请输入目标任务"></el-input>
        </el-form-item>
         <el-form-item class="input-help-block">
          <span class="help-block">请务必确保目标任务在所选集群内的每一台机器上都存在</span>
        </el-form-item>
         <el-form-item label="任务参数" prop="params">
            <el-input v-model="editForm.params" placeholder="请输入任务参数"></el-input>
        </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="editForm.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
            <el-input v-model="editForm.remark" placeholder="请输入任务备注"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>


     <!--查看界面-->
    <el-dialog title="查看任务" :visible.sync="viewFormVisible" :close-on-click-modal="false">
      <el-form :model="viewForm" label-width="100px"  ref="viewForm">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="viewForm.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务集群" prop="group">
      <el-select v-model="viewForm.group" placeholder="请选择任务集群" style="width:100%;" disabled>
          <el-option
            v-for="item in groups"
            :key="item.name"
            :label="item.remark"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cron" >
             <el-input v-model="viewForm.cron" auto-complete="off" placeholder="请输入Cron表达式" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="viewForm.status" placeholder="请选择任务状态" style="width:100%;" disabled>
          <el-option
            v-for="item in status"
            :key="item.name"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item label="目标任务" prop="target">
            <el-input v-model="viewForm.target" placeholder="请输入目标任务" disabled></el-input>
        </el-form-item>
         <el-form-item label="任务参数" prop="params">
            <el-input v-model="viewForm.params" placeholder="请输入任务参数" disabled></el-input>
        </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="viewForm.mobile" placeholder="请输入手机号码" disabled></el-input>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
            <el-input v-model="viewForm.remark" placeholder="请输入任务备注" disabled></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="viewFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
import { jobConfList,groupConfList,jobAdd,jobEdit,jobDelete,jobExecute } from '@/api/api'
import cron from '@/components/cron'

export default {
  components: {
    cron
  },

  data () {
    return {
      filters: {
        name: ''
      },
      showCronBox: false,
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      loading:false,
      addFormRules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
         group: [
          { required: true, message: '请选择任务集群', trigger: 'blur' }
        ],
         cron: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' }
        ],
         status: [
          { required: true, message: '请选择任务状态', trigger: 'blur' }
        ],
         target: [
          { required: true, message: '请输入目标任务', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        group: '',
        cron:'',
        target: '',
        status: '',
        params:'',
        mobile:'',
        remark:''
      },
      editFormVisible: false, // 新增界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
         group: [
          { required: true, message: '请选择任务集群', trigger: 'blur' }
        ],
         cron: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' }
        ],
         status: [
          { required: true, message: '请选择任务状态', trigger: 'blur' }
        ],
         target: [
          { required: true, message: '请输入目标任务', trigger: 'blur' }
        ]
      },
      // 新增界面数据
      editForm: {
        id:'',
        name: '',
        group: '',
        cron:'',
        target: '',
        status: '',
        params:'',
        mobile:'',
        remark:''
      },
      viewForm:{

      },
      viewFormVisible:false,
      jobs: [],
      groups:[],
      status:[
        {name:"启用",value:1},
         {name:"关闭",value:2}
      ]
    }
  },
  methods: {

    handleManual(index, row){

       this.$confirm('确认要立即此任务吗？', '友情提示', {}).then(() => {

            let para = {id:row.id}
            jobExecute(para).then((res) => {
                this.$message({
                      message: "手动执行任务请求已提交",
                      type: 'success'
                    })
            })


       })

    },
   handleView(index, row){
     this.viewForm = Object.assign({}, row)
     this.viewFormVisible =true

   },
   handleEdit(index, row){
     this.editForm = Object.assign({}, row)
     this.editFormVisible =true

   },
   handleDelete(index, row){

     this.$confirm('确认要删除此任务配置信息吗？', '友情提示', {}).then(() => {
            this.addLoading = true

            let para = {id:row.id}
            jobDelete(para).then((res) => {
              this.addLoading = false
              // NProgress.done();

              if(res.code ==0){
                  this.$message({
                message: "删除成功",
                type: 'success'
              })
              this.getJobList()
              }else{
                this.$message({
                  message: res.message,
                  type: 'error'
                })
              }

            })
          })
   },
   addSubmit(){

     this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认要新增此任务配置信息吗？', '友情提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
            jobAdd(para).then((res) => {
              this.addLoading = false
              this.$message({
                    message: "添加成功",
                    type: 'success'
                  })
              // reset the form
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getJobList()
            }).catch((error)=>{
                 this.addLoading = false
            })
          })
        }
      })
   },
   editSubmit(){

      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认要修改此任务配置信息吗？', '友情提示', {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            jobEdit(para).then((res) => {
              this.editLoading = false
              this.$message({
                    message: "修改成功",
                    type: 'success'
                  })
              // reset the form
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getJobList()
            }).catch((error)=>{
                 this.editLoading = false
            })
          })
        }
      })

   },
   openAddJob(){
      this.addFormVisible =true
   },
    // 获取任务列表
    getJobList: function () {
      let para = {
        name: this.filters.name
      }
      this.loading = true
      jobConfList(para).then((res) => {
         this.loading = false
        this.jobs = res.data
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
    this.getJobList()
    this.groupList()
  }
}

</script>

<style scoped>
  .el-form-item__content{line-height: 2em !important;}
  .cron-input-container,
  .cron-picker-container,
  .has-addon,.is-addon,
  .input-help-block{margin-bottom:5px !important;}
</style>
