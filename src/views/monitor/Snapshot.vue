<template>
  <section>

      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>任务快照列表</span>
  </div>
  <div  class="text item">
    <el-alert
    title="只展示前500条任务快照信息,带有条件筛选一定选择任务集群..."
    type="warning">
  </el-alert>
          <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入快照id"></el-input>
        </el-form-item>
         <el-form-item>
          <el-select v-model="filters.group" clearable placeholder="请选择任务集群" style="width:100%;">
          <el-option
            v-for="item in groups"
            :key="item.name"
            :label="item.remark"
            :value="item.name">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item>
          <el-input v-model="filters.ip" placeholder="请输入客户端ip"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getSnapshots">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
      <el-table :data="snapshots" highlight-current-row v-loading="loading"  stripe  style="width: 100%;">
        <el-table-column prop="id" label="id" width="200" fixed>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="150">
        </el-table-column>
        <el-table-column prop="group" label="任务集群" width="100">
        </el-table-column>
        <el-table-column prop="cron" label="Cron表达式" width="100" >
        </el-table-column>
         <el-table-column prop="ip" label="ip" width="100" >
        </el-table-column>
           <el-table-column prop="createTime" label="创建时间" width="150" >
        </el-table-column>
        <el-table-column prop="target" label="target">
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="primary"
          @click="handleView(scope.$index, scope.row)">详情</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</el-card>


 <!--查看界面-->
    <el-dialog title="任务快照详情" :visible.sync="viewFormVisible" :close-on-click-modal="false">
      <el-form :model="viewForm" label-width="100px" ref="viewForm">
          <el-form-item label="任务Id" prop="id">
          <el-input v-model="viewForm.id" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="viewForm.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务集群" prop="group">
             <el-input v-model="viewForm.group" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cron" >
             <el-input v-model="viewForm.cron" auto-complete="off"  disabled></el-input>
        </el-form-item>
          <el-form-item label="ip" prop="cron" >
             <el-input v-model="viewForm.ip" auto-complete="off"  disabled></el-input>
        </el-form-item>
         <el-form-item label="目标任务" prop="target">
            <el-input v-model="viewForm.target"  auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="任务参数" prop="params">
            <el-input v-model="viewForm.params"  auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="viewForm.createTime"  auto-complete="off" disabled></el-input>
        </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="viewForm.mobile"  auto-complete="off" disabled></el-input>
          </el-form-item>
            <el-form-item label="备注" prop="remark">
            <el-input v-model="viewForm.remark"  auto-complete="off" disabled></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="viewFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>




  </section>
</template>
<script>
import { snapshotList,groupConfList,snapshotDelete} from '@/api/api'
export default {
  data () {
    return {
        filters:{},
        groups:{},
        loading:false,
      viewForm:{

      },
      viewFormVisible:false,
      viewClientFormVisible:false,
      snapshots: [],
      clients:[]
    }
  },
  methods: {
   handleView(index, row){
     this.viewForm = Object.assign({}, row)
     this.viewFormVisible =true

   },
   handleDelete(index, row){

     this.$confirm('确认要删除此任务任务快照信息吗？', '友情提示', {}).then(() => {
           let para = Object.assign({}, row)
            snapshotDelete(para).then((res) => {
              // NProgress.done();
                   this.$message({
                message: "删除成功",
                type: 'success'
              })
              this.getSnapshots()

            })
          })
   },
    // 获取任务列表
    getSnapshots: function () {

      let para =Object.assign({}, this.filters)
      this.loading = true
      snapshotList(para).then((res) => {
         this.loading = false
        this.snapshots = res.data
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
   this.getSnapshots()
   this.groupList()
  }
}

</script>

<style scoped>

</style>
